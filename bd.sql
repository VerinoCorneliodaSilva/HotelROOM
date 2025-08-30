CREATE DATABASE hotel_db;

USE hotel_db;

CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  quarto VARCHAR(50),
  entrada DATE,
  saida DATE
);