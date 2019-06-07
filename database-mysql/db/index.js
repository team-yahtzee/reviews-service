var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 5,
  user: 'root',
  password: 'new_password',
  database: 'reviews'
});

// var db = mysql.createConnection({
//   user: 'root',
//   password: 'new_password',
//   database: 'reviews'
// });

// db.connect(function(err) {
//   if (err) {
//     console.error("error connection:", err.stack);
//     return;
//   }
//   console.log("Establish mysql connection");
// })

module.exports.pool = pool;