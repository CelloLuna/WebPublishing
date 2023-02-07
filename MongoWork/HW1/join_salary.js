var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("hwone");
    dbo.collection('Employees').aggregate([
        {
            $lookup:{
                from: 'Salary_Grade',
                localField: '_id',
                foreignField: 'employeeId',
                as: 'salary',
            }
        }
    ]).toArray(function(err, res) {
        if(err) throw err;
        console.log(JSON.stringify(res));
        db.close();
    }); 
});