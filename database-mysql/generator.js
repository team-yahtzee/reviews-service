var pool = require("./db/index.js");
var faker = require("faker");

pool.getConnection(function(err, connection) {
  console.time();

  if (err) {
    console.error("Database connection error: ", err.stack);
  } else {
    console.log("Connected to database.");
  }

  var maxRecordsSize = 2000000;
  var times = 6;

  var generateReviewValues = function() {
    console.time("timer started");
    var inserts = [];
    for (var i = 0; i < Math.floor(maxRecordsSize/(2*times)); i++) {
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
    var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`;
    var reviewInserts = generateReviewValues();
    pool.query(reviewQuery, [reviewInserts], function(error, results) {
      if (error) return console.error(error);
      console.log("Rows inserted:", results.affectedRows);

      // users query
      var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
      var usersInserts = [];
      for (var i = 0; i < Math.floor(maxRecordsSize/(2*times)); i++) {
        var values = [faker.name.firstName(), faker.internet.avatar()];
        usersInserts.push(values);
      }
      pool.query(userQuery, [usersInserts], function(err, results) {
        if (err) return console.error(err.message);
        console.log("Rows inserted: ", results.affectedRows);

        // repeat once
        var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`;
        var reviewInserts = generateReviewValues();
        pool.query(reviewQuery, [reviewInserts], function(error, results) {
          if (error) return console.error(error);
          console.log("Rows inserted:", results.affectedRows);

          // users query
          var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
          var usersInserts = [];
          for (var i = 0; i < Math.floor(maxRecordsSize/(2*times)); i++) {
            var values = [faker.name.firstName(), faker.internet.avatar()];
            usersInserts.push(values);
          }
          pool.query(userQuery, [usersInserts], function(err, results) {
            if (err) return console.error(err.message);
            console.log("Rows inserted: ", results.affectedRows);

            // repeat twice
            var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`;
            var reviewInserts = generateReviewValues();
            pool.query(reviewQuery, [reviewInserts], function(error, results) {
              if (error) return console.error(error);
              console.log("Rows inserted:", results.affectedRows);

              // users query
              var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
              var usersInserts = [];
              for (var i = 0; i < Math.floor(maxRecordsSize/(2*times)); i++) {
                var values = [faker.name.firstName(), faker.internet.avatar()];
                usersInserts.push(values);
              }
              pool.query(userQuery, [usersInserts], function(err, results) {
                if (err) return console.error(err.message);
                console.log("Rows inserted: ", results.affectedRows);

                // repeat third time
                var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`;
                var reviewInserts = generateReviewValues();
                pool.query(reviewQuery, [reviewInserts], function(error, results) {
                  if (error) return console.error(error);
                  console.log("Rows inserted:", results.affectedRows);

                  // users query
                  var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
                  var usersInserts = [];
                  for (var i = 0; i < Math.floor(maxRecordsSize/(2*times)); i++) {
                    var values = [
                      faker.name.firstName(),
                      faker.internet.avatar()
                    ];
                    usersInserts.push(values);
                  }
                  pool.query(userQuery, [usersInserts], function(err, results) {
                    if (err) return console.error(err.message);
                    console.log("Rows inserted: ", results.affectedRows);

                    // repeat fourth time
                    var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`;
                    var reviewInserts = generateReviewValues();
                    pool.query(reviewQuery, [reviewInserts], function(error, results) {
                      if (error) return console.error(error);
                      console.log("Rows inserted:", results.affectedRows);

                      // users query
                      var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
                      var usersInserts = [];
                      for (var i = 0; i < Math.floor(maxRecordsSize/(2*times)); i++) {
                        var values = [
                          faker.name.firstName(),
                          faker.internet.avatar()
                        ];
                        usersInserts.push(values);
                      }
                      pool.query(userQuery, [usersInserts], function(err, results) {
                        if (err) return console.error(err.message);
                        console.log("Rows inserted: ", results.affectedRows);

                        // repeat fourth time
                        var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`;
                        var reviewInserts = generateReviewValues();
                        pool.query(reviewQuery, [reviewInserts], function(error, results) {
                          if (error) return console.error(error);
                          console.log("Rows inserted:", results.affectedRows);

                          // users query
                          var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
                          var usersInserts = [];
                          for (var i = 0; i < Math.floor(maxRecordsSize/(2*times)); i++) {
                            var values = [
                              faker.name.firstName(),
                              faker.internet.avatar()
                            ];
                            usersInserts.push(values);
                          }
                          pool.query(userQuery, [usersInserts], function(err, results) {
                            if (err) return console.error(err.message);
                            console.log("Rows inserted: ", results.affectedRows);
                          });
                        });
                        //end repeat
                      });
                    });
                    //end repeat
                  });
                });
                //end repeat
              });
            });
            //end repeat
          });
        });
        //end repeat
      });
    });
    //end
    connection.release();
    console.timeEnd();
  };

  generateReviewData();
});