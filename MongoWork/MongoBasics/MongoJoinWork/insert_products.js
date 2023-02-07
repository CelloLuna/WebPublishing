var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("JoinEx");
    var myObj = [ //data to insert using and array
        {"_id": 1.0, "name": "Ford", "price": 99.00},
        {"_id": 2.0, "name": "Ferrari", "price": 199.00},
        {"_id": 3.0, "name": "Lamborghini", "price": 299.00 },
    ];

    dbo.collection("Products").insertMany(myObj, function(err, result){
        if (err) throw err;
        console.log("Items Inserted:" + result.insertedCount);
        db.close();
    });
});