var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("testDB"); //set dbo var to correct db
    var objDelete = {name:"Marcello"}; //set var for chosen obj to delete
    dbo.collection("customers").deleteOne(objDelete, function(err, res) { //select collection from dbo and delete selected obj
        if (err) throw err;
        console.log("Item Deleted");
        db.close();
    });

});