var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sqlexcersize",
});

con.connect(function(err){
    if (err) throw err;
    var ordersQry = "CREATE TABLE orders (OrderID INT(11), CustomerID INT(11), EmployeeID INT(11), OrderDate DATE, ShipperID INT(11))";
    var employeeQry = "CREATE TABLE employees (EmployeeID INT(11), FirstName VARCHAR(255), LastName VARCHAR(255), BirthDate DATE, Photo VARCHAR(255))";
    con.query(ordersQry, function(err, res) {
        if (err) throw err;
        console.log("Orders table successfully completed");
    });
    con.query(employeeQry, function(err, res) {
        if (err) throw err;
        console.log("Employees table successfully completed");
    });
});
