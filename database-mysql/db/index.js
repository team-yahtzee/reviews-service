var mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  password: 'new_password',
  database: 'reviews'
});

db.connect(function(err) {
  if (err) {
    console.error("Database connection error: ", err.stack);
  } else {
    console.log("Connected to database.");
  }
});

module.exports = db;