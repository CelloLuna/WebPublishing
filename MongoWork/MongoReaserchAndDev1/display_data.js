var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("PRODUCT");

    var objDelete = {"name":"Computer"};
    //displaying data
    dbo.collection("PRODUCT_INFO").deleteOne(objDelete, function(err, result) {
        if (err) throw err;
        console.log("Item Deleted");
        db.close();
    });

});