var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejsdb",
});

con.connect(function(err){
    if (err) throw err;
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";

    con.query(sql, function(err, res) {
        if (err) throw err;
        console.log("Query successfully completed");
    });
});
