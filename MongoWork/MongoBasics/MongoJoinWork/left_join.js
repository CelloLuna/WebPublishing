var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("JoinEx");
    dbo.collection('Orders').aggregate([
        {
            $lookup:{
                from: 'Products',
                localField: '_id',
                foreignField: '_id',
                as: 'ordered_product',
            }
        }
    ]).toArray(function(err, res) {
        if(err) throw err;
        console.log(JSON.stringify(res));
        db.close();
    }); 
});