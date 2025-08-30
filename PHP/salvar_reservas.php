<?php
include("conexao.php");

$nome    = $_POST['nome'];
$email   = $_POST['email'];
$telefone = $_POST['telefone']
$quarto  = $_POST['quarto'];
$entrada = $_POST['entrada'];
$saida   = $_POST['saida'];

$sql = "INSERT INTO reservas (nome, email, telefone, quarto, entrada, saida)
        VALUES ('$nome', '$email', '$telefone' ,'$quarto', '$entrada', '$saida')";

if (mysqli_query($con, $sql)) {
    echo "Reserva feita com sucesso!";
} else {
    echo "Erro: " . mysqli_error($con);
}
?>