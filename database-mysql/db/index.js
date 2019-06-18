var mysql = require('mysql');

// var pool = mysql.createPool({
//   host: 'localhost',
//   connectionLimit: 10,
//   user: 'root',
//   password: 'new_password',
//   database: 'reviews'
// });

var db = mysql.createConnection({
  host: '52.87.203.199',
  user: 'root',
  password: 'root',
  database: 'reviews',
  port: 3306
});

db.connect(function(err) {
  if (err) {
    console.error("error connection:", err.stack);
    return;
  }
  console.log("Establish mysql connection");
});


module.exports = db;