var js_cols =  process.env.JS_COLS_COVERAGE ? require("../dist-cov/js_cols") : require("../dist/js_cols");
var assert = require('assert');

function getH() {
	return new js_cols.IntervalHeap();
}

function getHeap() {
	var h = new js_cols.IntervalHeap();
	h.insert(0, 'a');
	h.insert(1, 'b');
	h.insert(2, 'c');
	h.insert(3, 'd');
	return h;
}


function getHeap2() {
	var h = new js_cols.IntervalHeap();
	h.insert(1, 'b');
	h.insert(3, 'd');
	h.insert(0, 'a');
	h.insert(2, 'c');
	return h;
}

function getHeap3() {
	var h = new js_cols.IntervalHeap();
	h.insert(0, 'a');
	h.insert(1, 'b');
	h.insert(2, 'c');
	h.insert(3, 'd');
	h.insert(4, 'e');
	return h;
}

var getTree = function() {
	return new js_cols.RedBlackMap();
};


exports.testGetCount1 = function(test) {
	var h = getHeap();
	assert.equal(h.getCount(), 4, 'count, should be 4');
	h.deleteMin();
	assert.equal(h.getCount(), 3, 'count, should be 3');
	test.done();
}

exports.testGetCount2 = function(test) {
	var h = getHeap();
	h.deleteMin();
	h.deleteMax();
	h.deleteMin();
	h.deleteMin();
	assert.equal(h.getCount(), 0, 'count, should be 0');
	test.done();
}


exports.testKeys = function(test) {
	var h = getHeap3();
	var keys = h.getKeys();
	assert.equal([0, 4, 1, 2, 3].toString(), keys.toString());
	for (var i = 0; i < 4; i++) {
		assert.ok(js_cols.contains(keys, i), 'getKeys, key ' + i + ' found');
	}
	assert.equal(js_cols.getCount(keys), 5, 'getKeys, Should be 5 keys');
	test.done();
}


exports.testValues = function(test) {
	var h = getHeap3();
	var values = h.getValues();
	assert.equal(['a', 'e', 'b', 'c', 'd'].toString(), values.toString());
	assert.ok(js_cols.contains(values, 'a'), 'getKeys, value "a" found');
	assert.ok(js_cols.contains(values, 'b'), 'getKeys, value "b" found');
	assert.ok(js_cols.contains(values, 'c'), 'getKeys, value "c" found');
	assert.ok(js_cols.contains(values, 'd'), 'getKeys, value "d" found');
	assert.equal(js_cols.getCount(values), 5, 'getKeys, Should be 5 keys');
	test.done();
}




exports.testClone = function(test) {
	var h = getHeap3();
	var h2 = h.clone();
	var keys = h2.getKeys();
	var values = h2.getValues();
	assert.equal([0, 4, 1, 2, 3].toString(), keys.toString());
	assert.equal(['a', 'e', 'b', 'c', 'd'].toString(), values.toString());
	assert.ok(!h2.isEmpty(), 'clone so it should not be empty');
	assert.ok(js_cols.contains(keys, 0), 'clone so it should contain key 0');
	assert.ok(js_cols.contains(values, 'a'), 'clone so it should contain value "a"');
	test.done();
}

exports.testClone2 = function(test) {
	var h = getHeap3();
	h.insert(5, 'f');
	var hdl2 = h.insert(6, 'g');
	var h2 = h.clone();

	assert.equal(h2.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h2.deleteMax(), 'g', 'remove, Should be "g"');
	assert.equal(h2.deleteMin(), 'b', 'remove, Should be "b"');
	var hdl = h2.insert(0, 'a');
	assert.ok(h2.remove(hdl));
	assert.equal(h2.deleteMin(), 'c', 'remove, Should be "c"');
	assert.equal(h2.deleteMax(), 'f', 'remove, Should be "f"');
	assert.equal(h2.getCount(), 2);
	test.done();
}

exports.testClone3 = function(test) {
	var h = getHeap2();
	var h2 = h.clone();

	assert.equal(h2.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h2.deleteMin(), 'b', 'remove, Should be "b"');
	assert.equal(h2.deleteMin(), 'c', 'remove, Should be "c"');
	assert.equal(h2.deleteMin(), 'd', 'remove, Should be "d"');

	assert.ok(h2.isEmpty());
	test.done();

}



