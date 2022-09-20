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