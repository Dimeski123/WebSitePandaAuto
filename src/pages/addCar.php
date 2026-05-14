<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require 'db.php';

// Get the POST data from React front-end
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data provided']);
    exit;
}

try {
    $sql = "INSERT INTO cars (make, model, year, price, mileage, fuelType, transmission, description, category, isPopular, images) 
            VALUES (:make, :model, :year, :price, :mileage, :fuelType, :transmission, :description, :category, :isPopular, :images)";
    
    $stmt = $pdo->prepare($sql);
    
    $stmt->execute([
        ':make' => $data['make'] ?? '',
        ':model' => $data['model'] ?? '',
        ':year' => $data['year'] ?? date('Y'),
        ':price' => $data['price'] ?? 0,
        ':mileage' => $data['mileage'] ?? 0,
        ':fuelType' => $data['fuelType'] ?? 'Petrol',
        ':transmission' => $data['transmission'] ?? 'Automatic',
        ':description' => $data['description'] ?? '',
        ':category' => $data['category'] ?? 'Sedan',
        ':isPopular' => isset($data['isPopular']) && $data['isPopular'] ? 1 : 0,
        ':images' => isset($data['images']) ? json_encode($data['images']) : json_encode([])
    ]);

    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save car: ' . $e->getMessage()]);
}