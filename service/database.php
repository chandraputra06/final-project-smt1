<?php 

$hostname = "localhost";
$username = "root";
$password = "";
$database_name = "buku_tamu";

$db = mysqli_connect($hostname, $username, $password, $database_name);

if (!$db) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}  
?>