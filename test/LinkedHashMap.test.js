var js_cols =  process.env.JS_COLS_COVERAGE ? require("../dist-cov/js_cols") : require("../dist/js_cols");
var assert = require('assert');
var goog =require('../goog-recordfunction');

var arrayRemove = function(arr, obj) {
	var i = arr.indexOf(obj);
	var rv;
	if ((rv = i >= 0)) {

		arr.splice(i, 1)
	}
	return rv;
};

function fillLinkedMap(m) {
  m.insert('a', 0);
  m.insert('b', 1);
  m.insert('c', 2);
  m.insert('d', 3);
}

function fillLinkedMap2(m) {


for(var i =0; i <10; i++){
	var key = {
		"aKey" : i
	};
	var value = {
		"aValue" : "val"+i
	}
	m.insert(key, value);

}
  
}

function getMap(){
  return new js_cols.LinkedHashMap();
  };
  
  function getMapWmaxCount(){
  return new js_cols.LinkedHashMap(10);
  };

var someObj = {};

 exports.testLinkedMap = function(test) {
  var m = getMap();
  fillLinkedMap(m);

  assert.equal(['a', 'b', 'c', 'd'].toString(), m.getKeys().toString());
  assert.equal([0, 1, 2, 3].toString(), m.getValues().toString());
  test.done();
}

exports.testMaxSizeLinkedMap = function(test) {
  var m = new js_cols.LinkedHashMap(3);
  fillLinkedMap(m);

  assert.equal(['b', 'c', 'd'].toString(), m.getKeys().toString());
  assert.equal([1, 2, 3].toString(), m.getValues().toString());
  test.done();
}

exports.testLruLinkedMap = function(test) {
  var m = new js_cols.LinkedHashMap(undefined, true);
  fillLinkedMap(m);
  
  m.insertAfter('d', 'e', 4);
   m.insertBefore('d', 'e', 4);

  assert.equal(['d', 'c', 'b', 'a'].toString(), m.getKeys().toString());
  assert.equal([3, 2, 1, 0].toString(), m.getValues().toString());

  m.get('a');
  assert.equal(['a', 'd', 'c', 'b'].toString(), m.getKeys().toString());
  assert.equal([0, 3, 2, 1].toString(), m.getValues().toString());

  m.insert('b', 4);
  assert.equal(['b', 'a', 'd', 'c'].toString(), m.getKeys().toString());
  assert.equal([4, 0, 3, 2].toString(), m.getValues().toString());
  test.done();
}

exports.testMaxSizeLruLinkedMap = function(test) {
  var m = new js_cols.LinkedHashMap(3, true);
  fillLinkedMap(m);

  assert.equal(['d', 'c', 'b'].toString(), m.getKeys().toString());
  assert.equal([3, 2, 1].toString(), m.getValues().toString());

  m.get('c');
  assert.equal(['c', 'd', 'b'].toString(), m.getKeys().toString());
  assert.equal([2, 3, 1].toString(), m.getValues().toString());

  m.insert('d', 4);
  assert.equal(['d', 'c', 'b'].toString(), m.getKeys().toString());
  assert.equal([4, 2, 1].toString(), m.getValues().toString());
  test.done();
}

exports.testGetCount = function(test) {
  var m = getMap();
  assert.equal(0, m.getCount());
  m.insert('a', 0);
  assert.equal(1, m.getCount());
  m.insert('a', 1);
  assert.equal(1, m.getCount());
  m.insert('b', 2);
  assert.equal(2, m.getCount());
  m.remove('a');
  assert.equal(1, m.getCount());
  test.done();
}

exports.testIsEmpty = function(test) {
  var m = getMap();
  assert.ok(m.isEmpty());
  m.insert('a', 0);
  assert(!m.isEmpty());
  m.remove('a');
  assert.ok(m.isEmpty());
  test.done();
}

