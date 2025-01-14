<?php
include __DIR__ . '/../service/database.php';

session_start();

$error_message = "";

if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM user WHERE nama = ? AND password = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
        header("location: schedule.html"); 
        exit();
    } else {
        $error_message = "Nama atau Password salah.";
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/stylelogin.css">
    <link rel="stylesheet" href="css/style.css">
    
</head>
<body class="bg-gray-100">
    <div class="login-box bg-gray-100">
        <form action="login.php" method="POST">
            <h2 class="text-3xl font-semibold">Login</h2>
            <h3>Nama</h3>
                <div class="userN-input">
                    <input type="text" placeholder="username" name="username"/>
                </div>
                <div class="userN-input">
                    <h3>Password</h3>
                    <input type="password" placeholder="password" name="password"/>
                </div>
                <br>
                <div class="keep-loggedin">
                    <input type="checkbox">Remember me 
                </div>
                <button type="submit" name="login"  class="text-base font-semibold text-white bg-teal-900 py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Login</button>
                <br>
                <div class="help">
                    Don't Have Any Account?
                    <a href="register.php">Register</a>
                </div>
                <p style="color: red; text-align: center;"><?= htmlspecialchars($error_message) ?></p>
        </form>
    </div>
</body>
</html>