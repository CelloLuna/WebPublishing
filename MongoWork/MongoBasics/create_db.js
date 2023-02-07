var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("testDB"); //set dbo var to the correct database
    //collection must be created when db is created
    dbo.createCollection("userInfo", function(err, res) { //create collection and display error if true then console log
        if (err) throw err;
        console.log("Database and Collection Created");
        db.close();
    });
});