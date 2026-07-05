<?php
// save_citizen.php - 保存公民信息
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => '仅支持POST请求']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['error' => '无效的JSON数据']);
    exit;
}

// 验证必填字段
$required_fields = ['name', 'nickname', 'birthdate', 'gender', 'caste', 'region', 'id_number', 'issue_date', 'password'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        echo json_encode(['error' => '缺少必要字段: ' . $field]);
        exit;
    }
}

// 验证密码强度（字母+数字，至少8位）
if (strlen($input['password']) < 8) {
    echo json_encode(['error' => '密码长度至少为8位']);
    exit;
}

if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/', $input['password'])) {
    echo json_encode(['error' => '密码必须包含字母和数字的组合']);
    exit;
}

// 处理邮箱（选填）
$email = isset($input['email']) && !empty($input['email']) ? trim($input['email']) : null;
if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => '邮箱格式无效']);
    exit;
}

try {
    $pdo = getDBConnection();
    
    // 检查数据库连接是否成功
    if (!$pdo) {
        echo json_encode(['error' => '数据库连接失败']);
        exit;
    }
    
    // 先检查证件号是否已存在
    $checkSql = "SELECT id FROM citizens WHERE id_number = :id_number";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([':id_number' => $input['id_number']]);
    if ($checkStmt->fetch()) {
        echo json_encode(['error' => '此证件信息已存在，无法重复申领']);
        exit;
    }
    
    // 使用 password_hash() 加密密码
    $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT);
    
    // 确保 funds 和 level 是数字
    $funds = isset($input['funds']) ? floatval($input['funds']) : 50.00;
    $level = isset($input['level']) ? intval($input['level']) : 1;
    $certification = isset($input['certification']) ? trim($input['certification']) : '';
    
    // 插入SQL使用哈希密码，新增 email 字段
    $sql = "INSERT INTO citizens (name, nickname, birthdate, gender, caste, region, id_number, issue_date, password, funds, level, certification, email) 
            VALUES (:name, :nickname, :birthdate, :gender, :caste, :region, :id_number, :issue_date, :password, :funds, :level, :certification, :email)";
    
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([
        ':name' => trim($input['name']),
        ':nickname' => trim($input['nickname']),
        ':birthdate' => $input['birthdate'],
        ':gender' => $input['gender'],
        ':caste' => $input['caste'],
        ':region' => $input['region'],
        ':id_number' => $input['id_number'],
        ':issue_date' => $input['issue_date'],
        ':password' => $hashedPassword,
        ':funds' => $funds,
        ':level' => $level,
        ':certification' => $certification,
        ':email' => $email
    ]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => '信息保存成功（账号注册完成）',
            'id' => $pdo->lastInsertId()
        ]);
    } else {
        echo json_encode(['error' => '信息保存失败']);
    }
    
} catch(PDOException $e) {
    error_log("数据库保存失败: " . $e->getMessage());
    echo json_encode(['error' => '系统错误，请稍后重试']);
} catch(Exception $e) {
    error_log("其他错误: " . $e->getMessage());
    echo json_encode(['error' => '系统错误: ' . $e->getMessage()]);
}
?>