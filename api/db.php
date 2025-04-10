<?php
$host = "localhost";
$user = "cref8549_cmh"; // ganti dengan user database kamu
$password = "creativemusichub";   // ganti dengan password database kamu
$dbname = "cref8549_creativemusichub";

$conn = new mysqli($host, $user, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
