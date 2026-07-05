<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include 'config.php';

try {
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("
        SELECT username, score, time_used, selection_count, created_at 
        FROM quiz_scores 
        ORDER BY score DESC, time_used ASC, selection_count ASC 
        LIMIT 60
    ");
    
    $stmt->execute();
    $results = $stmt->fetchAll();
    
    echo json_encode($results);
    
} catch(PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    echo json_encode([]);
}
?>