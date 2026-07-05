<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include 'config.php';

try {
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("
        SELECT user_number, username, score, time_used, selection_count, created_at 
        FROM quiz_records 
        ORDER BY created_at DESC 
        LIMIT 100
    ");
    
    $stmt->execute();
    $results = $stmt->fetchAll();
    
    echo json_encode($results);
    
} catch(PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    echo json_encode([]);
}
?>