exports.testSetMaxCount = function(test) {
  var m = new js_cols.LinkedHashMap(3);
  fillLinkedMap(m);
  assert.equal(3, m.getCount());

  m.setMaxCount(5);
  m.insert('e', 5);
  m.insert('f', 6);
  m.insert('g', 7);
  assert.equal(5, m.getCount());

  m.setMaxCount(4);
  assert.equal(4, m.getCount());

  m.setMaxCount(0);
  m.insert('h', 8);
  m.insert('i', 9);
  m.insert('j', 10);
  assert.equal(7, m.getCount());
  test.done();
}

exports.testClear = function(test) {
  var m = getMap();
  fillLinkedMap(m);
  m.clear();
  assert.ok(m.isEmpty());
  test.done();
}

exports.testForEach = function(test) {
  var m = getMap();
  fillLinkedMap(m);

  m.forEach(function(val, key, linkedMap) {
    linkedMap.insert(key, val * 2);
    assert.equal( someObj, this, 'forEach should run in provided context.');
  }, someObj);

  assert.equal(['a', 'b', 'c', 'd'].toString(), m.getKeys().toString());
  assert.equal([0, 2, 4, 6].toString(), m.getValues().toString());
  test.done();
}

exports.testMap = function(test) {
  var m = getMap();
  fillLinkedMap(m);

  var result = m.map(function(val, key, linkedMap) {
    assert.equal( m, linkedMap, 'The LinkedMap object should get passed in');
    assert.equal( someObj, this, 'map should run in provided context');
    return key + val;
  }, someObj);

  assert.equal(['a0', 'b1', 'c2', 'd3'].toString(), result.toString());
  test.done();
}

exports.testSome = function(test) {
  var m = getMap();
  fillLinkedMap(m);

  var result = m.some(function(val, key, linkedMap) {
    assert.equal( m, linkedMap, 'The LinkedMap object should get passed in');
    assert.equal( someObj, this, 'map should run in provided context');
    return val > 2;
  }, someObj);

  assert.ok(result);
 	assert(!m.some(function(val) {return val > 3}));

  assert.ok(m.some(function(val, key) {return key == 'c';}));
  assert(!m.some(function(val, key) {return key == 'e';}));
  test.done();
}

 exports.testFilter = function(test) {
  var m = getMap();
  fillLinkedMap2(m);

	var func = function (value, key, map){
		return (key.aKey > 3 && key.aKey < 8);
	}
  var result = m.filter(func, someObj);
	
	for (var i = 4; i<8; i++){
	assert.equal(result.shift().aValue, "val"+i);
	}
	
	test.done();
}

exports.testEvery = function(test) {
  var m = getMap();
  fillLinkedMap(m);

  var result = m.every(function(val, key, linkedMap) {
    assert.equal( m, linkedMap, 'The LinkedMap object should get passed in');
    assert.equal( someObj, this, 'map should run in provided context');
    return val < 5;
  }, someObj);

  assert.ok(result);
  assert(!m.every(function(val) {return val < 2}));

  assert.ok(m.every(function(val, key) {return key.length == 1;}));
  assert(!m.every(function(val, key) {return key == 'b';}));
  test.done();
}

exports.testPeek = function(test) {
  var m = getMap();
  assert.equal(null, m.peek());
  assert.equal(null, m.peekLast());

  fillLinkedMap(m);
  assert.equal(0, m.peek());

  m.remove('a');
  assert.equal(1, m.peek());

  assert.equal(3, m.peekLast());

  assert.equal(3, m.peekValue('d'));
  assert.equal(1, m.peek());

  m.remove('d');
  assert.equal(2, m.peekLast());
  test.done();
}

exports.testPop = function(test) {
  var m = getMap();
  assert.equal(undefined, m.shift());
  assert.equal(undefined, m.pop());

  fillLinkedMap(m);
  assert.equal(4, m.getCount());

  assert.equal(0, m.shift());
  assert.equal(1, m.peek());

  assert.equal(3, m.pop());
  assert.equal(2, m.peekLast());

  assert.equal(2, m.getCount());
  test.done();
}

