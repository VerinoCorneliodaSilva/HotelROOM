<?php
$host = "localhost";
$user = "root";    
$pass = "";        
$db   = "hotel_db";

$con = mysqli_connect($host, $user, $pass, $db);

if (!$con) {
    die("Erro na conexão: " . mysqli_connect_error());
}
?>