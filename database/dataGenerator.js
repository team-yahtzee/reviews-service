const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');
const path = require('path');
const { userSchema, apartmentSchema, reviewSchema, apartmentAddresses } = require('./schema.js');


let db = new sqlite3.Database(path.join(__dirname, './reviews.db'), err => {
  if (err) {
    console.error('ERROR: There was a problem connecting to the review database.');
  } else {
    console.log('Connected to the review database!');
  }
});


let userQuery = `INSERT INTO users (name, avatar) VALUES (?, ?)`
let apartmentQuery = `INSERT INTO apartments (address, owned_by_user_id) VALUES (?, ?)`
let reviewQuery = `INSERT INTO reviews (date, text, rating, user_id, apartment_id, has_response, owner_response) VALUES (?, ?, ?, ?, ?, ?, ?)`
  

db.serialize(() => {

  db.run(`DROP TABLE IF EXISTS users`);
  db.run(userSchema);
  const userStatement = db.prepare(userQuery);
  for (let i = 0; i < 400; i++) {
    userStatement.run(faker.name.firstName(), faker.internet.avatar());
  }


  db.run(`DROP TABLE IF EXISTS apartments`);
  db.run(apartmentSchema);
  const apartmentStatement = db.prepare(apartmentQuery);
  for (let i = 1; i < 101; i++) {
    apartmentStatement.run(apartmentAddresses[i], i);
  }


  db.run(`DROP TABLE IF EXISTS reviews`);
  db.run(reviewSchema);
  const reviewStatement = db.prepare(reviewQuery);
  for (let i = 0; i < 10000; i++) {
    if (Math.random() > .5) {
      reviewStatement.run(
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
      );
    } else {
      reviewStatement.run(
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
      ); 
    }
  }
  
  userStatement.finalize();
  apartmentStatement.finalize();
  reviewStatement.finalize();
});


db.close();


module.exports = db;