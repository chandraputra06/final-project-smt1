<?php 
include __DIR__ . '/../service/database.php';

session_start();

$register_message = ""; 

if (isset($_POST["register"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $check_sql = "SELECT * FROM user WHERE nama = '$username'";
    $result = $db->query($check_sql);

    if ($result->num_rows > 0) {
        $register_message = "Data sudah ada, tolong gunakan nama yang lain.";
    } else {
        $sql = "INSERT INTO user (nama, password) VALUES ('$username', '$password')";
        
        if ($db->query($sql)) {
            $register_message = "Data telah berhasil terdaftar.";
            header("location: schedule.html"); 
            exit();
        } else {
            $register_message = "Data gagal terdaftar. Silakan coba lagi.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="css/stylelogin.css">
</head>
<body>
    <div class="register-box">
        <form action="" method="POST">
            <h2>Register Here</h2>
            <h3>Nama</h3>
            <div class="userN-input">
                <input type="text" placeholder="username" name="username" required />
            </div>
            <div class="userN-input">
                <h3>Password</h3>
                <input type="password" placeholder="password" name="password" required />
            </div>
            <br>              
            <button type="submit" name="register">Register</button> 
            <br>
            <!-- Menampilkan pesan feedback -->
            <p style="color: red;"><?= htmlspecialchars($register_message) ?></p>
        </form>
    </div>
</body>
</html>