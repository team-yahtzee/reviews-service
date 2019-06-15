var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var faker = require('faker');
var { performance } = require('perf_hooks');
var { generateReviewValues, generateUserValues } = require('./helper.js');
var createConnection = require('./index.js');

createConnection(function(db) {
  var reviews = db.collection('reviews');
  var users = db.collection('users');

  var time = performance.now();
  var insertData = function(count = 0) {
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
          var timeEnd = performance.now();
          console.log("Query insert completed in: ", (timeEnd - time)/60000, "mins");
        }
      });
    });
  }
  insertData();
});

 
// // Connection URL
// var url = 'mongodb://localhost:27017';
 
// // Database Name
// var dbName = 'reviews';

// MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to mongodb server");
  
//   var db = client.db(dbName);

//   var reviews = db.collection('reviews');
//   var users = db.collection('users');

  // var insertDocuments = function() {
    // var timeStart = performance.now();
  //   var total = 100000
  //   var seed = 10000
  //   var count = total / (seed * 2);
  //   var i = 0;
  //   while (i < count) {
  //     var reviewsValues = generateReviewValues(seed);
  //     var usersValues = generateUsersValues(seed);

  //     reviews.insertMany(reviewsValues, function(err, results) {
  //       assert.equal(null, err);
  //       console.log("Inserted reviews documents into the collection");

  //       users.insertMany(usersValues, function(err, results) {
  //         assert.equal(null, err);
  //         var timeEnd = performance.now();
  //         console.log("Inserted users documents into the collection. ", "Total time elapsed: ", timeEnd - timeStart);
  //         client.close();
  //       });
  //     });
  //     i++;
  //   }
  // }

  // insertDocuments();




// });

// +----+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+---------+--------------+--------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
// | id | date          | text                                                                                                                                                                                                                                                    | rating | user_id | apartment_id | has_response | owner_response                                                                                                                                                                           |
// +----+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+---------+--------------+--------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
// |  1 | April 2016    | Quidem ut enim aut et neque qui. Rerum cupiditate sequi necessitatibus. Ab ea tempora qui.                                                                                                                                                              |      5 |      60 |           88 | 0            | Error nostrum quaerat nam. Dignissimos molestiae exercitationem alias et. Laudantium excepturi modi animi assumenda voluptatem vel et. Facere qui tempora et qui totam sint sunt fugiat. |
// |  2 | December 2016 | Corrupti ea nisi maxime ad dolor nobis aperiam qui unde. Animi eaque enim perspiciatis. Ut possimus debitis ut praesentium minima nulla enim quod aut. Reprehenderit sit eveniet. Mollitia incidunt consequatur iusto. Delectus consectetur cupiditate. |      5 |      77 |           40 | 0            | Architecto voluptatibus non quas quam nobis atque sequi. Culpa corrupti autem.                                                                                                           |
// +----+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+---------+--------------+--------------+-------------------------------------------------------------------------

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

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
 
//   var db = client.db(dbName);
 
//   insertDocuments(db, function() {
//     client.close();
//   });
// });

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