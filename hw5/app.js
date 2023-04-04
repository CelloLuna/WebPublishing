const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { req, res } = require('express');

const app = express();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hw5',
});
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(4000, () => {});

app.get('/', (req, res) => {
  res.send('hello world');
  connection.connect(function (err) {
    if (err) throw err;
    console.log('Connection Successfull');
  });
});

//INSERT
app.post('/insert', (req, res) => {
  var query =
    'INSERT INTO customers(FirstName, LastName, MobileNumber, Email, Address, CreationDate) values(?, ?, ?, ?, ?, ?)';
  var values = [
    req.body['FirstName'],
    req.body['LastName'],
    req.body['MobileNumber'],
    req.body['Email'],
    req.body['Address'],
    req.body['CreationDate'],
  ];
  connection.query(query, values, function (err, rows, fields) {
    if (err) {
      res.send('Failed' + err);
    }
    res.json('Data Inserted Successfully');
  });
});

//UPDATE
app.put('/update', (req, res) => {
  var query = 'UPDATE customers SET FirstName=?, LastName=? WHERE ID = ?';
  var values = [req.body['FirstName'], req.body['LastName'], req.body['ID']];
  connection.query(query, values, function (err, rows, fields) {
    if (err) {
      res.send('Failed' + err);
    }
    res.json('Data Updated');
  });
});

//FILE UPLOAD
var fileUpload = require('express-fileupload');
var fs = require('fs');
app.use(fileUpload());
app.use('/profilePictures', express.static(__dirname + '/profilePictures'));

app.post('/saveFile', (req, res) => {
  fs.writeFile('./profilePictures/' + req.files.file.name, req.files.file.data, function (err) {
    if (err) {
      return console.log(err);
    }
    res.json(req.files.file.name);
  });
});

//DELETE
app.delete('/delete/:id', (req, res) => {
  var query = 'DELETE FROM customers WHERE ID = ?';
  var values = [parseInt(req.params.id)];
  connection.query(query, values, function (err, rows, fields) {
    if (err) {
      res.send('ERROR: ' + err);
    }
    res.json('Data Deleted');
  });
});
