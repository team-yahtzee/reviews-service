var testCases = require('./tests-conn.json');
var HTTPerf = require('httperfjs');
var httperf = new HTTPerf({
  server: "google.com",
  uri: "/",
  "num-conns": 9                                
});

var run;
function testFactory(uri, expected) {
  tests['"' + uri + '" should be less then ' + expected] = function(test) {
    test.expect(1);
    httperf.update_option("uri", uri);
    httperf.run(function(run) {
      test.ok(run.connection_time_median < expected,
        "too slow: got ", run.connection_time_median
          + "but expected < " + expected);
      test.done();
    });
  };
}
var tests = {
  tearDown: function(callback) {
    run = undefined;
    callback();
  },
};

testCases.forEach(function(testCase) {
  testFactory(testCase.uri, testCase.expected);
});

module.exports = tests;

/**
 * Use test script with deployment
 * httperf --server <ec2 ip address> --port 80 --num-conns 10 --rate 1
 */