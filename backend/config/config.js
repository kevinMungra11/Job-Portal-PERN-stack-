const fs = require('fs');
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.uName,
    password: process.env.password,
    database: process.env.dbName,
    host: process.env.hostIP,
    port: process.env.dbPort,
    dialect: process.env.dia,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '127.0.0.1',
    port: '',
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  // production: {
  //   username: '',
  //   password: '',
  //   database: '',
  //   host: '',
  //   port: '',
  //   dialect: 'postgres',
  //   dialectOptions: {
  //     bigNumberStrings: true,
  //     ssl: {
  //       ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
  //     }
  //   }
  // }
};