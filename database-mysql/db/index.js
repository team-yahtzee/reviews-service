var mysql = require('mysql');
var config = require('./config.json');

// var pool = mysql.createPool({
//   host: 'localhost',
//   connectionLimit: 10,
//   user: 'root',
//   password: 'new_password',
//   database: 'reviews'
// })

var db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port
});

db.connect(function(err) {
  if (err) {
    console.error("error connection:", err.stack);
    return;
  }
  console.log("Establish mysql connection");
});


module.exports = db;
