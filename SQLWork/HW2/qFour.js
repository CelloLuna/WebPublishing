var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hwtwo",
});

con.connect(function(err){
    if (err) throw err;
    var query = ("SELECT * FROM employees WHERE yearsWithCompany > 3");

    con.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);
    });
});
