<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $score = $input['score'] ?? 0;
    $time_used = $input['time_used'] ?? 0;
    $selection_count = $input['selection_count'] ?? 0;
    
    try {
        $pdo = getDBConnection();
        
        // 获取下一个用户序号
        $pdo->beginTransaction();
        
        $stmt = $pdo->prepare("SELECT current_number FROM user_counter WHERE id = 1 FOR UPDATE");
        $stmt->execute();
        $counter = $stmt->fetch();
        
        $user_number = $counter['current_number'] + 1;
        
        // 更新计数器
        $stmt = $pdo->prepare("UPDATE user_counter SET current_number = ? WHERE id = 1");
        $stmt->execute([$user_number]);
        
        // 插入新记录（强制记录，不需要用户名）
        $stmt = $pdo->prepare("
            INSERT INTO quiz_records (user_number, score, time_used, selection_count, created_at) 
            VALUES (?, ?, ?, ?, NOW())
        ");
        
        $stmt->execute([$user_number, $score, $time_used, $selection_count]);
        
        // 删除超过200条的旧记录
        $stmt = $pdo->prepare("
            DELETE FROM quiz_records 
            WHERE id NOT IN (
                SELECT id FROM (
                    SELECT id FROM quiz_records 
                    ORDER BY created_at DESC 
                    LIMIT 200
                ) AS temp
            )
        ");
        $stmt->execute();
        
        $pdo->commit();
        
        echo json_encode(['success' => true, 'user_number' => $user_number]);
        
    } catch(PDOException $e) {
        $pdo->rollBack();
        error_log("Database error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => '数据库错误']);
    }
} else {
    echo json_encode(['success' => false, 'message' => '无效的请求方法']);
}
?>