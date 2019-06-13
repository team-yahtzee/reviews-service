var testCases = require('./tests-requests.json');
var HTTPerf = require('httperfjs');
var httperf = new HTTPerf({
  server: "google.com",
  uri: "/",
  "num-conns": 9                                
});

var run;
function testFactory(uri, expected) {
  tests['"' + uri + '" should be greater then ' + expected] = function(test) {
    test.expect(1);
    httperf.update_option("uri", uri);
    httperf.run(function(run) {
      test.ok(run.request_rate_per_sec < expected, 
        "too few: got ", run.request_rate_per_sec
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