var HTTPerf = require('httperfjs');
var httperf = new HTTPerf({
  server: "yahoo.com",
  uri: "/",
  "num-conns": 9
});

var run;

module.exports = {
  tearDown: function(callback) {
    run = undefined;
    callback();
  },

  'homepage should be quick': function(test) {
    test.expect(1);
    httperf.run(function(run) {
      test.ok(run.connection_time_avg < 200,
        "homepage was too slow: got " + run.connection_time_avg
          + " but expected: < 200");
      test.done();
    });
  },

  'archive should be quick': function(test) {
    test.expect(1);
    httperf.run(function(run) {
      test.ok(run.connection_time_median < 200,
        "archive was too slow: got " + run.connection_time_median
          + " but expected: < 200");
      test.done();
    });
  }
};