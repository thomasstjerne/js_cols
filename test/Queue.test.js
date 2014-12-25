var js_cols =  process.env.JS_COLS_COVERAGE ? require("../dist-cov/js_cols") : require("../dist/js_cols");
var assert = require('assert');

function stringifyQueue(q) {
  var values = q.getValues();
  var s = '';
  for (var i = 0; i < values.length; i++) {
    s += values[i];
  }
  return s;
}

function createQueue() {
  var q = new js_cols.Queue();
  q.enqueue('a');
  q.enqueue('b');
  q.enqueue('c');
  return q;
}

exports.testConstructor = function(test) {
  var q = new js_cols.Queue();
  assert.ok( q.isEmpty(), 'testConstructor(), queue should be empty initially');
  assert.equal( q.getCount(), 0, 'testConstructor(), count should be 0');
  assert.equal( q.peek(),
      null, 'testConstructor(), head element should be null');
	  test.done();
}

exports.testCount= function(test) {
  var q = createQueue();
  assert.equal( q.getCount(), 3, 'testCount(), count should be 3');
  q.enqueue('d');
  assert.equal( q.getCount(), 4, 'testCount(), count should be 4');
  q.dequeue();
  assert.equal( q.getCount(), 3, 'testCount(), count should be 3');
  q.clear();
  assert.equal( q.getCount(), 0, 'testCount(), count should be 0');
  test.done()
}

exports.testEnqueue= function(test) {
  var q = new js_cols.Queue();
  q.enqueue('a');
  assert.equal( q.getCount(), 1, 'testEnqueue(), count should be 1');
  q.enqueue('b');
  assert.equal( q.getCount(), 2, 'testEnqueue(), count should be 2');
  assert.equal( q.peek(), 'a', 'testEnqueue(), head element should be a');
  q.dequeue();
  assert.equal( q.getCount(), 1, 'testEnqueue(), count should be 1');
  assert.equal( q.peek(), 'b', 'testEnqueue(), head element should be b');
  test.done();
}

exports.testDequeue= function(test) {
  var q = createQueue();
  var head = q.dequeue();
  assert.equal( head, 'a', 'testDequeue(), should return a');
  q.dequeue();
  head = q.dequeue();
  assert.equal( head, 'c', 'testDequeue(), should return c');
  assert.ok( q.isEmpty(), 'testDequeue(), queue should be empty');
  head = q.dequeue();
  assert.equal( head,
      null, 'testDequeue(), should return null for empty queue');
	  test.done();
}

exports.testPeek= function(test) {
  var q = createQueue();
  var head = q.peek();
  assert.equal( head, 'a', 'testPeek(), should return a');
  var head2 = q.dequeue();
  assert.equal( head, head2, 'testPeek(), dequeue should return peek() result');
  head = q.peek();
  assert.equal( head, 'b', 'testPeek(), should return b');
  q.clear();
  head = q.peek();
  assert.equal( head,
      null, 'testPeek(), should return null for empty queue');
	  test.done();
}

exports.testClear= function(test) {
  var q = createQueue();
  q.clear();
  assert.ok( q.isEmpty(), 'testClear(), queue should be empty');
  test.done();
}

exports.testQueue= function(test) {
  var q = createQueue();
  assert.equal( stringifyQueue(q), 'abc', 'testQueue(), contents must be abc');
  test.done();
}

exports.testRemove= function(test) {
  var q = createQueue();
  assert.equal( stringifyQueue(q), 'abc', 'testRemove(), contents must be abc');

  q.dequeue();
  assert.equal( stringifyQueue(q), 'bc', 'testRemove(), contents must be bc');

  q.enqueue('a');
  assert.equal( stringifyQueue(q), 'bca', 'testRemove(), contents must be bca');

  assert.ok( q.remove('c'), 'testRemove(), remove should have returned true');
  assert.equal( stringifyQueue(q), 'ba', 'testRemove(), contents must be ba');

  assert.ok( q.remove('b'), 'testRemove(), remove should have returned true');
  assert.equal( stringifyQueue(q), 'a', 'testRemove(), contents must be a');

  assert(! q.remove('b'), 'testRemove(), remove should have returned false');
  assert.equal( stringifyQueue(q), 'a', 'testRemove(), contents must be a');

  assert.ok( q.remove('a'), 'testRemove(), remove should have returned true');
  assert.equal( stringifyQueue(q), '', 'testRemove(), contents must be empty');
  test.done();
}

exports.testContains = function(test){
  var q = createQueue();
  assert.ok(
      q.contains('a'), 'testContains(), contains should have returned true');
	  assert(!
      q.contains('foobar'), 'testContains(), contains should have returned false');
	  test.done();
}