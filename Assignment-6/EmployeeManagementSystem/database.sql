-- Create Employee Management Database
-- Run this SQL script in phpMyAdmin or MySQL command line

-- Create Database
CREATE DATABASE IF NOT EXISTS employee_management;

-- Use the database
USE employee_management;

-- Create Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    hire_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_department (department),
    INDEX idx_hire_date (hire_date)
);

-- Insert sample data (optional)
INSERT INTO employees (first_name, last_name, email, phone, department, salary, hire_date) VALUES
('John', 'Doe', 'john.doe@company.com', '+1-234-567-8900', 'Engineering', 85000.00, '2023-01-15'),
('Jane', 'Smith', 'jane.smith@company.com', '+1-234-567-8901', 'Human Resources', 65000.00, '2023-02-20'),
('Michael', 'Johnson', 'michael.johnson@company.com', '+1-234-567-8902', 'Finance', 75000.00, '2023-03-10'),
('Sarah', 'Williams', 'sarah.williams@company.com', '+1-234-567-8903', 'Sales', 70000.00, '2023-04-05'),
('Robert', 'Brown', 'robert.brown@company.com', '+1-234-567-8904', 'Engineering', 88000.00, '2023-05-12');
