var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejsdb",
});

con.connect(function(err){
    if (err) throw err;
    con.query("UPDATE customers SET address = '543st' WHERE name = 'Marcello'", function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " record(s) updated");
    });
});
