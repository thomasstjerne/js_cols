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

var getMap = function() {
	return new js_cols.HashMultiMap();
};

var getOrdMap = function() {
	return new js_cols.HashMap();
};




/**
 * This test verifies that we can insert strings into the mapSet and have
 * them be stored and sorted correctly by the default comparator.
 */
exports.testInserts = function(test) {
	var map = getMap();
	var values = ['bill', 'blake', 'elliot', 'jacob', 'john', 'myles', 'ted'];

	// Insert strings into map out of order
	map.insert(values[4], values[4]);
	map.insert(values[3], values[3]);
	map.insert(values[0], values[0]);
	map.insert(values[6], values[6]);
	map.insert(values[5], values[5]);
	map.insert(values[1], values[1]);
	map.insert(values[2], values[2]);

	// Verify strings are stored in sorted order
	for (var i = 0; i < values.length; i++) {
		assert.equal(map.get(values[i]), values[i]);
	}

	assert.equal("not found", map.get("frank zappa", "not found"));
	test.done();
};

/**
 * This test verifies that we can insert strings into and remove strings from
 * the mapSet and have the only the non-removed values be stored and sorted
 * correctly by the default comparator.
 */
exports.testRemoves = function(test) {
	var map = getMap();
	var values = ['bill', 'blake', 'elliot', 'jacob', 'john', 'myles', 'ted'];

	// Insert strings into map out of order
	map.insert('frodo', 'frodo');
	map.insert(values[4], values[4]);
	map.insert(values[3], values[3]);
	map.insert(values[0], values[0]);
	map.insert(values[6], values[6]);
	map.insert('samwise', 'samwise');
	map.insert(values[5], values[5]);
	map.insert(values[1], values[1]);
	map.insert(values[2], values[2]);
	map.insert('pippin', 'pippin');

	// Remove strings from map
	map.remove('samwise')
	assert.equal(map.contains('samwise'), 0);
	map.remove('pippin')
	assert.equal(map.contains('pippin'), 0);
	map.remove('frodo')
	assert.equal(map.contains('frodo'), 0);
	map.remove('merry');
	assert.equal(map.contains('merry'), 0);

	test.done();

};

/**
 * This test verifies that we can insert values into and remove values from
 * the mapSet and have them be stored and sorted correctly by a custom
 * comparator.
 */
exports.testRemovesForValuesNotInMap = function(test) {
	var map = getMap();

	var NUM_TO_INSERT = 37;
	var valuesToRemove = [1, 0, 6, 7, 36];

	// Insert ints into map out of order
	var values = [];
	for (var i = 0; i < NUM_TO_INSERT; i += 1) {
		map.insert(i, i);
		values.push(i);
	}
	map.remove(-1);
	map.remove(37);
	for (var i = 0; i < valuesToRemove.length; i += 1) {
		map.remove(valuesToRemove[i]);
		assert.equal(map.contains(valuesToRemove[i]), 0);
		arrayRemove(values, valuesToRemove[i]);
	}


	test.done();

};



/**
 * This test verifies that we can insert values into and remove values from
 * the mapSet and have its contains method correctly determine the values it
 * is contains.
 */
exports.testMapContains = function(test) {
	var map = getMap();
	var values = ['bill', 'blake', 'elliot', 'jacob', 'john', 'myles', 'ted'];



	// Insert strings into map out of order
	map.insert('frodo', 'frodo');
	map.insert(values[4], values[4]);
	map.insert(values[3], values[3]);
	map.insert(values[0], values[0]);
	map.insert(values[6], values[6]);
	map.insert('samwise', 'samwise');
	map.insert(values[5], values[5]);
	map.insert(values[1], values[1]);
	map.insert(values[2], values[2]);
	map.insert('pippin', 'pippin');

	// Remove strings from map
	map.remove('samwise');
	map.remove('pippin');
	map.remove('frodo');

	for (var i = 0; i < values.length; i += 1) {
		assert.equal(map.contains(values[i]), 1);
	}
	assert.equal(map.contains('samwise'), 0);
	assert.equal(map.contains('pippin'), 0);
	assert.equal(map.contains('frodo'), 0);
	test.done();
};






var NUM_TO_INSERT = 2000;
var data = [];
for (var i = 0; i < NUM_TO_INSERT; i++) {
	var o = {
		"key": i,
		"value": "val"
	}
	data.push(o);
}
//----------------------------------------------------- 

