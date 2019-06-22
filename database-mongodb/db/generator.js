var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var faker = require('faker');
var { performance } = require('perf_hooks');
var { generateReviewValues, generateUserValues } = require('./helper.js');
var createConnection = require('./index.js');

createConnection(function(db, client) {
  var reviews = db.collection('reviews');
  var users = db.collection('users');

  var time = performance.now();
  var insertData = function(count) {
    var count = count || 0;
    var seed = 100000;
    var total = 10000000;

    var reviewValues = generateReviewValues(seed);
    var userValues = generateUserValues(seed);

    reviews.insertMany(reviewValues, function(err, result) {
      assert.equal(null, err);
      users.insertMany(userValues, function(err, result) {
        assert.equal(null, err);
        console.log("db updated");
        if (count < (total/seed/2)-1) {
          count ++;
          insertData(count);
        } else {
          client.close();
          var timeEnd = performance.now();
          console.log("Query insert completed in: ", (timeEnd - time)/60000, "mins");
        }
      });
    });
  }
  insertData();
});


/**
 *  Use connect method to connect to the server
 */

// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   var db = client.db(dbName);
//   insertDocuments(db, function() {
//     client.close();
//   });
// });

/**
 * Using callbacks
 */

// var insertDocuments = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }

/**
 * Synchronous connect
 */

// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   var db = client.db(dbName);
//   var collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany([{a : 1}, {a : 2}, {a : 3}], function(err, result) {
//     console.log("Inserted 3 documents into the collection");
//   });
// });