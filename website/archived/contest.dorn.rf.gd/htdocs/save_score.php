<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $username = $input['username'] ?? '';
    $score = $input['score'] ?? 0;
    $time_used = $input['time_used'] ?? 0;
    $selection_count = $input['selection_count'] ?? 0;
    
    if (empty($username)) {
        echo json_encode(['success' => false, 'message' => '用户名不能为空']);
        exit;
    }
    
    try {
        $pdo = getDBConnection();
        
        // 检查用户名是否已存在（可选：如果希望用户名唯一）
        // $stmt = $pdo->prepare("SELECT id FROM quiz_scores WHERE username = ?");
        // $stmt->execute([$username]);
        // if ($stmt->fetch()) {
        //     echo json_encode(['success' => false, 'message' => '该用户名已存在']);
        //     exit;
        // }
        
        $stmt = $pdo->prepare("
            INSERT INTO quiz_scores (username, score, time_used, selection_count, created_at) 
            VALUES (?, ?, ?, ?, NOW())
        ");
        
        $stmt->execute([$username, $score, $time_used, $selection_count]);
        
        echo json_encode(['success' => true, 'message' => '成绩保存成功']);
        
    } catch(PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => '数据库错误']);
    }
} else {
    echo json_encode(['success' => false, 'message' => '无效的请求方法']);
}
?>