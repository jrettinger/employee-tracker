const mysql = require("mysql2");
const dbconfig = require("./dbconfig");
const connection = mysql.createConnection(dbconfig);

const inquirer = require("inquirer");

const getDepartments = function () {
    connection.query("SELECT * FROM `department`", function (err, results) {
      if (err) throw new Error(err);
      console.table(results);
      main();
    });
  };

  const getRoles = function () {
    connection.query(
      "SELECT role.id, title, salary, department_id, department.name FROM `role` INNER JOIN department ON (role.department_id = department.id) ORDER BY role.id ASC",
      function (err, results) {
        if (err) throw new Error(err);
        console.table(results);
        main();
      }
    );
  };

  const getEmployees = function () {
    connection.query(
      "SELECT employee.id, first_name, last_name, role_id, manager_id, role.title, role.salary, role.department_id FROM `employee` INNER JOIN `role` ON (employee.role_id=role.id)",
      function (err, results) {
        if (err) throw new Error(err);
        console.table(results);
        main();
      }
    );
  };

  const addDepartment = function () {
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Enter the Department name",
        },
      ])
      .then((answer) => {
        let name = answer.departmentName;
        connection.query(
          "INSERT INTO `department` (name) VALUES (?)",
          [name],
          function (err, results) {
            if (err) throw new Error(err);
            console.log("Department Added");
            main();
          }
        );
      });
  };

  const addEmployee = function () {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Employee's first name",
        },
        {
          type: "input",
          name: "lastName",
          message: "Employee's last name",
        },
        {
          type: "input",
          name: "manager",
          message: "Employee's manager",
        },
        {
          type: "input",
          name: "role",
          message: "Employee's role",
        },
      ])
      .then((answers) => {
        let { firstName, lastName, manager, role } = answers;
        if (!manager) manager = null;
        connection.query(
          "INSERT INTO `employee` (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)",
          [firstName, lastName, manager, role],
          function (err, results) {
            if (err) throw new Error(err);
            console.log("Employee Added");
            main();
          }
        );
      });
  };