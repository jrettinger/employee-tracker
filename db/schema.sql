/* Create database mycompany */
DROP DATABASE IF EXISTS mycompany_db;
CREATE DATABASE mycompany_db;

USE mycompany_db;

/* Table structure for table department */
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

/* Table structure for table role */

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary decimal(10,0) NOT NULL,
  department_id INT NOT NULL
);
/* Table structure for table employee */
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);
