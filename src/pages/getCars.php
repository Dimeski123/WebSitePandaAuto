<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow CORS for local React development

require 'db.php';

try {
    $stmt = $pdo->query('SELECT * FROM cars ORDER BY id DESC');
    $cars = $stmt->fetchAll();
    
    // Parse stored data to match React application expectations
    foreach ($cars as &$car) {
        if (!empty($car['images'])) {
            $car['images'] = json_decode($car['images']);
        } else {
            $car['images'] = [];
        }
        $car['isPopular'] = (bool)$car['isPopular']; // Convert TINYINT back to boolean
    }
    
    echo json_encode($cars);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}