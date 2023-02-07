var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("hwone");
    var collectionList = ["Employees", "Salary_Grade", "Department"]; //selecting collections to create
    collectionList.forEach(function(C_name) { //for each loop
        dbo.createCollection(C_name, function(err, res) //creates mutiple collections in one run
        {
            if (err) throw err;
            console.log("Collection Created!")
            db.close();
        });
    }); 
});