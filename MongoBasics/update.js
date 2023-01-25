var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("testDB"); //select db
    var oldData = {name: "person"}; //define what you want to change
    var newData = {$set:{name: "People", address: "12345 st"}}; //define what you are changing 
    dbo.collection("customers").updateOne(oldData, newData, function(err, res) { //call update what you are changing then what it is being changed to
        if (err) throw err;
        console.log("Record updated");
    })
});