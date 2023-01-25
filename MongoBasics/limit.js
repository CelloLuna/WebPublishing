var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("testDB"); //define db
    dbo.collection("customers").find(0).limit(3).toArray(function(err,res) { //select collection, what point in the collection you want to start at(0 in this case or the first record), then limit how many you want to output
        if(err) throw err;
        console.log(res);
        db.close();
    })
});