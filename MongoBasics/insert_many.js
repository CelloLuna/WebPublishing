var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("testDB");//define database
    var myObj = [ //create an array of data
        {
            name: "test",
            address: "3512st",
        },
        {
            name: "othertest",
            address: "423st",
        }
    ];
    dbo.collection("customers").insertMany(myObj, function(err, result){ //insert many
        if (err) throw err;
        console.log("Number of documents inserted:" + result.insertedCount); //insertedCount is a built in function that returns a count int
        db.close();
    });
});
