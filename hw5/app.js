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