exports.testContainsValue = function(test) {
  var m = getMap();
  fillLinkedMap(m);

  assert.ok(m.containsValue(2));
  assert(!m.containsValue(4));
  test.done();
}

exports.testContainsKey= function(test) {
  var m = getMap();
  fillLinkedMap(m);

  assert.ok(m.contains('b'));
  assert(!m.contains('elephant'));
  assert(!m.contains('undefined'));
  test.done();
}

exports.testRemoveNodeCalls = function(test) {
  var m = new js_cols.LinkedHashMap(1);
  m.removeNode = goog.recordFunction(m.removeNode);

  m.insert('1', 1);
  assert.equal( 0,
      m.removeNode.getCallCount(), 'removeNode not called after adding an element');
  m.insert('1', 2);
  assert.equal( 0,
      m.removeNode.getCallCount(), 'removeNode not called after updating an element');
  m.insert('2', 2);
  assert.equal( 1,
      m.removeNode.getCallCount(), 'removeNode called after adding an overflowing element');

  m.remove('3');
  assert.equal( 1,
      m.removeNode.getCallCount(), 'removeNode not called after removing a non-existing element');
  m.remove('2');
  assert.equal( 2,
      m.removeNode.getCallCount(), 'removeNode called after removing an existing element');

  m.insert('1', 1);
  m.clear();
  assert.equal( 3,
      m.removeNode.getCallCount(), 'removeNode called after clearing the map');
  m.clear();
  assert.equal( 3,
      m.removeNode.getCallCount(), 'removeNode not called after clearing an empty map');

  m.insert('1', 1);
  m.pop();
  assert.equal( 4,
      m.removeNode.getCallCount(), 'removeNode called after calling pop');
  m.pop();
  assert.equal( 4,
      m.removeNode.getCallCount(), 'removeNode not called after calling pop on an empty map');

  m.insert('1', 1);
  m.shift();
  assert.equal( 5,
      m.removeNode.getCallCount(), 'removeNode called after calling shift');
  m.shift();
  assert.equal( 5,
      m.removeNode.getCallCount(), 'removeNode not called after calling shift on an empty map');

  m.setMaxCount(2);
  m.insert('1', 1);
  m.insert('2', 2);
  assert.equal( 5,
      m.removeNode.getCallCount(), 'removeNode not called after increasing the maximum map size');
  m.setMaxCount(1);
  assert.equal( 6,
      m.removeNode.getCallCount(), 'removeNode called after decreasing the maximum map size');
	  test.done();
}
 
  
exports.testIntersectionAndSubmap = function(test) {
  var tree = getMap(); 
        
    var NUM_TO_INSERT = 2000;
    var NUM_TO_REMOVE = 500;
    
    
    var data = [];
		for (var i =0; i < NUM_TO_INSERT; i++){
			data.push(Math.floor(Math.random() * 100000));
			}
        
    /* Insert ints into tree out of order
    for (var i = 0; i < NUM_TO_INSERT; i += 1) {
      tree.insert(data[i]);
      
    }   
    */
    tree.insertAll(data);
   
    
    var data2 = data.slice(0, NUM_TO_REMOVE);
    var tree2 = getMap(); 
     var intertree = getMap(); 
    
    tree2.insertAll(data2);
    assert.ok(tree2.isSubmapOf(tree));
     assert.ok(tree2.isSubmapOf(data2));
    var data3 = data.slice(0, Math.floor(NUM_TO_REMOVE/2));
    var intersect = data.slice(Math.floor(NUM_TO_REMOVE/2), NUM_TO_REMOVE);
    intertree.insertAll(intersect);
    tree.removeAll(data3);
    tree2.removeAll(data3);
    var inter = tree.intersection(tree2);
    var inter1 = inter.getValues();
    var inter2 = intertree.getValues();
    for (var i = 0; i< inter1.size; i++){
    assert.equal(inter1[i], inter2[i]);
    }
    
    var inter = tree.intersection(intersect);
    var inter1 = inter.getValues();
    var inter2 = intertree.getValues();
    for (var i = 0; i< inter1.size; i++){
    assert.equal(inter1[i], inter2[i]);
    }
	test.done()
  };  
  
