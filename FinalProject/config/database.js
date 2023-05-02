require('dotenv').config();
const Sequelize = require('sequelize').Sequelize;
const MSSQL_USER = process.env.MSSQL_USER;
const MSSQL_PWD = process.env.MSSQL_PWD;
const MSSQL_SERVER = process.env.MSSQL_SERVER;
const MSSQL_DB = process.env.MSSQL_DB;

module.exports.sequelize = new Sequelize(MSSQL_DB, MSSQL_USER, MSSQL_PWD, {
  dialect: 'mssql',
  host: MSSQL_SERVER,
  port: 1433,
  logging: (log) => {
    console.log('LOG MSG: ', log);
  },
});
