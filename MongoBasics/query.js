var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("testDB");
    var query = {email: "lunmars@dunwoody.edu"};

    dbo.collection("userInfo").find(query).toArray(function(err, res) {
        if (err) throw err;
        console.log(res);
        db.close();
    });
});