exports.testSome = function(test) {
	var tree = getMap();
	for (var i = 0; i < data.length; i++) {
		tree.insert(data[i].key, data[i]);
	}
	tree.insertAll(data);

	var some = function(element) {
		return element.key == 1000;
	}

	assert.ok(tree.some(some));
	assert(!tree.some(function(element) {
		return element.key == -1000;
	}));

	test.done();
};

exports.testSome2 = function(test) {
	var tree = getMap();
	tree.insert("a", "anders");
	tree.insert("b", "birger");
	tree.insert("c", "carl");
	tree.insert("d", "dennis");
	tree.insert("e", "ejnar");
	tree.insert("f", "frank");
	tree.insert("b", "bent");
	tree.insert("b", "b¿rge");

	var some = function(element) {
		return element == "bent";
	}

	assert.ok(tree.some(some));
	assert(!tree.some(function(element) {
		return element == "kurt";
	}));

	test.done();
};

exports.testEvery = function(test) {
	var tree = getMap();
	tree.insertAll(data);
	var every = function(element) {
		return element.value == "val";
	}
	tree.insertAll(data);
	assert.ok(tree.every(every));
	var elm = {
		'value': 'vaaal'
	}
	tree.insert(elm, elm);
	assert(!tree.every(every));
	test.done();
};

exports.testEveryMulti = function(test) {
	var tree = getMap();
	tree.insertAll(data);
	for (var i = 10; i < 15; i++) {
		var o = {
			"key": i,
			"value": "val"
		}
		tree.insert(o, o);
	}
	var every = function(element) {
		return element.value == "val";
	}
	//tree.insertAll(data);
	assert.ok(tree.every(every));
	var elm = {
		"key": 5,
		"value": 'vaaal'
	}
	tree.insert(elm, elm);
	assert(!tree.every(every));
	test.done()
};

exports.testFilter = function(test) {
	var map = getMap();
	map.insertAll(data);
	var filter = function(element) {
		if (element.key > 100 && element.key < 201) return true;

	}

	var filtered = map.filter(filter);
	assert.ok(js_cols.typeOf(filtered) == "object");


	for (var i = 50; i < 250; i++) {

		if (i > 100 && i < 201) assert.equal(filtered.get(data[i]).key, i);
		else assert.equal(filtered.contains(i), 0);

	}
	test.done();
};


exports.testMap = function(test) {
	var map = getMap();
	map.insertAll(data);
	var mapfunc = function(element) {
		return element.value + element.key;
	}

	var mapped = map.map(mapfunc);
	for (var i = 0; i < NUM_TO_INSERT; i++) {
		assert.equal(("val" + i), mapped[i]);
	}
	test.done();
};



exports.testForEach = function(test) {
	var map = getMap();
	map.insertAll(data);
	var each = function(element, k, map) {
		element.newkey = element.key + 10;
	}

	map.forEach(each);
	var i = 10;
	var assertforeach = function(element, k, map) {
		assert.equal(i, element.newkey);
		i++;
	}

	map.forEach(assertforeach, this);
	test.done();
};

exports.testClone = function(test) {

	var data = [23, 11, 11, 11, 78, 3, 99, 34];
	var map = getMap();
	var ordMap = getOrdMap();
	for (var i = 0; i < data.length; i++) {
		map.insert(data[i], "val" + data[i]);
		ordMap.insert(data[i], "val" + data[i]);
	}
	// map.insertAll(data); 
	assert.ok(map.containsAll(data));

	var clone = map.clone();


	var cloneval = clone.getValues();
	var cloneKeys = clone.getKeys();
	var mapval = map.getValues();
	var mapKeys = map.getKeys();
	assert.equal(clone.getCount(), map.getCount());
	assert.notEqual(map.getCount(), ordMap.getCount());

	assert.ok(map.containsAll(data));
	assert.ok(map.containsAll(clone));
	assert.ok(ordMap.containsAll(data));
	assert.ok(ordMap.containsAll(clone));
	clone.remove(11);
	assert.equal(clone.contains(11), 2);
	clone.remove(11);
	assert.equal(clone.contains(11), 1);
	clone.remove(11);

	assert.equal(clone.contains(11), 0);
	test.done();
};

