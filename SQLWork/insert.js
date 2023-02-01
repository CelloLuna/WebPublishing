var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejsdb",
});

con.connect(function(err){
    if (err) throw err;
    var sql = "INSERT INTO customers(name, address) VALUES('Marcello', '123st'), ('Amalan', '321st')";

    con.query(sql, function(err, res) {
        if (err) throw err;
        console.log("Data inserted");
    });
});
