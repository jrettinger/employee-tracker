const mysql = require("mysql2");
const dbconfig = require("./dbconfig");
const connection = mysql.createConnection(dbconfig);

const inquirer = require("inquirer");