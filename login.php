<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding-top: 80px; /* Adjust based on navbar height */
        }
        .navbar {
            background-color: #333;
            color: white;
            padding: 1rem 0;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }
        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 6%;
        }
        .logo a {
            font-family: 'Sego UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 25px;
            font-weight: 400;
            color: white;
            text-transform: uppercase;
            letter-spacing: 3px;
            text-decoration: none;
        }
        .logo strong {
            font-family: 'Jost', sans-serif;
            font-size: 30px;
            line-height: 30px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: -3px;
        }
        ul {
            display: flex;
            gap: 1.5rem;
            list-style: none;
        }
        ul a {
            font-size: 19px;
            font-weight: 400;
            color: #ccc;
            text-transform: capitalize;
            text-decoration: none;
        }
        ul a:hover {
            color: white;
        }
        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            margin: 0 auto; /* Center the form */
            text-align: center;
        }
        h2 {
            color: #333;
            text-align: center;
        }
        label {
            display: block;
            margin: 10px 0;
        }
        input {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            box-sizing: border-box;
        }
        button {
            background-color: #4caf50;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }
        button:hover {
            background-color: #45a049;
        }
        .signup-link {
            margin-top: 10px;
            display: block;
        }
        #showPassword {
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <div class="navbar">
        <div class="container">
            <div class="logo">
                <a href="candle.html"><strong>Candle</strong> Shop</a>
            </div>
            <ul>
                <li><a href="candle.html" class="active">Home</a></li>
                <li><a href="about.html" class="active">About</a></li>
                <li><a href="photos.html" class="active">Photos</a></li>
                <li><a href="contact.html" class="active">Contact</a></li>
                <li><a href="booking.html" class="active">Booking</a></li>
            </ul>
        </div>
    </div>

    <h2>Login</h2>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit" name="submit">Login</button>
        
        <a href="Signup.php" class="signup-link">Don't have an account? Sign up</a><br>
        <a href="ForgotPassword.html">Forgot Password?</a>
    </form>

    <?php
    // Include database configuration
    include 'dbconfig.php';

    // Check if the form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['submit'])) {
        // Retrieve login credentials from the form
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Prepare SQL statement to fetch user from the database
        $sql = "SELECT email, password_hash FROM candleshop WHERE email = ?"; // Replace 'users' with your actual table name

        // Prepare and execute the statement
        $stmt = $conn->prepare($sql);

        // Check if the statement is prepared successfully
        if ($stmt === false) {
            echo "Error in preparing statement: " . $conn->error;
        } else {
            // Bind parameters and execute the statement
            $stmt->bind_param("s", $email);
            $stmt->execute();

            // Get result
            $result = $stmt->get_result();

            // Check if user exists and password matches
            if ($result->num_rows == 1) {
                $user = $result->fetch_assoc();
                // Verify password
                if (password_verify($password, $user['password_hash'])) {
                    // Password is correct, proceed with login
                    echo "Login successful!";
                } else {
                    // Password is incorrect
                    echo "Invalid password. Please try again.";
                }
            } else {
                // User not found
                echo "Invalid username or password. Please try again.";
            }
        }
    }
    ?>

</body>
</html>