exports.testHandle = function(test) {
	var h = getHeap3();
	h.insert(5, 'f');
	var hdl2 = h.insert(6, 'g');

	//-------------
	assert(!h.remove('wrong handle'));
	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h.deleteMax(), 'g', 'remove, Should be "g"');
	assert.equal(h.deleteMin(), 'b', 'remove, Should be "b"');
	var hdl = h.insert(0, 'a');
	assert.ok(hdl.index == 1);
	assert.ok(h.remove(hdl));
	//assert.equal('remove, Should be "a"', h.deleteMin(), 'a');
	assert.equal(h.deleteMin(), 'c', 'remove, Should be "c"');
	assert(!h.remove(hdl2));
	assert.equal(h.deleteMax(), 'f', 'remove, Should be "f"');
	assert.equal(h.getCount(), 2);
	test.done();
}


exports.testChangeKey = function(test) {
	var h = getHeap3();
	h.insert(6, 'f');
	var hdl2 = h.insert(5, 'g');

	//-------------
	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	// assert.equal('remove, Should be "g"', h.deleteMax(), 'g');
	assert.equal(h.deleteMin(), 'b', 'remove, Should be "b"');
	var hdl = h.insert(0, 'a');
	assert.ok(hdl.index == 1);
	assert.ok(h.changeKey(hdl2, 7));
	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h.deleteMin(), 'c', 'remove, Should be "c"');
	//assert(!h.remove(hdl2));
	assert.equal(h.deleteMax(), 'g', 'remove, Should be "g"');
	assert.equal(h.getCount(), 3);
	test.done();
}

exports.testChangeKey2 = function(test) {
	var h = getHeap3();


	//-------------
	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	var hdl = h.insert(0, 'a');
	assert.ok(h.changeKey(hdl, 7));
	assert.equal(h.deleteMin(), 'b', 'remove, Should be "b"');

	assert.ok(hdl.index == 1);

	assert.equal(h.deleteMin(), 'c', 'remove, Should be "c"');
	assert.equal(h.deleteMax(), 'a', 'remove, Should be "a"');

	assert.equal(h.getCount(), 2);
	test.done();
}

exports.testChangeKey3 = function(test) {
	var hp = new js_cols.IntervalHeap();

	hp.insert(1, 1);
	var hdl = hp.insert(2, 2);
	hp.insert(3, 3);
	hp.insert(4, 4);
	hp.insert(5, 5);
	assert.equal(hp.getValues().toString(), [1, 5, 2, 3, 4].toString());
	assert(!hp.changeKey(0, 'a'));
	assert.ok(hp.changeKey(hdl, 0));
	assert.equal(2, hp.deleteMin());
	test.done();
}

exports.testChangeKey4 = function(test) {
	var hp = new js_cols.IntervalHeap();

	hp.insert(1, 1);
	hp.insert(2, 2);
	hp.insert(3, 3);
	var hdl = hp.insert(4, 4);
	hp.insert(5, 5);
	assert.equal(hp.getValues().toString(), [1, 5, 2, 3, 4].toString());
	assert.ok(hp.changeKey(hdl, 0));
	assert.equal(4, hp.deleteMin());
	test.done();
}

exports.testChangeKey5 = function(test) {
	var hp = new js_cols.IntervalHeap();

	hp.insert(1, 1);
	hp.insert(2, 2);
	hp.insert(3, 3);
	var hdl = hp.insert(4, 4);
	hp.insert(5, 5);
	assert.equal(hp.getValues().toString(), [1, 5, 2, 3, 4].toString());
	assert.ok(hp.changeKey(hdl, 6));
	assert.equal(4, hp.deleteMax());
	test.done();
}

exports.testChangeKey6 = function(test) {
	var hp = new js_cols.IntervalHeap();

	hp.insert(8, 8);
	hp.insert(1, 1);
	hp.insert(6, 6);
	hp.insert(2, 2);

	hp.insert(4, 4);
	hp.insert(3, 3);

	hp.insert(7, 7);

	var hdl = hp.insert(9, 9);
	hp.insert(5, 5);
	hp.insert(10, 10);
	assert.ok(hp.changeKey(hdl, 6));
	assert.equal(10, hp.deleteMax());
	assert.equal(8, hp.deleteMax());
	assert.equal(7, hp.deleteMax());
	assert.equal(6, hp.deleteMax());
	assert.equal(9, hp.deleteMax());
	test.done();

}

exports.testClear = function(test) {
	var h = getHeap();
	h.clear();
	assert.ok(h.isEmpty(), 'cleared so it should be empty');
	test.done();
}


exports.testIsEmpty = function(test) {
	var h = getHeap();
	assert(!h.isEmpty(), '4 values so should not be empty');

	h.deleteMin();
	h.deleteMin();
	h.deleteMin();
	assert(!h.isEmpty(), '1 values so should not be empty');

	h.deleteMin();
	assert.ok(h.isEmpty(), '0 values so should be empty');
	test.done();
}


