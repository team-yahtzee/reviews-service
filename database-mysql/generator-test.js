var mysql = require("mysql");
var path = require("path");
var db = require("./db/index.js");
var faker = require("faker");

console.time();

var maxRecordsSize = 10000;
var times = 5;
var records = maxRecordsSize / (2 * times);

// console.time("timer started");
var generateReviewValues = function() {
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
};

var generateReviewData = function() {
  db.query('SET GLOBAL connect_timeout=18800');
  db.query('SET GLOBAL wait_timeout=18800');
  db.query('SET GLOBAL interactive_timeout=18800');
  var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`;
  var reviewInserts = generateReviewValues();
  db.query(reviewQuery, [reviewInserts], function(error, results) {
    if (error) return console.error(error);
    console.log("Rows inserted:", results.affectedRows);

    // users query
    var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
    var usersInserts = [];
    for (var i = 0; i < records; i++) {
      var values = [faker.name.firstName(), faker.internet.avatar()];
      usersInserts.push(values);
    }
    db.query(userQuery, [usersInserts], function(err, results) {
      if (err) return console.error(err.message);
      console.log("Rows inserted: ", results.affectedRows);
    });
  });
};

generateReviewData();