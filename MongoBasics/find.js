var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("testDB");
    dbo.collection("userInfo").findOne({}, function(err, res) {
        if (err) throw err;
        console.log(res.name + "\n" + res.phone + "\n" + res.email);
        db.close();
    });
});