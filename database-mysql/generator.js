var db = require('./db/index.js');
var { promisify } = require('util');
var path = require('path');
var faker = require('faker');
var { apartmentAddresses } = require('./address.js');

var generateUserData = function() {
  var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
  var inserts = [];
  for (var i = 0; i < 100000; i++) {
    var values = [faker.name.firstName(), faker.internet.avatar()];
    inserts.push(values);
  }
  db.query(userQuery, [inserts], function(err, results) {
    if (err) return console.error(err.message);
    console.log("Rows inserted: ", results.affectedRows);
  });
  db.end();
}

/** Asynchronous Solution
***/
var generateUserDataAsync = function() {
  return new Promise(function(resolve, reject) {
    var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
    var inserts = [];
    for (var i = 0; i < 100000; i++) {
      var values = [faker.name.firstName(), faker.internet.avatar()];
      inserts.push(values);
    }
    db.query(userQuery, [inserts], function(err, results) {
      if (err) {
        reject(new Error("something broke!", err));
      } else {
        console.log("Rows inserted: ", results.affectedRows);
        resolve();
      }
    })
  })
}

generateUserDataAsync()
.then(function() {
  console.log("Async success!");
  generateUserData();
  // db.end();
})
.catch(function(err) {
  console.error(err);
  db.end();
});

var generateApartmentData = function() {
  var apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES (?, ?)`
  for (var i = 0; i < 333000; i++) {
    var inserts = [apartmentAddresses[i], i + 1];
    db.query(apartmentQuery, inserts, function(error, results) {
      if (error) throw error;
    });
  }
}

var generateReviewData = function() {
  var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES (?, ?, ?, ?, ?, ?, ?)`
  var inserts = [];
  for (var i = 0; i < 333000; i++) {
    if (Math.random() > .5) {
      inserts = [
        faker.date.month() + ' ' + faker.random.number({ min: 2015, max: 2019}), 
        faker.lorem.sentences(Math.ceil(Math.random() * 6)), 
        Math.floor((() => Math.random() * 5)()) + .5,
        faker.random.number({
          min: 1,
          max: 200
        }),
        faker.random.number({
          min: 1,
          max: 100
        }),
        Math.random() > .66,
        faker.lorem.sentences(Math.ceil(Math.random() * 4))
      ];
      db.query(reviewQuery, inserts, function(error, results) {
        if (error) throw error;
      });
    } else {
      inserts = [
        faker.date.month() + ' ' + faker.random.number({ min: 2015, max: 2019}), 
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
        Math.random() > .66,
        faker.lorem.sentences(Math.ceil(Math.random() * 4))
      ];
      db.query(reviewQuery, inserts, function(error, results) {
        if (error) throw error;
      });
    }
  }
}


// console.time();
// generateUserData();
// console.timeEnd();
// generateUserDataAsync();
// generateApartmentData();
// generateReviewData();

// db.end();

// process.on('exit', () => {
//   console.timeEnd('Timer end');
// });