exports.testPeek1 = function(test) {
	var h = getHeap();
	assert.equal(h.min(), 'a', 'peek, Should be "a"');
	test.done();
}


exports.testPeek2 = function(test) {
	var h = getHeap2();
	assert.equal(h.min(), 'a', 'peek, Should be "a"');
	test.done();
}


exports.testPeek3 = function(test) {
	var h = getHeap();
	h.clear();
	assert.equal(h.min(), null, 'peek, Should be "undefined"');
	test.done()
}



exports.testDeletemin1 = function(test) {
	var h = getHeap();

	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h.deleteMin(), 'b', 'remove, Should be "b"');
	assert.equal(h.deleteMin(), 'c', 'remove, Should be "c"');
	assert.equal(h.deleteMin(), 'd', 'remove, Should be "d"');
	assert.ok(h.isEmpty());
	test.done();
}


exports.testDeletemin2 = function(test) {
	var h = getHeap2();

	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h.deleteMin(), 'b', 'remove, Should be "b"');
	assert.equal(h.deleteMin(), 'c', 'remove, Should be "c"');
	assert.equal(h.deleteMin(), 'd', 'remove, Should be "d"');
	assert.ok(h.isEmpty());
	test.done();
}

exports.testDeletemax1 = function(test) {
	var h = getHeap();
	assert.equal(h.deleteMax(), 'd', 'remove, Should be "d"');
	assert.equal(h.deleteMax(), 'c', 'remove, Should be "c"');
	assert.equal(h.deleteMax(), 'b', 'remove, Should be "b"');
	assert.equal(h.deleteMax(), 'a', 'remove, Should be "a"');
	assert.equal(h.getCount(), 0);
	test.done();
}


exports.testDeletemax2 = function(test) {
	var h = getHeap2();

	assert.equal(h.deleteMax(), 'd', 'remove, Should be "d"');
	assert.equal(h.deleteMax(), 'c', 'remove, Should be "c"');
	assert.equal(h.deleteMax(), 'b', 'remove, Should be "b"');
	assert.equal(h.deleteMax(), 'a', 'remove, Should be "a"');
	assert.equal(h.getCount(), 0);
	assert.ok(h.isEmpty());
	test.done();
}

exports.testRemoveHandle = function(test) {
	var h = getH();
	h.insert(1, 'b');
	h.insert(3, 'd');
	h.insert(0, 'a');
	var hdl = h.insert(2, 'c');
	h.insert(4, 'e')

	assert.ok(h.remove(hdl), 'remove, Should be "true"');
	assert.equal(h.deleteMax(), 'e', 'remove, Should be "e"');
	assert.equal(h.deleteMax(), 'd', 'remove, Should be "d"');
	assert.equal(h.deleteMax(), 'b', 'remove, Should be "b"');
	var hdl2 = h.insert(5, 'f');
	assert.ok(h.remove(hdl2));
	assert.equal(h.deleteMax(), 'a', 'remove, Should be "a"');
	assert.equal(h.getCount(), 0);
	assert.ok(h.isEmpty());
	test.done();
}

exports.testRemoveHandle2 = function(test) {
	var h = getH();
	h.insert(1, 'b');
	h.insert(3, 'd');
	h.insert(0, 'a');
	var hdl = h.insert(2, 'c');
	h.insert(4, 'e')

	assert.ok(h.remove(hdl), 'remove, Should be "true"');
	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h.deleteMin(), 'b', 'remove, Should be "b"');
	assert.equal(h.deleteMin(), 'd', 'remove, Should be "d"');
	assert.equal(h.deleteMin(), 'e', 'remove, Should be "e"');

	assert.equal(h.getCount(), 0);
	assert.ok(h.isEmpty());
	test.done()
}

exports.testRemoveHandle3 = function(test) {
	var h = getH();
	h.insert(1, 'b');
	h.insert(3, 'd');
	h.insert(0, 'a');
	var hdl = h.insert(2, 'c');
	h.insert(4, 'e');
	var hdl2 = h.insert(5, 'e');
	h.insert(6, 'e');
	h.insert(7, 'e');
	// h.insert(8, 'e');


	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h.deleteMin(), 'b', 'remove, Should be "b"');
	assert.ok(hdl.index == 1);
	assert.ok(h.remove(hdl), 'remove, Should be "true"');
	//assert.ok('remove, Should be "true"', h.remove(hdl2));
	assert.equal(h.deleteMin(), 'd', 'remove, Should be "d"');
	assert.equal(h.deleteMin(), 'e', 'remove, Should be "e"');

	// assert.equal(h.getCount(), 0);
	//assert.ok(h.isEmpty());
	test.done();
}



