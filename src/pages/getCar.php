<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require 'db.php';

// Get the ID from the URL (e.g., getCar.php?id=5)
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing car ID']);
    exit;
}

try {
    // Fetch the single car from the database
    $stmt = $pdo->prepare("SELECT * FROM cars WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $car = $stmt->fetch();

    if ($car) {
        // Convert the images text back into a JSON array for React
        if (isset($car['images']) && is_string($car['images'])) {
            $car['images'] = json_decode($car['images'], true);
        }
        
        // Ensure the boolean is typed correctly
        $car['isPopular'] = (bool)$car['isPopular'];
        
        echo json_encode($car);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Car not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>