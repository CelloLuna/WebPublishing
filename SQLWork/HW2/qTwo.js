var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hwtwo",
});

con.connect(function(err){
    if (err) throw err;
    var query = ("SELECT * FROM salary_grade ORDER BY salary DESC LIMIT 1");

    con.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);
    });
});
