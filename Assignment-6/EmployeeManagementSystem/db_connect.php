<?php
// Database connection configuration
$servername = "localhost";
$username = "root";
$password = "";
$database = "employee_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>
