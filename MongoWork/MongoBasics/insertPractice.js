//same as insert collection file just diffferent data
const { Collection } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    
    var dbo = db.db("testDB");

    // var myObj = {name:"Marcello", phone:"4145142440", email:"lunmars@dunwoody.edu"};
    var myObj = {name:"two", phone:"46138", email:"test2@dunwoody.edu"};
    //var myObj = {name:"person", address:"123st"};

    dbo.collection("customers").insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log("One Document Inserted");
        db.close();
    });
})