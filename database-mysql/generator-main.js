var async = require('async');
var db = require('./db/index.js');
var faker = require('faker');

var maxRecordsSize = 10000;
var combinedRecords = 2000;
var records = combinedRecords / 2;
var times = maxRecordsSize / combinedRecords;

var createReviewItems = function() {
  var inserts = [];
  for (var i = 0; i < records; i++) {
    if (Math.random() > 0.5) {
      values = [
        faker.date.month() +
          " " +
          faker.random.number({ min: 2015, max: 2019 }),
        faker.lorem.sentences(Math.ceil(Math.random() * 6)),
        Math.floor((() => Math.random() * 5)()) + 0.5,
        faker.random.number({
          min: 1,
          max: 200
        }),
        faker.random.number({
          min: 1,
          max: 100
        }),
        Math.random() > 0.66,
        faker.lorem.sentences(Math.ceil(Math.random() * 4))
      ];
      inserts.push(values);
    } else {
      values = [
        faker.date.month() +
          " " +
          faker.random.number({ min: 2015, max: 2019 }),
        faker.lorem.sentences(Math.ceil(Math.random() * 6)),
        Math.floor((() => Math.random() * 5)()) + 1,
        faker.random.number({
          min: 1,
          max: 200
        }),
        faker.random.number({
          min: 1,
          max: 100
        }),
        Math.random() > 0.66,
        faker.lorem.sentences(Math.ceil(Math.random() * 4))
      ];
      inserts.push(values);
    }
  }
  return inserts;
}

var createUserItems = function() {
  var inserts = []
  for (var i = 0; i < records; i++) {
    var values = [faker.name.firstName(), faker.internet.avatar()];
    inserts.push(values);
  }
  return inserts;
}

var count = 0;
var generateReviewData = function() {
  var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`;
  var reviewItems = createReviewItems();

  db.query(reviewQuery, [reviewItems], function(error, results) {
    if (error) return console.error(error);
    var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
    var usersInserts = createUserItems();
    
    db.query(userQuery, [usersInserts], function(err, results) {
      if (err) return console.error(err.message);
      console.log('Successfully seeded records');
    });
  });
  count ++;
};

async.whilst(function() { return count < times; }, function(callback) {
    generateReviewData();
    console.log("Generator script executed.");
    callback();
  },
  function(err) {
    if (err) return console.log(err);
    console.log('Successfully seeded data.');
  }
);
