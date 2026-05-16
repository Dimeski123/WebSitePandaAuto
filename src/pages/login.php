<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Validate against hardcoded admin credentials
if ($email === 'panda-auto@gmail.com' && $password === '123456789') {
    $token = bin2hex(random_bytes(16)); // Generate a mock token
    echo json_encode(['success' => true, 'token' => $token]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Invalid email or password']);
}