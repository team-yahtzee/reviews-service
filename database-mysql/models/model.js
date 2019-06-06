var db = require('../db/index.js');

var getReviewsFromDatabase = function(id, callback) {
  var queryStr = `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response FROM users, reviews WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id};`;
  db.query(queryStr, function(err, results) {
    if (err) {
      console.error('Error querying database for all results', err);
      callback(err);
    } else {
      db.close(() => { callback(null, results), console.log('Got reviews and closed database')});
    }
  });
}

module.exports.getReviewsFromDatabase = getReviewsFromDatabase;