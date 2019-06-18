var { createConnection } = require('../db/index.js');

var getReviewsFromDatabase = function(id, callback) {
  createConnection(function(db) {
    var reviews = db.collection('reviews');
    reviews.findOne({ id }, { date: 1, text: 1, rating: 1, has_response: 1, owner_response: 1}, function(err, result) {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  })
}

var getSearchResultsFromDatabase = function(id, word, callback) {
  createConnection(function(db) {
    var reviews = db.collection('reviews');
    reviews.find({id}, function(err, result) {
      callback(result);
    })
  })
}

module.exports.getReviewsFromDatabase = getReviewsFromDatabase;
module.exports.getSearchResultsFromDatabase = getSearchResultsFromDatabase;