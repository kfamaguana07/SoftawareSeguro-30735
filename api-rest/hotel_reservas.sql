-- Base de datos para Gestión de Reservas de Hotel
CREATE DATABASE IF NOT EXISTS hotel_reservas;
USE hotel_reservas;

-- Tabla de Hoteles
CREATE TABLE IF NOT EXISTS hoteles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    estrellas INT,
    telefono VARCHAR(20)
);

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20)
);

-- Tabla de Reservas
CREATE TABLE IF NOT EXISTS reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    num_huespedes INT DEFAULT 1,
    hotel_id INT NOT NULL,
    cliente_id INT NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES hoteles(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);
