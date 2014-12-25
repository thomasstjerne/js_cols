var js_cols =  process.env.JS_COLS_COVERAGE ? require("../dist-cov/js_cols") : require("../dist/js_cols");
var assert = require('assert');

var arrayRemove = function(arr, obj) {
	var i = arr.indexOf(obj);
	var rv;
	if ((rv = i >= 0)) {

		arr.splice(i, 1)
	}
	return rv;
};

function stringifyQueue(q) {
	var values = q.getValues();
	var s = '';
	for (var i = 0; i < values.length; i++) {
		s += values[i];
	}
	return s;
}

function createQueue() {
	var q = new js_cols.Stack();
	q.push('c');
	q.push('b');
	q.push('a');
	return q;
}

exports.testConstructor = function(test) {
	var q = new js_cols.Stack();
	assert.ok(q.isEmpty(), 'testConstructor(), queue should be empty initially');
	assert.equal(q.getCount(), 0, 'testConstructor(), count should be 0');
	assert.equal(q.peek(),
		null, 'testConstructor(), head element should be null');

	test.done();
}

exports.testCount = function(test) {
	var q = createQueue();
	assert.equal(q.getCount(), 3, 'testCount(), count should be 3');
	q.push('d');
	assert.equal(q.getCount(), 4, 'testCount(), count should be 4');
	q.pop();
	assert.equal(q.getCount(), 3, 'testCount(), count should be 3');
	q.clear();
	assert.equal(q.getCount(), 0, 'testCount(), count should be 0');
	test.done();
}

exports.testPush = function(test) {
	var q = new js_cols.Stack();
	q.push('a');
	assert.equal(q.getCount(), 1, 'testPush(), count should be 1');
	q.push('b');
	assert.equal(q.getCount(), 2, 'testPush(), count should be 2');
	assert.equal(q.peek(), 'b', 'testPush(), head element should be b');
	q.pop();
	assert.equal(q.getCount(), 1, 'testPush(), count should be 1');
	assert.equal(q.peek(), 'a', 'testPush(), head element should be a');
	test.done();
}

exports.testPop = function(test) {
	var q = createQueue();
	var head = q.pop();
	assert.equal(head, 'a', 'testPop(), should return a');
	q.pop();
	head = q.pop();
	assert.equal(head, 'c', 'testPop(), should return c');
	assert.ok(q.isEmpty(), 'testPop(), queue should be empty');
	head = q.pop();
	assert.equal(head,
		null, 'testPop(), should return null for empty queue');
	test.done();
}

exports.testPeek = function(test) {
	var q = createQueue();
	var head = q.peek();
	assert.equal(head, 'a', 'testPeek(), should return a');
	var head2 = q.pop();
	assert.equal(head, head2, 'testPeek(), dequeue should return peek() result');
	head = q.peek();
	assert.equal(head, 'b', 'testPeek(), should return b');
	q.clear();
	head = q.peek();
	assert.equal(head,
		null, 'testPeek(), should return null for empty queue');
	test.done();
}

exports.testClear = function(test) {
	var q = createQueue();
	q.clear();
	assert.ok(q.isEmpty(), 'testClear(), queue should be empty');
	test.done();
}

exports.testQueue = function(test) {
	var q = createQueue();
	assert.equal(stringifyQueue(q), 'abc', 'testQueue(), contents must be abc');
	test.done()
}

exports.testRemove = function(test) {
	var q = createQueue();
	assert.equal(stringifyQueue(q), 'abc', 'testRemove(), contents must be abc');

	q.pop();
	assert.equal(stringifyQueue(q), 'bc', 'testRemove(), contents must be bc');

	q.push('a');
	assert.equal(stringifyQueue(q), 'abc', 'testRemove(), contents must be abc');

	assert.ok(q.remove('c'), 'testRemove(), remove should have returned true');
	assert.equal(stringifyQueue(q), 'ab', 'testRemove(), contents must be ab');

	assert.ok(q.remove('b'), 'testRemove(), remove should have returned true');
	assert.equal(stringifyQueue(q), 'a', 'testRemove(), contents must be a');

	assert.ok(!q.remove('b'), 'testRemove(), remove should have returned false');
	assert.equal(stringifyQueue(q), 'a', 'testRemove(), contents must be a');

	assert.ok(q.remove('a'), 'testRemove(), remove should have returned true');
	assert.equal(stringifyQueue(q), '', 'testRemove(), contents must be empty');
	test.done()
}

exports.testContains = function(test) {
	var q = createQueue();
	assert.ok(q.contains('a'), 'testContains(), contains should have returned true');
	assert.ok(!q.contains('foobar'), 'testContains(), contains should have returned false');
	test.done();
}
