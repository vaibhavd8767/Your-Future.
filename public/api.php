<?php
/**
 * MHT-CET College Portal PHP API for XAMPP
 * Database: college_portal_db (MySQL)
 * Created By Vaibhav Dangle
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db_host = 'localhost';
$db_user = 'root';
$db_pass = ''; // Default XAMPP MySQL password is empty
$db_name = 'college_portal_db';

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database Connection Failed: ' . $conn->connect_error . '. Ensure MySQL is started in XAMPP Control Panel and database.sql is imported in phpMyAdmin.'
    ]);
    exit();
}

$action = isset($_GET['action']) ? $_GET['action'] : 'get_colleges';

if ($action === 'get_colleges') {
    $sql = "SELECT * FROM colleges ORDER BY ranking ASC";
    $result = $conn->query($sql);
    $colleges = [];

    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $colleges[] = $row;
        }
    }

    echo json_encode([
        'status' => 'success',
        'total' => count($colleges),
        'data' => $colleges
    ]);
    exit();
}

echo json_encode([
    'status' => 'success',
    'message' => 'MHT-CET College Portal PHP API is active on XAMPP server.'
]);
$conn->close();
?>
