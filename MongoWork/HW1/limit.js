var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hwone"); //select correct dbo
    dbo.collection("Employees").find().limit(5).toArray(function(err, res) { //select collection and display results
        if (err) throw err;
        console.log(res);
    });
    dbo.collection("Salary_Grade").find().limit(5).toArray(function(err, res) { //select collection and display results
        if (err) throw err;
        console.log(res);
    });
    dbo.collection("Department").find().limit(5).toArray(function(err, res) { //select collection and display results
        if (err) throw err;
        console.log(res);
        db.close();
    });
});