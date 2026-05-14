CREATE DATABASE IF NOT EXISTS panda_auto;
USE panda_auto;

CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    mileage INT NOT NULL,
    fuelType VARCHAR(50) NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    isPopular TINYINT(1) DEFAULT 0,
    images JSON
);