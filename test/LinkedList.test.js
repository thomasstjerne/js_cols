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

function fillList(l) {
for (var i = 10; i > 0; i--){
	l.insert(i);
}
 
}


  


var getList = function(){
		return new js_cols.LinkedList();
};

var someObj = {};



 exports.testGetCount = function(test) {
  var l = getList();
  fillList(l);
  
  assert.equal(10, l.getCount());
 l.removeFirst();
  assert.equal(9, l.getCount());
   l.removeFirst();
  assert.equal(8, l.getCount());
  test.done();
}

exports.testIsEmpty = function(test) {
  var l = getList();
  assert.ok(l.isEmpty());
  l.addFirst('a');
  assert(!l.isEmpty());
 l.remove('a');
  assert.ok(l.isEmpty());
  test.done();
}


exports.testClear= function(test) {
  var l = getList();
  fillList(l);
  l.clear();
  assert.ok(l.isEmpty());
  test.done();
}

exports.testMap = function(test) {
  var l = getList();
  fillList(l);

  var result = l.map(function(val, key, linkedMap) {
    assert.equal( l, linkedMap, 'The LinkedMap object should get passed in');
    assert.equal( someObj, this, 'map should run in provided context');
    return val * 2;
  }, someObj);

  assert.equal([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20].toString(), result.toString());
  test.done();
}

   var NUM_TO_INSERT = 2000;
   var data = [];
		for (var i =0; i < NUM_TO_INSERT; i++){
			var o = {
				"key" : i,
				"value" : "val"
			}
			data.push(o);
			}
 //----------------------------------------------------- 
 
exports.testClone = function(test) {
  var l = getList();
       l.insertAll(data); 
  var clone = l.clone();
  assert.ok(clone.containsAll(data));
  assert.equal(clone.getCount(), l.getCount());
  test.done();
  };  
  
 exports.testSome = function(test) {
  var l = getList(); 
        
   l.insertAll(data);
    
 	var some = function(element){
 		return element.key == 1000;
 	}
 	
 	assert.ok(l.some(some));
 	assert(!l.some(function(element){
 		return element.key == -1000;
 	}));
 	
 	test.done();
    
  }; 
  
  exports.testForEach = function(test) {
  var l = getList(); 
       l.insertAll(data); 
  var each = function (element){
 		element.newkey = element.key +10;
 	}
    
    l.forEach(each);
    var i =10;
    var assertforeach = function(element){
    		assert.equal(i, element.newkey);
    		i++;
    }
    
    l.forEach(assertforeach, this);
	test.done();
  };  

exports.testSome2 = function(test) {
 var l = getList();
  fillList(l);

  var result = l.some(function(val, key, linkedList) {
    assert.equal( l, linkedList, 'The LinkedMap object should get passed in');
    assert.equal( someObj, this, 'map should run in provided context');
    return val == 11;
  }, someObj);

  assert(!result);
 	assert(!l.some(function(val) {return val < 1}));

  assert.ok(l.some(function(val) {return val == 10;}));
  assert(!l.some(function(val) {return val == 11;}));
  test.done();
}

exports.testFilter = function(test) {
  var l = getList();
  fillList(l);
	var func = function (value, key, map){
		return (value > 3 && value < 8);
	}
  var result = l.filter(func, someObj);
	
	for (var i = 4; i<8; i++){
	assert.equal(result.shift(), i);
	}
	
	test.done();
}

exports.testEvery = function(test) {
  var l = getList();
  fillList(l);

  var result = l.every(function(val, key, linkedMap) {
    assert.equal( l, linkedMap, 'The LinkedMap object should get passed in');
    assert.equal( someObj, this, 'map should run in provided context');
    return val < 11;
  }, someObj);

  assert.ok(result);
  assert(!l.every(function(val) {return val < 2}));

  assert.ok(l.every(function(val) {return typeof val == 'number';}));
  assert(!l.every(function(val) {return val == 6;}));
  test.done();
}

