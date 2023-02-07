var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("Lab2");
    var myObj = [ //data to insert using and array
        {"CustomerID": 1, "CustomerName": "Alfreds Futterkiste", "ContactName": "Maria Anders", "Address": "Obere Str. 57", "City": "Berlin", "PostalCode": 12209, "Country": "Germany"},
        {"CustomerID": 2, "CustomerName": "Anna Trujillo Emparedados y helados", "ContactName": "Ana Trujillo", "Address": "Avda. de la Constitucion 2222", "City": "Mexico D.F.", "PostalCode": 05021, "Country": "Mexico"},
        {"CustomerID": 3, "CustomerName": "Antonio Moreno Taqueria", "ContactName": "Antonia Moreno", "Address": "Mataderos 2312", "City": "Mexico D.F.", "PostalCode": 05023, "Country": "Mexico"},
    ];

    dbo.collection("Customers").insertMany(myObj, function(err, result){
        if (err) throw err;
        console.log("Items Inserted: " + result.insertedCount);
        db.close();
    });
});