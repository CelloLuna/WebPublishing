var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("hwone");
    // employees with more than 3 years with the company:
    // 2, 4, 5, 7, 8, 10
    var employees = [
        {employeeId: 2},
        {employeeId: 4},
        {employeeId: 5},
        {employeeId: 7},
        {employeeId: 8},
        {employeeId: 10},
    ];
    
    dbo.collection("Salary_Grade").updateMany({employees}, {$inc:{salary:2000}}, function(err, result){
        if (err) throw err;
        console.log("Salaries have been updated.");
        db.close();
    });
});