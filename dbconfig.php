<?php
$servername = "localhost";
$username = "user";
$password = "12345678";
$dbname = "User";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// } else {
//     echo "Connected successfully";
// }
// ?>
