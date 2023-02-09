var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hwtwo",
});

con.connect(function(err){
    if (err) throw err;
    var query = ("SELECT d.department, e.name FROM department d JOIN employees e ON d.employeeId = e.id");

    con.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);
    });
});
