var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("JoinEx");
    var myObj = [ //data to insert using and array
        {"_id": 1.0, "item": 1.1, "price": 99.00, "qty": 1.0},
        {"_id": 2.0, "item": 2.1, "price": 199.00, "qty": 4.0},
        {"_id": 3.0, "item": 3.1, "price": 299.00, "qty": 63.0},
    ];

    dbo.collection("Orders").insertMany(myObj, function(err, result){
        if (err) throw err;
        console.log("Items Inserted: " + result.insertedCount);
        db.close();
    });
});