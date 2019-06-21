var db = require('../db/index.js');

var getReviewsFromDatabase = function(id, callback) {
  var queryStr = `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response FROM users, reviews WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id} LIMIT 100;`;
  db.query(queryStr, function(err, results) {
    if (err) {
      console.error('Error querying database for all results', err);
      callback(err);
    } else {
      callback(null, results);
      console.log('Got reviews from database');
    }
  });
}

const getSearchResultsFromDatabase = (id, word, callback) => {
  var queryStr = `SELECT users.name, users.avatar, reviews.date, reviews.text, reviews.rating, reviews.has_response, reviews.owner_response FROM users, reviews WHERE users.id = reviews.user_id AND reviews.apartment_id = ${id} AND (reviews.text LIKE '%${word}%' OR reviews.text LIKE '% ${word}%');`
  db.query(queryStr, function(err, results) {
    if (err) {
      console.error('Error querying database for searched word results', err);
    } else {
      callback(null, results);
      console.log('Got search results from database');
    }
  });
}


module.exports.getReviewsFromDatabase = getReviewsFromDatabase;
module.exports.getSearchResultsFromDatabase = getSearchResultsFromDatabase;