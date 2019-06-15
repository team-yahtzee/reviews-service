var faker = require('faker');

var generateReviewValues = function(seed) {
  var reviewsValues = [];
  var i = 0;
  while (i < seed) {
    var value = {};
    value.id = i + 1;
    value.date = faker.date.month() + " " + faker.random.number({ min: 2015, max: 2019 });
    value.text = faker.lorem.sentences(Math.ceil(Math.random() * 6));
    value.rating = Math.round((() => Math.random() * 5)());
    value.user_id = faker.random.number({
      min: 1,
      max: 200
    });
    value.apartment_id = faker.random.number({
      min: 1,
      max: 100
    });
    value.has_response = Math.random() > 0.66;
    value.owner_response = faker.lorem.sentences(Math.ceil(Math.random() * 4));

    reviewsValues.push(value);
    i += 1;
  }

  return reviewsValues;
}

var generateUserValues = function(seed) {
  var usersValues = [];
  var i = 0;
  while (i < seed) {
    var value = {
      "name": faker.name.firstName(),
      "avatar": faker.internet.avatar()
    };
    
    usersValues.push(value);
    i += 1;
  }

  return usersValues;
}

module.exports.generateReviewValues = generateReviewValues;
module.exports.generateUserValues = generateUserValues;