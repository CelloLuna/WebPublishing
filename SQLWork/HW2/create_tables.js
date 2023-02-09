var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hwtwo",
});

con.connect(function(err){
    if (err) throw err;
    var employees = "CREATE TABLE employees (id int(11), name VARCHAR(255), age int(11), yearsWithCompany int(11))";
    var salary = "CREATE TABLE salary_grade (salary int(255), employeeId int(11))";
    var department = "CREATE TABLE department (department VARCHAR(255), employeeId int(11))";

    con.query(employees, function(err, res) {
        if (err) throw err;
        console.log("Employees table successfully created");
    });
    con.query(salary, function(err, res) {
        if (err) throw err;
        console.log("Salary table successfully created");
    });
    con.query(department, function(err, res) {
        if (err) throw err;
        console.log("Department table successfully created");
    });
});
