var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejsdb",
});

con.connect(function(err){
    if (err) throw err;
    con.query("SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.Fproduct_no = products.id", function(err, res) {
        if (err) throw err;
        console.log(res);
    });
});
