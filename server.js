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

const addRole = function () {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter name",
            },
            {
                type: "input",
                name: "salary",
                message: "Enter salary",
            },
            {
                type: "input",
                name: "department",
                message: "Enter department",
            },
        ])
        .then((answers) => {
            let { name, salary, department } = answers;
            connection.query(
                "INSERT INTO `role` (title, salary, department_id) VALUES (?, ?, ?)",
                [name, salary, department],
                function (err, results) {
                    if (err) throw new Error(err);
                    console.log("Role Added");
                    main();
                }
            );
        });
};

const updateEmployee = function () {
    inquirer
        .prompt([
            {
                type: "input",
                name: "employeeId",
                message: "Enter the employee id",
            },
            {
                type: "input",
                name: "roleId",
                message: "Enter the role id",
            },
        ])
        .then((answers) => {
            let { employeeId, roleId } = answers;
            connection.query(
                "UPDATE `employee` SET role_id=? WHERE employee.id = ?",
                [roleId, employeeId],
                function (err, results) {
                    if (err) throw new Error(err);
                    main();
                }
            );
        });
};

const menu = [
    {
        type: "list",
        name: "menu",
        message: "Select an Option",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
        ],
        filter(val) {
            return val.toLowerCase();
        },
    },
];

function main() {
    inquirer.prompt(menu).then(async (answer) => {
        let choice = answer.menu;
        console.clear();
        switch (choice) {
            case "view all departments":
                getDepartments();
                break;
            case "view all roles":
                getRoles();
                break;
            case "view all employees":
                getEmployees();
                break;
            case "add a department":
                addDepartment();
                break;
            case "add a role":
                addRole();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "update an employee role":
                updateEmployee();
                break;
        }
    });
}

main();