var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("Lab2");
    var myObj = [ //data to insert using and array
        {"OrderID": 10308, "CustomerID": 2, "EmployeeID": 7, "OrderDate": "1996-09-18", "ShipperID": 3},
        {"OrderID": 10309, "CustomerID": 37, "EmployeeID": 3, "OrderDate": "1996-09-19", "ShipperID": 1},
        {"OrderID": 10310, "CustomerID": 77, "EmployeeID": 8, "OrderDate": "1996-09-20", "ShipperID": 2},
    ];

    dbo.collection("Orders").insertMany(myObj, function(err, result){
        if (err) throw err;
        console.log("Items Inserted:" + result.insertedCount);
        db.close();
    });
});