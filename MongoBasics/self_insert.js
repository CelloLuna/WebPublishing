const { Collection } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    
    var dbo = db.db("testDB");

    // var myObj = {name:"Marcello", phone:"4145142440", email:"lunmars@dunwoody.edu"};
    var myObj = {name:"person", phone:"123456789", email:"email@dunwoody.edu"};
    //var myObj = {name:"person", address:"123st"};

    dbo.collection("userInfo").insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log("One Document Inserted");
        db.close();
    });
})