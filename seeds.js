const mysql = require("mysql2");
const dbconfig = require("./dbconfig");
const connection = mysql.createConnection(dbconfig);

connection.query(
  'INSERT INTO `department` (id, name) VALUES (1, "Human Resource"), (2, "Research & Development")',
  function (err, results) {
    if (!err) console.log("Inserted into Department");
  }
);

connection.query(
  'INSERT INTO `role` (id, title, salary, department_id) VALUES (1, "Manager", 8000.00, 1), (2, "Supervisor", 6000.00, 2)',
  function (err, results) {
    if (!err) console.log("Inserted into Role");
  }
);

connection.query(
  'INSERT INTO `employee` (id, first_name, last_name, role_id, manager_id) VALUES (1, "Steve", "Kerr", 1, NULL)',
  function (err, results) {
    if (!err) console.log("Inserted into employee");
    process.exit(0);
  }
);