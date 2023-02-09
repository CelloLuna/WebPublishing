var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hwtwo",
});

con.connect(function(err){
    if (err) throw err;
    var employee = ("SELECT * FROM employees LIMIT 5");
    var salary = ("SELECT * FROM salary_grade LIMIT 5");
    var department = ("SELECT * FROM department LIMIT 5");

    con.query(employee, function(err, res) {
        if (err) throw err;
        console.log(res);
    });
    con.query(salary, function(err, res) {
        if (err) throw err;
        console.log(res);
    });
    con.query(department, function(err, res) {
        if (err) throw err;
        console.log(res);
    });
    
});
