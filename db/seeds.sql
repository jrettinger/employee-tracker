USE mycompany_db;

INSERT INTO department (id, name) VALUES
(1, "Human Resources"),
(2, "Research & Development"),
(3, "Finance"),
(4, "Employee Relations");

INSERT INTO role (id, title, salary, department_id) VALUES
(1, "Manager", '8000', 1),
(2, "Supervisor", '6000', 2),
(3, "Accountant", '5000', 3),
(4, "Investigator", '5500', 4);

INSERT INTO `employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES
(1, "Steve", "Kerr", 1, NULL),
(2, "Stephen", "Curry", 2, 1),
(3, "Klay", "Thompson", 3, NULL),
(4, "Draymond", "Green", 4, NULL);