exports.testInsertAll = function(test) {
	var t = getTree();
	t.insert(1, 'b');
	t.insert(3, 'd');
	t.insert(0, 'a');
	t.insert(2, 'c');
	t.insert(4, 'e')
	var h = getH();

	h.insertAll(t);


	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h.deleteMin(), 'b', 'remove, Should be "b"');
	assert.equal(h.deleteMin(), 'c', 'remove, Should be "c"');
	assert.equal(h.deleteMin(), 'd', 'remove, Should be "d"');
	assert.equal(h.deleteMin(), 'e', 'remove, Should be "e"');

	assert.equal(h.getCount(), 0);
	assert.ok(h.isEmpty());
	test.done();
}

exports.testInsertAll2 = function(test) {
	var t = ['a', 'b', 'c', 'd', 'e'];

	var h = getH();

	h.insertAll(t);


	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h.deleteMin(), 'b', 'remove, Should be "b"');
	assert.equal(h.deleteMin(), 'c', 'remove, Should be "c"');
	assert.equal(h.deleteMin(), 'd', 'remove, Should be "d"');
	assert.equal(h.deleteMin(), 'e', 'remove, Should be "e"');

	assert.equal(h.getCount(), 0);
	assert.ok(h.isEmpty());
	test.done()
}

exports.testInsertAll3 = function(test) {
	var t = {
		'1': 'a',
		'2': 'b',
		'3': 'c',
		'4': 'd',
		'5': 'e'
	};

	var h = getH();

	h.insertAll(t);


	assert.equal(h.deleteMin(), 'a', 'remove, Should be "a"');
	assert.equal(h.deleteMin(), 'b', 'remove, Should be "b"');
	assert.equal(h.deleteMin(), 'c', 'remove, Should be "c"');
	assert.equal(h.deleteMin(), 'd', 'remove, Should be "d"');
	assert.equal(h.deleteMin(), 'e', 'remove, Should be "e"');

	assert.equal(h.getCount(), 0);
	assert.ok(h.isEmpty());
	var numbers = [1, 2, 3, 4, 5, 6, 7];
	var someObj = {
		'vals': numbers,
		'getValues': function() {
			return this.vals;
		},
		'getKeys': function() {
			return this.vals;
		}

	}
	h.insertAll(someObj);
	assert.equal(h.deleteMin(), 1, 'remove, Should be "1"');
	assert.equal(h.deleteMax(), 7, 'remove, Should be "7"');
	assert.equal(h.deleteMin(), 2, 'remove, Should be "2"');
	assert.equal(h.deleteMax(), 6, 'remove, Should be "6"');
	assert.equal(h.deleteMin(), 3, 'remove, Should be "3"');
	assert.equal(h.deleteMin(), 4, 'remove, Should be "4"');
	assert.equal(h.deleteMin(), 5, 'remove, Should be "5"');
	assert.ok(h.isEmpty());
	test.done();
}



exports.testInsertPeek1 = function(test) {
	var h = getH();

	h.insert(3, 'd');
	assert.equal(h.min(), 'd', 'peek, Should be "d"');
	h.insert(2, 'c');
	assert.equal(h.min(), 'c', 'peek, Should be "c"');
	h.insert(1, 'b');
	assert.equal(h.min(), 'b', 'peek, Should be "b"');
	h.insert(0, 'a');
	assert.equal(h.min(), 'a', 'peek, Should be "a"');
	test.done();
}


exports.testInsertPeek2 = function(test) {
	var h = getH();

	h.insert(1, 'b');
	assert.equal(h.min(), 'b', 'peak, Should be "b"');
	h.insert(3, 'd');
	assert.equal(h.min(), 'b', 'peak, Should be "b"');
	h.insert(0, 'a');
	assert.equal(h.min(), 'a', 'peak, Should be "a"');
	h.insert(2, 'c');
	assert.equal(h.min(), 'a', 'peak, Should be "a"');
	test.done();
}

exports.testInsertPeekMax = function(test) {
	var h = getH();
	assert.equal(null, h.max());
	h.insert(1, 'b');
	assert.equal(h.max(), 'b', 'peak, Should be "b"');
	h.insert(3, 'd');
	assert.equal(h.max(), 'd', 'peak, Should be "d"');
	h.insert(0, 'a');
	assert.equal(h.max(), 'd', 'peak, Should be "d"');
	h.insert(4, 'e');
	assert.equal(h.max(), 'e', 'peak, Should be "e"');
	test.done();
}
