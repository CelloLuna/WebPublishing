var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sqlexcersize",
});

con.connect(function(err){
    if (err) throw err;
    var orderData = "INSERT INTO orders(OrderID, CustomerID, EmployeeID, OrderDate, ShipperID) VALUES(10308, 2, 7, 1996-09-18, 3), (10309, 37, 3, 1996-09-19, 1), (10310, 77, 8, 1996-09-20, 2)";
    var employeeData = "INSERT INTO employees(EmployeeID, LastName, FirstName, BirthDate, Photo) VALUES(1, 'Davolio', 'Nancy', 12/8/1968, 'EmpID1.pic'), (2, 'Fuller', 'Andrew', 2/19/1952, 'EmpID2.pic'), (3, 'Leverling', 'Janet', 8/30/1963, 'EmpID3.pic')";

    con.query(orderData, function(err, res) {
        if (err) throw err;
        console.log("Order data inserted");
    });
    con.query(employeeData, function(err, res) {
        if (err) throw err;
        console.log("Employee data inserted");
    });
});
