var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("testDB");//select db
    var query = {email: "lunmars@dunwoody.edu"}; //define what the query is going to search for

    dbo.collection("userInfo").find(query).toArray(function(err, res) { //reformat output to an array for ease of reading
        if (err) throw err;
        console.log(res);
        db.close();
    });
});