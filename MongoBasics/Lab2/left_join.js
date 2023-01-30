var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("Lab2");
    dbo.collection('Customers').aggregate([
        {
            $lookup:{
                from: 'Orders',
                localField: 'CustomerID',
                foreignField: 'CustomerID',
                as: 'ordered_product',
            }
        }
    ]).toArray(function(err, res) {
        if(err) throw err;
        console.log(JSON.stringify(res));
        db.close();
    }); 
});