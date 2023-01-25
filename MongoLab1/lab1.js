var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("testDB");
    dbo.createCollection("product", function(err, res) {
        if (err) throw err;
        console.log("Product collection created");
    });
    dbo.createCollection("stores", function(err, res) {
        if (err) throw err;
        console.log("Stores collection created");
    });
    dbo.createCollection("partners", function(err, res) {
        if (err) throw err;
        console.log("Partners collection created");
    });
    dbo.createCollection("customersLab1", function(err, res) {
        if (err) throw err;
        console.log("Customers collection created");
        db.close();
    });

});