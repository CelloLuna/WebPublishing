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
app.get('/api/cello', (request, response) => {
  var query = 'SELECT * from employees';
  connection.query(query, function (err, rows, fields) {
    if (err) {
      response.send('failed');
    }
    response.send(rows);
  });
});

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
