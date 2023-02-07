var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("hwone");
    var employeeData = [ //data to insert using and array
        {"_id": 1, "name": "John Doe", "age": 55, "yearsWithCompany": 1},
        {"_id": 2, "name": "Jane Doe", "age": 34, "yearsWithCompany": 6},
        {"_id": 3, "name": "Spongebob Squarepants", "age": 32, "yearsWithCompany": 3},
        {"_id": 4, "name": "Peter Griffen", "age": 50, "yearsWithCompany": 10},
        {"_id": 5, "name": "Evan Sambrugaro", "age": 41, "yearsWithCompany": 23},
        {"_id": 6, "name": "Marcello Luna", "age": 27, "yearsWithCompany": 2},
        {"_id": 7, "name": "Mary Jane", "age": 43, "yearsWithCompany": 5},
        {"_id": 8, "name": "Johnathan Dough", "age": 25, "yearsWithCompany": 13},
        {"_id": 9, "name": "Janice Joplin", "age": 30, "yearsWithCompany": 2},
        {"_id": 10, "name": "Louis Prima", "age": 33, "yearsWithCompany": 5},
    ];

    var salaryData = [
        {"salary": 75000,"employeeId": 1},
        {"salary": 100000,"employeeId": 2},
        {"salary": 35000,"employeeId": 3},
        {"salary": 66000,"employeeId": 4},
        {"salary": 89000,"employeeId": 5},
        {"salary": 125000,"employeeId": 6},
        {"salary": 50000,"employeeId": 7},
        {"salary": 62000,"employeeId": 8},
        {"salary": 120000,"employeeId": 9},
        {"salary": 76000,"employeeId": 10},
    ];

    var departmentData = [
        {"department": "IT","employeeId": 1},
        {"department": "HR","employeeId": 2},
        {"department": "IT","employeeId": 3},
        {"department": "HR","employeeId": 4},
        {"department": "Stock Room","employeeId": 5},
        {"department": "Stock Room","employeeId": 6},
        {"department": "Accounting","employeeId": 7},
        {"department": "IT","employeeId": 8},
        {"department": "Accounting","employeeId": 9},
        {"department": "Accounting","employeeId": 10},
    ];

    dbo.collection("Employees").insertMany(employeeData, function(err, result){
        if (err) throw err;
        console.log("Items Inserted: " + result.insertedCount);
    });
    dbo.collection("Salary_Grade").insertMany(salaryData, function(err, result){
        if (err) throw err;
        console.log("Items Inserted: " + result.insertedCount);
    });
    dbo.collection("Department").insertMany(departmentData, function(err, result){
        if (err) throw err;
        console.log("Items Inserted: " + result.insertedCount);
    });
});