<?php
$cookie_name = "aid";

// Set the cookie to expire in the past (one hour ago)
setcookie($cookie_name, '', time() - 3600);

// Check if the cookie is successfully unset
if (!isset($_COOKIE[$cookie_name])) {
    echo "Logout successful!";
} else {
    echo "Logout failed. Please try again.";
}
?>