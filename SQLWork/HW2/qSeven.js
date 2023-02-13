var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hwtwo",
});

con.connect(function(err){
    if (err) throw err;
    var salarySelect = ("SELECT * FROM salary_grade");
    var salaryUpdate = ("UPDATE salary_grade SET salary = salary + 2000 WHERE employeeId IN (SELECT s.employeeId FROM salary_grade s JOIN employees e ON s.employeeId = e.id WHERE e.yearsWithCompany > 3)");

    con.query(salarySelect, function(err, res) {
        if (err) throw err;
        console.log(res);
    });
    con.query(salaryUpdate, function(err, res) {
        if (err) throw err;
        console.log("Salaries Updated");
    });
    con.query(salarySelect, function(err, res) {
        if (err) throw err;
        console.log(res);
    });
});

// UPDATE salary_grade
// SET salary = salary + 2000
// WHERE employeeId = (SELECT s.employeeId 
//        FROM salary_grade s
//        JOIN employees e
//        ON s.employeeId = e.id
//        WHERE e.yearsWithCompany > 3);