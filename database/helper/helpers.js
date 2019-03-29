const sqlite3 = require('sqlite3');
const path = require('path');

const getReviewsFromDatabase = (id, callback) => {
  let db = new sqlite3.Database(path.join(__dirname, '../reviews.db'), err => {
    if (err) {
      console.log(err)
    } else {
      db.all(`SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating FROM users, reviews WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id};`, [], (err, rows) => {  
        if (err) {
          console.log('Error querying database', err)
        } else {
          db.close(() => { callback(null, rows), console.log('Got reviews and closed database')})
        }
      });
    }
  });
}

module.exports.getReviewsFromDatabase = getReviewsFromDatabase;