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

var getset = function() {
	return new js_cols.HashSet();
};




/**
 * This test verifies that we can insert strings into the setSet and have
 * them be stored and sorted correctly by the default comparator.
 */
exports.testInserts = function(test) {
	var set = getset();
	var values = ['bill', 'blake', 'elliot', 'jacob', 'john', 'myles', 'ted'];

	// Insert strings into set out of order
	set.insert(values[4]);
	set.insert(values[3]);
	set.insert(values[0]);
	set.insert(values[6]);
	set.insert(values[5]);
	set.insert(values[1]);
	set.insert(values[2]);

	// Verify strings are stored in sorted order
	for (var i = 0; i < values.length; i++) {
		assert.equal(set.contains(values[i]), true);
	}
	test.done()
};

/**
 * This test verifies that we can insert strings into and remove strings from
 * the setSet and have the only the non-removed values be stored and sorted
 * correctly by the default comparator.
 */
exports.testRemoves = function(test) {
	var set = getset();
	var values = ['bill', 'blake', 'elliot', 'jacob', 'john', 'myles', 'ted'];

	// Insert strings into set out of order
	set.insert('frodo');
	set.insert(values[4]);
	set.insert(values[3]);
	set.insert(values[0]);
	set.insert(values[6]);
	set.insert('samwise');
	set.insert(values[5]);
	set.insert(values[1]);
	set.insert(values[2]);
	set.insert('pippin');

	// Remove strings from set
	set.remove('samwise')
	assert.equal(set.contains('samwise'), false);
	set.remove('pippin')
	assert.equal(set.contains('pippin'), false);
	set.remove('frodo')
	assert.equal(set.contains('frodo'), false);
	set.remove('merry');
	assert.equal(set.contains('merry'), false);

	test.done();

};

/**
 * This test verifies that we can insert values into and remove values from
 * the setSet and have them be stored and sorted correctly by a custom
 * comparator.
 */
exports.testRemovesForValuesNotInset = function(test) {
	var set = getset();

	var NUM_TO_INSERT = 37;
	var valuesToRemove = [1, 0, 6, 7, 36];

	// Insert ints into set out of order
	var values = [];
	for (var i = 0; i < NUM_TO_INSERT; i += 1) {
		set.insert(i);
		values.push(i);
	}
	set.remove(-1);
	set.remove(37);
	for (var i = 0; i < valuesToRemove.length; i += 1) {
		set.remove(valuesToRemove[i]);
		assert.equal(set.contains(valuesToRemove[i]), false);
		arrayRemove(values, valuesToRemove[i]);
	}


	test.done();

};



/**
 * This test verifies that we can insert values into and remove values from
 * the setSet and have its contains method correctly determine the values it
 * is contains.
 */
exports.testsetContains = function(test) {
	var set = getset();
	var values = ['bill', 'blake', 'elliot', 'jacob', 'john', 'myles', 'ted'];



	// Insert strings into set out of order
	set.insert('frodo');
	set.insert(values[4]);
	set.insert(values[3]);
	set.insert(values[0]);
	set.insert(values[6]);
	set.insert('samwise');
	set.insert(values[5]);
	set.insert(values[1]);
	set.insert(values[2]);
	set.insert('pippin');

	// Remove strings from set
	set.remove('samwise');
	set.remove('pippin');
	set.remove('frodo');

	for (var i = 0; i < values.length; i += 1) {
		assert.ok(set.contains(values[i]));
	}
	assert(!set.contains('samwise'));
	assert(!set.contains('pippin'));
	assert(!set.contains('frodo'));
	test.done();
};




exports.testIntersectionAndSubset = function(test) {
	var set = getset();

	var NUM_TO_INSERT = 2000;
	var NUM_TO_REMOVE = 500;


	var data = [];
	for (var i = 0; i < NUM_TO_INSERT; i++) {
		data.push(Math.floor(Math.random() * 100000));
	}

	/* Insert ints into set out of order
    for (var i = 0; i < NUM_TO_INSERT; i += 1) {
      set.insert(data[i]);
      
    }   
    */
	set.insertAll(data);


	var data2 = data.slice(0, NUM_TO_REMOVE);
	var set2 = getset();
	var interset = getset();

	set2.insertAll(data2);
	assert.ok(set2.isSubsetOf(set));
	var data3 = data.slice(0, Math.floor(NUM_TO_REMOVE / 2));
	var inter = data.slice(Math.floor(NUM_TO_REMOVE / 2), NUM_TO_REMOVE);
	interset.insertAll(inter);
	set.removeAll(data3);
	set2.removeAll(data3);
	var inter = set.intersection(set2);
	var inter1 = inter.getValues();
	var inter2 = interset.getValues();
	for (var i = 0; i < inter1.size; i++) {
		assert.equal(inter1[i], inter2[i]);
	}
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
	var tree = getset();
	tree.insertAll(data);

	var some = function(element) {
		return element.key == 1000;
	}

	assert.ok(tree.some(some));
	assert(!tree.some(function(element) {
		return element.key == -1000;
	}));

	tree.clear();
	assert.ok(tree.isEmpty());
	test.done();
};

exports.testEvery = function(test) {
	var set = getset();
	set.insertAll(data);
	var every = function(element) {
		return element.value == "val";
	}
	set.insertAll(data);
	assert.ok(set.every(every));
	test.done();
};

exports.testFilter = function(test) {
	var set = getset();
	set.insertAll(data);
	var filter = function(element) {
		if (element.key > 100 && element.key < 201) return true;

	}

	var filtered = set.filter(filter);
	assert.ok(js_cols.typeOf(filtered) == "array");


	for (var i = 50; i < 250; i++) {

		if (i > 100 && i < 201) assert.equal(data[i].key, i);
		else assert(!js_cols.contains(filtered, i));

	}
	test.done();
};


exports.testMap = function(test) {
	var set = getset();
	set.insertAll(data);
	var mapfunc = function(element) {
		return element.value + element.key;
	}

	var mapped = set.map(mapfunc);
	for (var i = 0; i < NUM_TO_INSERT; i++) {
		assert.equal(("val" + i), mapped[i]);
	}
	test.done();
};

exports.testForEach = function(test) {
	var set = getset();
	set.insertAll(data);
	var each = function(element, k, set) {
		element.newkey = element.key + 10;
	}

	set.forEach(each);
	var i = 10;
	var assertforeach = function(element, k, set) {
		assert.equal(i, element.newkey);
		i++;
	}

	set.forEach(assertforeach, this);
	test.done();
};

exports.testClone = function(test) {

	var data = [23, 11, 78, 3, 99, 34];
	var set = getset();
	for (var i = 0; i < data.length; i++) {
		set.insert(data[i]);
	}
	// set.insertAll(data); 
	// assert.ok(set.containsAll(data));

	var clone = set.clone();


	var cloneval = clone.getValues();

	var setval = set.getValues();

	assert.ok(set.isSubsetOf(clone));
	assert.ok(clone.isSubsetOf(set));
	assert.ok(set.containsAll(data));
	assert.ok(set.containsAll(clone));
	test.done();
};

exports.testEquals = function(test) {
	var map = getset();
	var map2 = getset();
	var map3 = map;
	for (var i = 0; i < 10; i++) {
		map.insert(i);
		map2.insert(i);
	}
	assert.ok(map.equals(map2));
	assert.ok(map.equals(map3));
	assert(!map.equals("some string or other object"));
	map2.remove(3);
	assert(!map.equals(map2));
	map2.insert(3);
	assert.ok(map.equals(map2));
	test.done();
}
