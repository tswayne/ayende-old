var Sequelize = require('sequelize');
var host = process.env.DBHOST || 'localhost';
var dbName = process.env.DBNAME || 'local';
var dbUser = process.env.DBUSER || 'root';
var dbPassword = process.env.DBPW || '';

module.exports =  new Sequelize(dbName, dbUser, dbPassword, {
  host: host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});