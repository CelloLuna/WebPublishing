var Express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
const { request, response } = require('express');

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(49146, () => {});

app.get('/', (request, response) => {
  response.send('Hello world');
  connection.connect(function (err) {
    if (err) throw err;
    console.log('Connection Successfull');
  });
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apitest',
});
app.use(cors());

// DISPLAY EMPLOYEES
app.get('/api/cello', (request, response) => {
  var query = 'SELECT * from employees';
  connection.query(query, function (err, rows, fields) {
    if (err) {
      response.send('failed');
    }
    response.send(rows);
  });
});

//INSERT
app.post('/api/department', (request, response) => {
  var query = 'INSERT INTO employees(EmployeeName, Department) values(?, ?)';
  var values = [request.body['EmpoyeeName'], request.body['Department']];

  connection.query(query, values, function (err, rows, fields) {
    if (err) {
      response.send('failed');
    }
    response.json('added successfully');
  });
});

//UPDATE
app.put('/api/employee', (request, response) => {
  var query =
    'UPDATE employees SET EmployeeName=?, Department=?, DateOfJoining=?, PhotoFileName=? WHERE EmployeeId = ?';
  var values = [
    request.body['EmployeeName'],
    request.body['Department'],
    request.body['DateOfJoining'],
    request.body['PhotoFileName'],
    request.body['EmployeeId'],
  ];
  connection.query(query, values, function (err, rows, fields) {
    if (err) {
      response.send('Failed' + err);
    }
    response.json('Data Updated');
  });
});

//DELETE
app.delete('/api/employee/:id', (request, response) => {
  var query = 'DELETE FROM employees WHERE EmployeeId = ?';
  var values = [parseInt(request.params.id)];
  connection.query(query, values, function (err, rows, fields) {
    if (err) {
      response.send('ERROR:' + err);
    }
    response.json('Data Deleted');
  });
});

//FILE UPLOAD
var fileUpload = require('express-fileupload');
var fs = require('fs');
app.use(fileUpload());
app.use('/Photos', Express.static(__dirname + '/Photos'));

app.post('/api/employee/savefile', (request, response) => {
  fs.writeFile('./Photos/' + request.files.file.name, request.files.file.data, function (err) {
    if (err) {
      l;
      return console.log(err);
    }
    response.json(request.files.file.name);
  });
});