exports.testMultipleValuesForOneKey = function(test) {

	var data = [23, 11, 11, 11, 78, 3, 99, 34];
	var map = getMap();

	for (var i = 0; i < data.length; i++) {
		map.insert(data[i], "val" + data[i]);

	}

	var arr = map.getAllValuesForKey(11);
	assert.ok(js_cols.typeOf(arr) == 'array');
	assert.ok(arr.length == 3);
	arr = map.getAllValuesForKey(3);
	assert.ok(js_cols.typeOf(arr) == 'array');
	assert.ok(arr.length == 1);
	arr = map.getAllValuesForKey(2, null);
	assert.ok(js_cols.typeOf(arr) == 'null');

	test.done();
};

exports.testEquals = function(test) {
	var map = getMap();
	var map2 = getMap();
	var map3 = map;
	for (var i = 0; i < 10; i++) {
		map.insert(i, "val" + i);
		map2.insert(i, "val" + i);
	}
	map.insert(3, "val three");
	map.insert(3, "val drei");
	map2.insert(3, "val three");
	map2.insert(3, "val drei");
	assert(!map.equals("some string or other object"));
	assert.ok(map.equals(map2));
	assert.ok(map.equals(map3));
	map2.remove(3);
	assert(!map.equals(map2));
	map2.insert(3, "value three");
	assert(!map.equals(map2));
	test.done();
}

exports.testInst = function(test) {

	try

	{

		var m = new js_cols.HashMultiMap("ee", "aa", "aa")

		fail("Unexpected success instatiating a HashMultiMap with uneven number of arguments");

	} catch (e)

	{
		assert.equal(e.message, 'Uneven number of arguments');

	}

	test.done();
}

exports.testInsertAll = function(test) {
	var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	var numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1024];
	var t = getMap();
	t.insertAll(numbers);
	assert.ok(t.containsAll(numbers));
	assert(!t.containsAll(numbers2));
	t2 = getMap();
	t2.insertAll(t);
	assert.ok(t2.containsAll(t));
	var obj = {};
	for (var i = 1; i < 11; i++) {
		obj[i] = i;
	}
	t2.removeAll(obj);
	assert.ok(t2.isEmpty());

	var someObj = {
		'vals': numbers,
		'getValues': function() {
			return this.vals;
		},
		'getKeys': function() {
			return this.vals;
		}

	}

	var someObj2 = {
		'vals': numbers2,
		'getValues': function() {
			return this.vals;
		},
		'getKeys': function() {
			return this.vals;
		}

	}

	t.clear();
	assert.ok(t.isEmpty());
	t.insertAll(someObj);
	assert.ok(t.containsAll(someObj));
	assert(!t.containsAll(someObj2));
	t.removeAll(someObj);
	assert.ok(t.isEmpty());
	t.insertAll(numbers);
	t2.insertAll(t);
	t.removeAll(t2);
	assert.ok(t.isEmpty());
	test.done();
}

exports.testContainsAll = function(test) {
	var t = getMap();
	var obj = {};
	for (var i = 1; i < 11; i++) {
		obj[i] = i;
	}
	var obj2 = {};
	for (var i = 1; i < 13; i++) {
		obj2[i] = i;
	}
	t.insertAll(obj);
	assert.ok(t.containsAll(obj));
	assert(!t.containsAll(obj2));
	test.done();
}

exports.testContasinsValue = function(test) {
	var map = getMap();
	for (var i = 0; i < 10; i++) {
		map.insert(i, "val" + i);

	}

	assert.ok(map.containsValue("val2"));
	assert(!map.containsValue("val12"));
	test.done();
}

exports.testInsertMultipleVals = function(test) {
	var map = new js_cols.HashMultiMap(1, "one", 2, "two", 3, "three", 3, "trois", 4, "four", 3, "tre");
	var arr = ["five", "fnf", "fem"];
	map.insertValuesForKey(5, arr);
	arr.reverse();
	assert.equal(arr.toString(), map.getAllValuesForKey(5).toString());
	assert.equal(["tre", "trois", "three"].toString(), map.getAllValuesForKey(3).toString());
	var arr2 = [2, 3];
	map.removeAll(arr2);
	assert.equal(0, map.contains(2));
	assert.equal(0, map.contains(3));
	test.done();
}
