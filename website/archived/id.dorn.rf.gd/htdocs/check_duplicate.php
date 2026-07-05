<?php
// check_duplicate.php - 检查重复信息
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');

// 处理 OPTIONS 预检请求
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

// 验证必要字段（新增 issue_date）
$required_fields = ['name', 'birthdate', 'gender', 'caste', 'region', 'issue_date'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        echo json_encode(['error' => '缺少必要字段: ' . $field]);
        exit;
    }
}

try {
    $pdo = getDBConnection();
    
    // 检查是否存在相同信息（新增 AND issue_date = :issue_date 条件）
    $sql = "SELECT COUNT(*) as count FROM citizens 
            WHERE name = :name 
            AND birthdate = :birthdate 
            AND gender = :gender 
            AND caste = :caste 
            AND region = :region
            AND issue_date = :issue_date"; // 新增颁发日期判定
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => trim($input['name']),
        ':birthdate' => $input['birthdate'],
        ':gender' => $input['gender'],
        ':caste' => $input['caste'],
        ':region' => $input['region'],
        ':issue_date' => $input['issue_date'] // 绑定颁发日期参数
    ]);
    
    $result = $stmt->fetch();
    
    echo json_encode([
        'is_duplicate' => $result['count'] > 0,
        'count' => $result['count']
    ]);
    
} catch(PDOException $e) {
    error_log("数据库查询失败: " . $e->getMessage());
    echo json_encode(['error' => '系统错误，请稍后重试']);
}
?>