var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sqlexcersize",
});

con.connect(function(err){
    if (err) throw err;
    con.query("SELECT customers.ContactName AS customer, orders.OrderID AS OrderNumber FROM customers JOIN orders ON .customers.CustomerID = orders.CustomerID", function(err, res) {
        if (err) throw err;
        console.log(res);
    });
});
