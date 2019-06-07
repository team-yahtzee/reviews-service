var generateUserData = function() {
  var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
  var inserts = [];
  for (var i = 0; i < records; i++) {
    var values = [faker.name.firstName(), faker.internet.avatar()];
    inserts.push(values);
  }
  pool.query(userQuery, [inserts], function(err, results) {
    if (err) return console.error(err.message);
    console.log("Rows inserted: ", results.affectedRows);
  });
}

/** Asynchronous Solution */
var generateUserDataAsync = function() {
  return new Promise(function(resolve, reject) {
    var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
    var inserts = [];
    for (var i = 0; i < records; i++) {
      var values = [faker.name.firstName(), faker.internet.avatar()];
      inserts.push(values);
    }
    pool.query(userQuery, [inserts], function(err, results) {
      if (err) {
        reject(new Error("something broke!", err));
      } else {
        console.log("Rows inserted: ", results.affectedRows);
        resolve();
      }
    })
  })
}

var generateApartmentData = function() {
  var apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES ?`
  var inserts = [];
  for (var i = 0; i < records; i++) {
    var values = [apartmentAddresses[i], i + 1];
    inserts.push(values);
  }
  pool.query(apartmentQuery, [inserts], function(error, results) {
    if (error) return console.error(error.message);
    console.log("Rows inserted:", results.affectedRows);
  });
}

var generateApartmentDataAsync = function() {
  return new Promise(function(resolve, reject) {
    var apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES ?`
    var inserts = [];
    for (var i = 0; i < records; i++) {
      var values = [apartmentAddresses[i], i + 1];
      inserts.push(values);
    }
    pool.query(apartmentQuery, [inserts], function(error, results) {
      if (error) {
        reject(new Error("something broke", error));
      } else {
        console.log("Rows inserted:", results.affectedRows);
        resolve();
      }
    });
  })
}

var generateReviewDataAsync = function() {
  return new Promise(function(resolve, reject) {
    var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`
    var inserts = generateReviewValues();
    pool.query(reviewQuery, [inserts], function(error, results) {
      if (error) {
        reject(new Error("something broke.", error));
      } else {
        console.log("Rows inserted:", results.affectedRows);
        resolve();
      }
    })
  });
}