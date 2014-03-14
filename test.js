var filterStack = require("./");
var test = require("tape");

test('excluding modules from error stack', function (assert) {
  var err = new Error('lorem ipsum');
  err.stack = stack.join('\n');

  var exclude = ['foo', 'bar'];
  filterStack(err, exclude);

  assert.plan(1);
  assert.deepEqual(err.stack.split('\n'), expected);
});

var stack = ["Error: should be equal",
             "    at Test.assert (/dev/project/node_modules/foo/lib/lorem.js:178:54)",
             "    at Test.equal (/dev/project/node_modules/bar/lib/ipsum.js:301:10)",
             "    at Expect (/dev/project/lib/dolor.js:39:29)",
             "    at null._onTimeout (/dev/project/example.js:10:32)",
             "    at Timer.listOnTimeout (timers.js:110:15)"];

var expected = ["Error: should be equal",
             "    at Expect (/dev/project/lib/dolor.js:39:29)",
             "    at null._onTimeout (/dev/project/example.js:10:32)",
             "    at Timer.listOnTimeout (timers.js:110:15)"];
