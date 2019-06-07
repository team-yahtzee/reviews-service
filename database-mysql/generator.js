var mysql = require('mysql');
var { promisify } = require('util');
var path = require('path');
var { pool } = require('./db/index.js');
var faker = require('faker');
var { apartmentAddresses } = require('./address.js');

pool.getConnection(function(err, connection) {
  if (err) {
    console.error("Database connection error: ", err.stack);
  } else {
    console.log("Connected to database.");
  }

  var maxRecordsSize = 100000;
  var times = 6;
  var records = maxRecordsSize / (3 * times);
  
  var generateReviewValues = function() {
    var inserts = [];
    for (var i = 0; i < records; i++) {
      if (Math.random() > .5) {
        values = [
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
        inserts.push(values);
      } else {
        values = [
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
        inserts.push(values);
      }
    }
    return inserts;
  }

  while (times > 0) {
    var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`
    var reviewInserts = generateReviewValues();
    pool.query(reviewQuery, [reviewInserts], function(error, results) {
    if (error) return console.error(error);
    console.log("Rows inserted:", results.affectedRows);

      var apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES ?`
      var apartmentInserts = [];
      for (var i = 0; i < records; i++) {
        var values = [apartmentAddresses[i], i + 1];
        apartmentInserts.push(values);
      }
      pool.query(apartmentQuery, [apartmentInserts], function(error, results) {
        if (error) return console.error(error.message);
        console.log("Rows inserted:", results.affectedRows);
        
        var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
        var usersInserts = [];
        for (var i = 0; i < records; i++) {
          var values = [faker.name.firstName(), faker.internet.avatar()];
          usersInserts.push(values);
        }
        pool.query(userQuery, [usersInserts], function(err, results) {
          if (err) return console.error(err.message);
          console.log("Rows inserted: ", results.affectedRows);                
        });
      });
    });
    times -= 1;
  }

  connection.release();

  // var generateReviewData = function() {
  //   var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`
  //   var reviewInserts = generateReviewValues();
  //   pool.query(reviewQuery, [reviewInserts], function(error, results) {
  //     if (error) return console.error(error);
  //     console.log("Rows inserted:", results.affectedRows);

  //   // apartments query
  //     var apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES ?`
  //     var apartmentInserts = [];
  //     for (var i = 0; i < records; i++) {
  //       var values = [apartmentAddresses[i], i + 1];
  //       apartmentInserts.push(values);
  //     }
  //     pool.query(apartmentQuery, [apartmentInserts], function(error, results) {
  //       if (error) return console.error(error.message);
  //       console.log("Rows inserted:", results.affectedRows);
        
  //       // users query
  //       var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
  //       var usersInserts = [];
  //       for (var i = 0; i < records; i++) {
  //         var values = [faker.name.firstName(), faker.internet.avatar()];
  //         usersInserts.push(values);
  //       }
  //       pool.query(userQuery, [usersInserts], function(err, results) {
  //         if (err) return console.error(err.message);
  //         console.log("Rows inserted: ", results.affectedRows);
          
  //         // repeat once
  //           var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`
  //           var reviewInserts = generateReviewValues();
  //           pool.query(reviewQuery, [reviewInserts], function(error, results) {
  //           if (error) return console.error(error);
  //           console.log("Rows inserted:", results.affectedRows);
      
  //         // apartments query
  //           var apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES ?`
  //           var apartmentInserts = [];
  //           for (var i = 0; i < records; i++) {
  //             var values = [apartmentAddresses[i], i + 1];
  //             apartmentInserts.push(values);
  //           }
  //           pool.query(apartmentQuery, [apartmentInserts], function(error, results) {
  //             if (error) return console.error(error.message);
  //             console.log("Rows inserted:", results.affectedRows);
              
  //             // users query
  //             var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
  //             var usersInserts = [];
  //             for (var i = 0; i < records; i++) {
  //               var values = [faker.name.firstName(), faker.internet.avatar()];
  //               usersInserts.push(values);
  //             }
  //             pool.query(userQuery, [usersInserts], function(err, results) {
  //               if (err) return console.error(err.message);
  //               console.log("Rows inserted: ", results.affectedRows);

  //               // repeat twice
  //               var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`
  //               var reviewInserts = generateReviewValues();
  //               pool.query(reviewQuery, [reviewInserts], function(error, results) {
  //               if (error) return console.error(error);
  //               console.log("Rows inserted:", results.affectedRows);
          
  //               // apartments query
  //                 var apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES ?`
  //                 var apartmentInserts = [];
  //                 for (var i = 0; i < records; i++) {
  //                   var values = [apartmentAddresses[i], i + 1];
  //                   apartmentInserts.push(values);
  //                 }
  //                 pool.query(apartmentQuery, [apartmentInserts], function(error, results) {
  //                   if (error) return console.error(error.message);
  //                   console.log("Rows inserted:", results.affectedRows);
                    
  //                   // users query
  //                   var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
  //                   var usersInserts = [];
  //                   for (var i = 0; i < records; i++) {
  //                     var values = [faker.name.firstName(), faker.internet.avatar()];
  //                     usersInserts.push(values);
  //                   }
  //                   pool.query(userQuery, [usersInserts], function(err, results) {
  //                     if (err) return console.error(err.message);
  //                     console.log("Rows inserted: ", results.affectedRows);

  //                     // repeat third time
  //                     var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`
  //                     var reviewInserts = generateReviewValues();
  //                     pool.query(reviewQuery, [reviewInserts], function(error, results) {
  //                     if (error) return console.error(error);
  //                     console.log("Rows inserted:", results.affectedRows);
                
  //                     // apartments query
  //                       var apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES ?`
  //                       var apartmentInserts = [];
  //                       for (var i = 0; i < records; i++) {
  //                         var values = [apartmentAddresses[i], i + 1];
  //                         apartmentInserts.push(values);
  //                       }
  //                       pool.query(apartmentQuery, [apartmentInserts], function(error, results) {
  //                         if (error) return console.error(error.message);
  //                         console.log("Rows inserted:", results.affectedRows);
                          
  //                         // users query
  //                         var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
  //                         var usersInserts = [];
  //                         for (var i = 0; i < records; i++) {
  //                           var values = [faker.name.firstName(), faker.internet.avatar()];
  //                           usersInserts.push(values);
  //                         }
  //                         pool.query(userQuery, [usersInserts], function(err, results) {
  //                           if (err) return console.error(err.message);
  //                           console.log("Rows inserted: ", results.affectedRows);

  //                           // repeat fourth time
  //                           var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`
  //                           var reviewInserts = generateReviewValues();
  //                           pool.query(reviewQuery, [reviewInserts], function(error, results) {
  //                           if (error) return console.error(error);
  //                           console.log("Rows inserted:", results.affectedRows);
                      
  //                           // apartments query
  //                             var apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES ?`
  //                             var apartmentInserts = [];
  //                             for (var i = 0; i < records; i++) {
  //                               var values = [apartmentAddresses[i], i + 1];
  //                               apartmentInserts.push(values);
  //                             }
  //                             pool.query(apartmentQuery, [apartmentInserts], function(error, results) {
  //                               if (error) return console.error(error.message);
  //                               console.log("Rows inserted:", results.affectedRows);
                                
  //                               // users query
  //                               var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
  //                               var usersInserts = [];
  //                               for (var i = 0; i < records; i++) {
  //                                 var values = [faker.name.firstName(), faker.internet.avatar()];
  //                                 usersInserts.push(values);
  //                               }
  //                               pool.query(userQuery, [usersInserts], function(err, results) {
  //                                 if (err) return console.error(err.message);
  //                                 console.log("Rows inserted: ", results.affectedRows);

  //                                 // repeat fourth time
  //                                 var reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES ?`
  //                                 var reviewInserts = generateReviewValues();
  //                                 pool.query(reviewQuery, [reviewInserts], function(error, results) {
  //                                 if (error) return console.error(error);
  //                                 console.log("Rows inserted:", results.affectedRows);
                            
  //                                 // apartments query
  //                                   var apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES ?`
  //                                   var apartmentInserts = [];
  //                                   for (var i = 0; i < records; i++) {
  //                                     var values = [apartmentAddresses[i], i + 1];
  //                                     apartmentInserts.push(values);
  //                                   }
  //                                   pool.query(apartmentQuery, [apartmentInserts], function(error, results) {
  //                                     if (error) return console.error(error.message);
  //                                     console.log("Rows inserted:", results.affectedRows);
                                      
  //                                     // users query
  //                                     var userQuery = `INSERT INTO users (name, avatar) VALUES ?`;
  //                                     var usersInserts = [];
  //                                     for (var i = 0; i < records; i++) {
  //                                       var values = [faker.name.firstName(), faker.internet.avatar()];
  //                                       usersInserts.push(values);
  //                                     }
  //                                     pool.query(userQuery, [usersInserts], function(err, results) {
  //                                       if (err) return console.error(err.message);
  //                                       console.log("Rows inserted: ", results.affectedRows);                
  //                                     });
  //                                   });
  //                                 });
  //                                 //repeat ends


  //                               });
  //                             });
  //                           });
  //                           //repeat ends


  //                         });
  //                       });
  //                     });
  //                     //repeat ends


  //                   });
  //                 });
  //               });
  //               //repeat ends


  //             });
  //           });
  //         });
  //         //repeat ends


  //       });
  //     });
  //   });
  // }

  // generateReviewData();
});

pool.end(function(err) {
  if (err) {
    return console.error(err.message);
  } else {
    console.log("Closed all connections");
  }
});

// process.on('exit', function() {
//   console.timeEnd(generatorsCombined);
// });
