var { MongoClient } = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017';
var dbName = 'reviews';

var createConnection = function(callback) {
  MongoClient.connect(url, { useNewUrlParser: true}, function(err, client) {
    assert.equal(null, err);
    console.log("Connected to MongoDB");

    var db = client.db(dbName);

    callback(db, client);
  });
}

module.exports = createConnection;