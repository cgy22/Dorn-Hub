<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => '仅支持POST请求']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['id_number']) || !isset($input['reward_amount'])) {
    echo json_encode(['success' => false, 'error' => '无效的请求数据']);
    exit;
}

try {
    $pdo = getDBConnection();
    
    // 开始事务
    $pdo->beginTransaction();
    
    // 1. 首先检查用户是否存在
    $check_sql = "SELECT id, funds, level FROM citizens WHERE id_number = ?";
    $check_stmt = $pdo->prepare($check_sql);
    $check_stmt->execute([$input['id_number']]);
    $user = $check_stmt->fetch();
    
    if (!$user) {
        throw new Exception('用户不存在');
    }
    
    // 2. 更新用户资金 - 直接更新citizens表的funds字段
    $update_sql = "UPDATE citizens SET funds = funds + ? WHERE id_number = ?";
    $update_stmt = $pdo->prepare($update_sql);
    $update_stmt->execute([$input['reward_amount'], $input['id_number']]);
    
    // 3. 记录资金流水到fund_flows表
    $flow_sql = "INSERT INTO fund_flows (id_number, flow_type, amount, description, created_at) 
                VALUES (?, 'income', ?, ?, NOW())";
    $flow_stmt = $pdo->prepare($flow_sql);
    $description = "答题竞赛奖励 (得分: {$input['score']}, 用时: {$input['time_used']}秒)";
    $flow_stmt->execute([$input['id_number'], $input['reward_amount'], $description]);
    
    // 4. 计算总资金流水（用于等级计算）
    $total_flow_sql = "SELECT COALESCE(SUM(amount), 0) as total_flow FROM fund_flows WHERE id_number = ?";
    $total_flow_stmt = $pdo->prepare($total_flow_sql);
    $total_flow_stmt->execute([$input['id_number']]);
    $total_flow = $total_flow_stmt->fetch()['total_flow'];
    
    // 5. 计算新等级
    $new_level = calculateLevel($total_flow);
    
    // 6. 检查是否需要升级
    $level_updated = false;
    if ($new_level > $user['level']) {
        $update_level_sql = "UPDATE citizens SET level = ? WHERE id_number = ?";
        $update_level_stmt = $pdo->prepare($update_level_sql);
        $update_level_stmt->execute([$new_level, $input['id_number']]);
        $level_updated = true;
        
        // 记录升级通知
        $notification_sql = "INSERT INTO user_notifications (id_number, notification_content) VALUES (?, ?)";
        $notification_stmt = $pdo->prepare($notification_sql);
        $notification_stmt->execute([$input['id_number'], "恭喜！您的账号等级已提升到 {$new_level} 级"]);
    }
    
    // 7. 获取更新后的用户数据（包含新的资金和等级）
    $user_sql = "SELECT id, name, nickname, id_number, birthdate, gender, caste, region, 
                        issue_date, funds, level, certification, last_login 
                 FROM citizens WHERE id_number = ?";
    $user_stmt = $pdo->prepare($user_sql);
    $user_stmt->execute([$input['id_number']]);
    $updated_user = $user_stmt->fetch(PDO::FETCH_ASSOC);
    
    $pdo->commit();
    
    echo json_encode([
        'success' => true,
        'reward_amount' => $input['reward_amount'],
        'previous_funds' => $user['funds'],
        'new_funds' => $user['funds'] + $input['reward_amount'],
        'level_updated' => $level_updated,
        'previous_level' => $user['level'],
        'new_level' => $new_level,
        'updated_user' => $updated_user,
        'message' => "成功获得 {$input['reward_amount']}𣿅元奖励！"
    ]);
    
} catch (PDOException $e) {
    if (isset($pdo)) {
        $pdo->rollBack();
    }
    error_log("添加答题奖励失败: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => '数据库错误: ' . $e->getMessage()]);
} catch (Exception $e) {
    if (isset($pdo)) {
        $pdo->rollBack();
    }
    error_log("添加答题奖励失败: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>