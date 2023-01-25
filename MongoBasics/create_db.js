var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("testDB");
    dbo.createCollection("userInfo", function(err, res) {
        if (err) throw err;
        console.log("Database and Collection Created");
        db.close();
    });
});