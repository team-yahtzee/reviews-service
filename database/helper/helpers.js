const sqlite3 = require('sqlite3');
const path = require('path');

const getReviewsFromDatabase = (id, callback) => {
  let db = new sqlite3.Database(path.join(__dirname, '../reviews.db'), err => {
    if (err) {
      console.error(err);
    } else {
      db.all(`SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response FROM users, reviews WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id};`, [], (err, rows) => {  
        if (err) {
          console.error('Error querying database for all results', err);
        } else {
          db.close(() => { callback(null, rows), console.log('Got reviews and closed database')});
        }
      });
    }
  });
}

const getSearchResultsFromDatabase = (id, word, callback) => {
  let db = new sqlite3.Database(path.join(__dirname, '../reviews.db'), err => {
    if (err) {
      console.error(err);
    } else {
      db.all(`SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response FROM users, reviews WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id} AND (reviews.text LIKE '%${word}%' OR reviews.text LIKE '% ${word}%');`, [], (err, rows) => {  
        if (err) {
          console.error('Error querying database for searched word results', err);
        } else {
          db.close(() => { callback(null, rows), console.log('Got search results and closed database')});
        }
      });
    }
  });
}

module.exports.getReviewsFromDatabase = getReviewsFromDatabase;
module.exports.getSearchResultsFromDatabase = getSearchResultsFromDatabase;