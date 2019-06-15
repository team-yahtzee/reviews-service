const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'reviews';

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");

  var db = client.db(dbName);

  var collectionReviews = db.collection('documents_reviews');
  var collectionUsers = db.collection('documents_users');

  var reviewsInsertsSubOne = {
    "id": 1,
    "date": "April 2016",
    "text": "Quidem ut enim aut et neque qui.",
    "rating": 5,
    "user_id": 60,
    "apartment_id": 88,
    "has_response": true,
    "owner_response": "Error nostrum quaerat nam. Dignissimos molestiae exercitationem alias et. Laudantium excepturi modi animi assumenda voluptatem vel et. Facere qui tempora et qui totam sint sunt fugiat."
  };

  var generateReviewValues = function() {
    var reviewsValues = [];
    var i = 0;
    while (i < 1000) {
      var values = {};
      values.id = i + 1;
      values.date = faker.date.month() + " " + faker.random.number({ min: 2015, max: 2019 });
      values.text = faker.lorem.sentences(Math.ceil(Math.random() * 6));
      values.rating = Math.round((() => Math.random() * 5)());
      values.user_id = faker.random.number({
        min: 1,
        max: 200
      });
      values.apartment_id = faker.random.number({
        min: 1,
        max: 100
      });
      values.has_response = Math.random() > 0.66;
      values.owner_response = faker.lorem.sentences(Math.ceil(Math.random() * 4));

      reviewsValues.push(values);
      i += 1;
    }

    return reviewsValues;
  }

  var generateUsersValues = function() {
    var usersValues = [];
    var i = 0;
    while (i < 1000) {
      var values = {
        "name": faker.name.firstName(),
        "avatar": faker.internet.avatar()
      };
      
      usersValues.push(values);
      i += 1;
    }

    return usersValues;
  }

  var reviewsValues = generateReviewValues();
  var usersValues = generateUsersValues();

  collectionReviews.insertMany(reviewsValues, function(err, results) {
    assert.equal(null, err);
    console.log("Inserted reviews documents into the collection");

    collectionUsers.insertMany(usersValues, function(err, results) {
      assert.equal(null, err);
      console.log("Inserted users documents into the collection");

      client.close();
    });
  });
});

// +----+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+---------+--------------+--------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
// | id | date          | text                                                                                                                                                                                                                                                    | rating | user_id | apartment_id | has_response | owner_response                                                                                                                                                                           |
// +----+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+---------+--------------+--------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
// |  1 | April 2016    | Quidem ut enim aut et neque qui. Rerum cupiditate sequi necessitatibus. Ab ea tempora qui.                                                                                                                                                              |      5 |      60 |           88 | 0            | Error nostrum quaerat nam. Dignissimos molestiae exercitationem alias et. Laudantium excepturi modi animi assumenda voluptatem vel et. Facere qui tempora et qui totam sint sunt fugiat. |
// |  2 | December 2016 | Corrupti ea nisi maxime ad dolor nobis aperiam qui unde. Animi eaque enim perspiciatis. Ut possimus debitis ut praesentium minima nulla enim quod aut. Reprehenderit sit eveniet. Mollitia incidunt consequatur iusto. Delectus consectetur cupiditate. |      5 |      77 |           40 | 0            | Architecto voluptatibus non quas quam nobis atque sequi. Culpa corrupti autem.                                                                                                           |
// +----+---------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+---------+--------------+--------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+


/**
 * Using callbacks
*/

// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('documents');
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
 
//   const db = client.db(dbName);
 
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
 
//   const db = client.db(dbName);
 
//   const collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany([{a : 1}, {a : 2}, {a : 3}], function(err, result) {
//     console.log("Inserted 3 documents into the collection");
//   });
// });