exports.testGetFirst = function(test) {
  var l = getList();
  assert.equal(null, l.getFirst());
  assert.equal(null, l.getLast());

  fillList(l);
  assert.equal(1,l.getFirst());

  l.removeFirst();
  assert.equal(2, l.getFirst());

  assert.equal(10, l.getLast());
l.removeLast();
  assert.equal(9, l.getLast());
 l.remove(9);
 assert.equal(8, l.getLast());
 test.done();
}

exports.testRemoveFirst = function(test) {
  var l = getList();
  
   assert.equal(null, l.getFirst());
  assert.equal(null, l.getLast());

  fillList(l);
  assert.equal(10, l.getCount());

  assert.equal(1, l.removeFirst());
  assert.equal(2, l.getFirst());

  assert.equal(10, l.removeLast());
  assert.equal(9,l.getLast());

  assert.equal(8, l.getCount());
  test.done();
}



exports.testContains = function(test) {
   var l = getList();
  fillList(l);
  assert.ok(l.contains(2));
  assert(!l.contains(90));
  test.done();
}



  
  
exports.testIterator = function(test){
  var m = getList();
  for (var i = 0; i <10; i++){
  m.addLast("val"+i);
  }
  
  var iter = m.iterator();
  var j =0;
  while (iter.hasNext()){
  	assert.equal(iter.next(),"val"+j);
  	j++;
  }
  test.done();
  }
  
exports.testIteratorInsert = function(test){
  var m = getList();
  fillList(m);
  
  var iter = m.iterator();
  iter.next();
  iter.next();
  iter.add(500);
  assert.equal([1,2,500, 3,4,5,6,7,8,9,10].toString(), m.getValues().toString());
  test.done();
  }
  
 exports.testIteratorRemove = function(test){
  var m = getList();
  fillList(m);
  
  var iter = m.iterator();
  iter.next();
  iter.next();
  iter.remove();
  assert.equal(iter.next(), 3);
  assert.equal([1,3,4,5,6,7,8,9,10].toString(), m.getValues().toString());
  test.done();
  }
  
 exports.testIteratorReplace = function(test){
  var m = getList();
  fillList(m);
  
  var iter = m.iterator();
  iter.next();
  iter.next();
  iter.next();
  iter.next();
  iter.set(500);
  assert.equal(iter.next(), 5);
  assert.equal([1,2,3,500,5,6,7,8,9,10].toString(), m.getValues().toString());
  test.done();
  }
  
exports.testIteratorOutOfBounds = function(test){
  var m = getList();
  fillList(m);
  
  var iter = m.iterator();
  assert.equal(iter.remove(), null);
  assert.equal(iter.previous(), 10);
  assert.equal(iter.next(), null);
  assert.equal(iter.next(), null);
   
  test.done();
  
  }
  
 exports.testInsertAll = function(test){
 	var numbers = [1,2,3,4,5,6,7,8,9,10];
 	var numbers2 = [1,2,3,4,5,6,7,8,9,10, 1024];
 	var t = getList();
 	t.insertAll(numbers);
 	assert.ok(t.containsAll(numbers));
 	assert(!t.containsAll(numbers2));
 	t.removeAll(numbers);
 	assert.ok(t.isEmpty());
 	t.insertAll(numbers);
 	t2 = getList();
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
 
exports.testContainsAll = function(test){
 var t = getList();
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

exports.testRemoveIndex = function(test){
 	var l = getList();
 	fillList(l);
 	l.removeIndex(4);
 	var iter = l.iterator(1024);
 	var i = 1;
 	while(iter.hasNext()){
 	assert.equal(i, iter.next());
 	if (i ==3) { i += 2}
 	else i++;
 	
 	}
	test.done();
 }
 
exports.testRemoveObject = function(test){
 	var l = getList();
 	fillList(l);
 	assert.ok(l.removeObject(8));
 	assert(!l.removeObject(14));
 	var iter = l.iterator();
 	var i = 1;
 	while(iter.hasNext()){
 	assert.equal(i, iter.next());
 	if (i ==7) { i += 2}
 	else i++;
 	
 	}
 	l.add(8,8);
 	i=9;
 	while(iter.hasPrevious()){
 	assert.equal(i, iter.previous());
 	
 	 i--;
 	
 	}
	test.done();
 }