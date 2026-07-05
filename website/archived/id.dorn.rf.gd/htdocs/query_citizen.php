<?php
/**
 * query_citizen.php - 完整修正版 (适配 UTC 环境)
 */

// 1. 强制环境配置
ini_set('display_errors', 0);
error_reporting(E_ALL);
date_default_timezone_set('UTC'); // 关键：确保 PHP 处理的所有时间均为 UTC

// 2. 响应头设置
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

// 锁定规则
$MAX_ATTEMPTS = 10;
$LOCKOUT_MINUTES = 15;

/**
 * 获取指定时间段内的失败次数 (统一使用 PHP 传参)
 */
function getRecentAttemptsCount($pdo, $id_number, $minutes) {
    // 由 PHP 生成 UTC 时间字符串
    $threshold = date('Y-m-d H:i:s', strtotime("-$minutes minutes"));
    
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM login_attempts WHERE id_number = ? AND attempt_time > ?");
    $stmt->execute([$id_number, $threshold]);
    return (int)$stmt->fetchColumn();
}

/**
 * 获取最后一次失败时间
 */
function getLastAttemptTime($pdo, $id_number) {
    $stmt = $pdo->prepare("SELECT MAX(attempt_time) FROM login_attempts WHERE id_number = ?");
    $stmt->execute([$id_number]);
    return $stmt->fetchColumn();
}

/**
 * 记录失败尝试 (显式写入 PHP 生成的 UTC 时间)
 */
function recordFailedAttempt($pdo, $id_number) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $utcNow = date('Y-m-d H:i:s'); // 强制使用 PHP 的 UTC 时间
    $stmt = $pdo->prepare("INSERT INTO login_attempts (id_number, attempt_time, ip_address) VALUES (?, ?, ?)");
    $stmt->execute([$id_number, $utcNow, $ip]);
}

/**
 * 清除记录
 */
function clearAttempts($pdo, $id_number) {
    $stmt = $pdo->prepare("DELETE FROM login_attempts WHERE id_number = ?");
    $stmt->execute([$id_number]);
}

// --- 业务逻辑开始 ---

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => '仅支持POST请求']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$id_number = isset($input['id_number']) ? trim($input['id_number']) : '';
$password = isset($input['password']) ? $input['password'] : '';

if (empty($id_number) || empty($password)) {
    echo json_encode(['error' => '身份证件号和密码均不能为空']);
    exit;
}

try {
    $pdo = getDBConnection();
    
    // 1. 首先查找账户是否存在
    $stmt = $pdo->prepare("SELECT * FROM citizens WHERE id_number = ?");
    $stmt->execute([$id_number]);
    $citizen = $stmt->fetch(PDO::FETCH_ASSOC);

    // 账户不存在：直接报错，不计入尝试次数（防止恶意填充数据库）
    if (!$citizen) {
        echo json_encode([
            'error' => '身份证件号或密码错误',
            'remaining_attempts' => $MAX_ATTEMPTS 
        ]);
        exit;
    }

    // 2. 核心拦截逻辑：检查锁定状态
    // 这里必须在验证密码之前，否则正确密码会直接“冲破”锁定
    $attemptsCount = getRecentAttemptsCount($pdo, $id_number, $LOCKOUT_MINUTES);
    
    if ($attemptsCount >= $MAX_ATTEMPTS) {
        $lastTime = getLastAttemptTime($pdo, $id_number);
        $unlockTime = strtotime($lastTime . " +$LOCKOUT_MINUTES minutes");
        $now = time(); // 当前 UTC 时间戳

        if ($now < $unlockTime) {
            // 仍在锁定期内
            $remainingSeconds = $unlockTime - $now;
            $mins = ceil($remainingSeconds / 60);
            echo json_encode([
                'error' => "错误次数过多，账号已锁定。请在 {$mins} 分钟后再试",
                'locked' => true,
                'remaining_attempts' => 0
            ]);
            exit; // 强制拦截，不执行后续代码
        } else {
            // 锁定已过期，手动清理以便重新计次
            clearAttempts($pdo, $id_number);
            $attemptsCount = 0;
        }
    }

    // 3. 验证密码
    if (password_verify($password, $citizen['password'])) {
        // 成功：清空所有历史失败记录
        clearAttempts($pdo, $id_number);
        unset($citizen['password']);
        echo json_encode(['success' => true, 'data' => $citizen]);
    } else {
        // 失败：记录并实时返回剩余次数
        recordFailedAttempt($pdo, $id_number);
        
        $newCount = getRecentAttemptsCount($pdo, $id_number, $LOCKOUT_MINUTES);
        $remaining = max(0, $MAX_ATTEMPTS - $newCount);

        if ($remaining === 0) {
            $msg = "密码错误次数已达上限，账号已被锁定 {$LOCKOUT_MINUTES} 分钟";
        } else {
            $msg = "身份证件号或密码错误，还剩 {$remaining} 次尝试机会";
        }

        echo json_encode([
            'error' => $msg,
            'remaining_attempts' => $remaining
        ]);
    }

} catch(PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    echo json_encode(['error' => '服务器响应异常，请稍后再试']);
}
?>