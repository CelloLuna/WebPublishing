var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejsdb",
});

con.connect(function(err){
    if (err) throw err;

    con.query("SELECT * FROM customers", function(err, res, fields) {
        if(err) throw err;
        console.log(res);
    });
});
