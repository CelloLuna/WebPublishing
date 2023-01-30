var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    //creating db
    var dbo = db.db("PRODUCT");
    //creating collection
    dbo.createCollection("PRODUCT_INFO", function(err, result){
        if (err) throw err;
        console.log("Database and Collection Created");
    });

    //data to be inserted
    var myObj = [
        {
            Name: "Computer",
            Price: 500,
            Quantity: 4,
            Description: "A personal computer",
        },
        {
            Name: "Phone",
            Price: 200,
            Quantity: 10,
            Description: "A hand-held device",
        },
        {
            Name: "Keyboard",
            Price: 50,
            Quantity: 3,
            Description: "Used to type to a computer",
        },
        {
            Name: "Mouse",
            Price: 30,
            Quantity: 15,
            Description: "Used to navigate a computer",
        },
        {
            Name: "Monitor",
            Price: 150,
            Quantity: 7,
            Description: "Used to display information from the computer",
        },
    ];
    //inserting data
    dbo.collection("PRODUCT_INFO").insertMany(myObj, function(err, result) {
        if (err) throw err;
        console.log("Items Inserted")
        console.log("Number of Items:" + result.insertedCount);
    });
});