exports.testIterator = function(test){
  var m = getMap();
  for (var i = 0; i <10; i++){
  m.insert("key"+i, "val"+i);
  }
  var j =3;
  var iter = m.iterator("key"+2);
  
  while (iter.hasNext()){
  	assert.equal(iter.next(),"val"+j);
  	j++;
  }
  test.done();
  }
  
exports.testClone  = function(test) {
  
  	var data = [ 23, 11, 78, 3, 99, 34];
  var tree = getMap(); 
  		 for (var i = 0; i < data.length; i++){
  		   tree.insert(data[i], "val"+data[i]);
  		 }
      // tree.insertAll(data); 
      // assert.ok(tree.containsAll(data));
      
  var clone = tree.clone();

 
 	var cloneval = clone.getValues();
 	var cloneKeys = clone.getKeys();
 	var treeval = tree.getValues();
 	var treeKeys = tree.getKeys();
  assert.ok(tree.isSubmapOf(clone));
  assert.ok(clone.isSubmapOf(tree));
  assert.ok(tree.containsAll(data));
  assert.ok(tree.containsAll(clone));
  
  test.done();
  };  
  
 
exports.testInsertAll  = function(test){
 	var numbers = [1,2,3,4,5,6,7,8,9,10];
 	var numbers2 = [1,2,3,4,5,6,7,8,9,10, 1024];
 	var t = getMap();
 	t.insertAll(numbers);
 	assert.ok(t.containsAll(numbers));
 	assert(!t.containsAll(numbers2));
 	t2 = getMap();
 	t2.insertAll(t);
 	assert.ok(t2.containsAll(t));
 	var obj = {};
 	for (var i = 1; i <11; i++){
 		obj[i] = i;
 	}
 	t2.removeAll(obj);
 	assert.ok(t2.isEmpty());
 	
 	var someObj = {
 		'vals' : numbers,
 		'getValues' : function (){ return this.vals;},
 		'getKeys' : function (){ return this.vals;}
 	
 	}
 	
 	var someObj2 = {
 		'vals' : numbers2,
 		'getValues' : function (){ return this.vals;},
 		'getKeys' : function (){ return this.vals;}
 	
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
 
exports.testContainsAll  = function(test){
 var t = getMap();
 var obj = {};
 	for (var i = 1; i <11; i++){
 		obj[i] = i;
 	}
 	var obj2 = {};
 	for (var i = 1; i <13; i++){
 		obj2[i] = i;
 	}
 	t.insertAll(obj);
 	assert.ok(t.containsAll(obj));
 	assert(!t.containsAll(obj2));
	test.done();
 }


exports.testInBeforeAndAfter  = function(test){
		m = getMapWmaxCount();
		fillLinkedMap(m);
  assert.equal(['a', 'b', 'c', 'd'].toString(), m.getKeys().toString());
  assert.equal([0, 1, 2, 3].toString(), m.getValues().toString());
   m.insertAfter('d', 'f', 5);
   assert.equal(['a', 'b', 'c', 'd', 'f'].toString(), m.getKeys().toString());
  assert.equal([0, 1, 2, 3, 5].toString(), m.getValues().toString());
   m.insertBefore('f', 'e', 4);
   assert.equal(['a', 'b', 'c', 'd','e', 'f'].toString(), m.getKeys().toString());
  assert.equal([0, 1, 2, 3, 4, 5].toString(), m.getValues().toString());
  test.done();
	}