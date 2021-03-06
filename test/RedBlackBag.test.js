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

var comp = function(a, b) {
  if (String(a) < String(b)) {
    return -1;
  } else if (String(a) > String(b)) {
    return 1;
  }
  return 0;
};

var getTree = function(){
		return new js_cols.RedBlackBag(comp);
};

var getOrdTree = function(){
		return new js_cols.RedBlackSet(comp);
};

var getTree2 = function(){
		return new js_cols.RedBlackBag( function(a, b) {
      return a - b;
    });
};

var getTree3 = function(){
		return new js_cols.RedBlackBag(function(a, b) {
      return a.key - b.key;
    });
};

var getTree = function(){
		return new js_cols.RedBlackBag(comp);
};

  /**
   * This test verifies that we can insert strings into the TreeSet and have 
   * them be stored and sorted correctly by the default comparator.
   */
exports.testInsertsWithDefaultComparator = function(test) {
    var tree = getTree();
    var values = ['bill', 'blake', 'elliot', 'jacob', 'john', 'myles', 'ted'];
    
    // Insert strings into tree out of order
    tree.insert(values[4]);
    tree.insert(values[3]);
    tree.insert(values[0]);
    tree.insert(values[6]);
    tree.insert(values[5]);
    tree.insert(values[1]);
    tree.insert(values[2]);
    
    // Verify strings are stored in sorted order
    var i = 0;
    tree.traverse(function(value) {
      assert.equal(values[i], value);
      i += 1;
    });
    assert.equal(i, values.length);
	test.done();
  };

  /**
   * This test verifies that we can insert strings into and remove strings from
   * the TreeSet and have the only the non-removed values be stored and sorted 
   * correctly by the default comparator.
   */
  exports.testRemovesWithDefaultComparator = function(test) {
    var tree = getTree();
    var values = ['bill', 'blake', 'elliot', 'jacob', 'john', 'myles', 'ted'];
    
    // Insert strings into tree out of order
    tree.insert('frodo');
    tree.insert(values[4]);
    tree.insert(values[3]);
    tree.insert(values[0]);
    tree.insert(values[6]);
    tree.insert('samwise');        
    tree.insert(values[5]);
    tree.insert(values[1]);
    tree.insert(values[2]);
    tree.insert('pippin');
    
    // Remove strings from tree
    tree.remove('samwise')
    assert.equal(tree.contains('samwise'), false);
    tree.remove('pippin')
    assert.equal(tree.contains('pippin'), false);
    tree.remove('frodo')
    assert.equal(tree.contains('frodo'), false);
    tree.remove('merry');
    assert.equal(tree.contains('merry'), false);
    
    
    // Verify strings are stored in sorted order
    var i = 0;
    tree.traverse(function(value) {
      assert.equal(values[i], value);
      i += 1;
    });
    assert.equal(i, values.length);
	test.done();
  };

  /**
   * This test verifies that we can insert values into and remove values from 
   * the TreeSet and have them be stored and sorted correctly by a custom 
   * comparator.
   */
exports.testInsertsAndRemovesWithCustomComparator = function(test) {
    var tree = getTree2();
        
    var NUM_TO_INSERT = 37;
    var valuesToRemove = [1, 0, 6, 7, 36];
        
    // Insert ints into tree out of order
    var values = [];
    for (var i = 0; i < NUM_TO_INSERT; i += 1) {
      tree.insert(i);
      values.push(i);
    }    
    
    for (var i = 0; i < valuesToRemove.length; i += 1) {
    tree.remove(valuesToRemove[i]);
      assert.equal(tree.contains(valuesToRemove[i]), false); 
      arrayRemove(values, valuesToRemove[i]);
    }
  	tree.remove(-1);
    tree.remove(37);
    
    // Verify strings are stored in sorted order
    var i = 0;
    tree.traverse(function(value) {
      assert.equal(values[i], value);
      i += 1;
    });
    assert.equal(i, values.length);  
	test.done();  
  };
  

  exports.testSuccessor= function(test) {
    var tree = getTree2();
        
    var NUM_TO_INSERT = 37;
    var valuesToRemove = [1, 0, 6, 7,9, 36];
        
    // Insert ints into tree out of order
    var values = [];
    for (var i = 0; i < NUM_TO_INSERT; i += 1) {
      tree.insert(i);
      values.push(i);
    }    
    
    for (var i = 0; i < valuesToRemove.length; i += 1) {
    tree.remove(valuesToRemove[i]);
      assert.equal(tree.contains(valuesToRemove[i]), false); 
      arrayRemove(values, valuesToRemove[i]);
    }
  	assert.equal(tree.successor(0), null); // RedBlacktrees return null if the provided key is not in the set
  	assert.equal(tree.successor(5), 8);
    assert.equal(tree.successor(35), null);
	test.done();
  };
  
 exports.testPredecessor = function(test) {
    var tree = getTree2();
        
    var NUM_TO_INSERT = 37;
    var valuesToRemove = [1, 0, 6, 7, 36];
        
    // Insert ints into tree out of order
    var values = [];
    for (var i = 0; i < NUM_TO_INSERT; i += 1) {
      tree.insert(i);
      values.push(i);
    }    
    
    for (var i = 0; i < valuesToRemove.length; i += 1) {
    tree.remove(valuesToRemove[i]);
      assert.equal(tree.contains(valuesToRemove[i]), false); 
      arrayRemove(values, valuesToRemove[i]);
    }
  	assert.equal(tree.predecessor(7), null); // RedBlacktrees return null if the provided key is not in the set
  	assert.equal(tree.predecessor(4), 3);
  	assert.equal(tree.predecessor(2), null);
    
	test.done();
  };
  


  /**
   * This test verifies that we can insert values into and remove values from 
   * the TreeSet and have its contains method correctly determine the values it
   * is contains.
   */
  exports.testTreeSetContains = function(test) {
    var tree = getTree(); 
    var values = ['bill', 'blake', 'elliot', 'jacob', 'john', 'myles', 'ted'];
    
    // Insert strings into tree out of order
    tree.insert('frodo');
    tree.insert(values[4]);
    tree.insert(values[3]);
    tree.insert(values[0]);
    tree.insert(values[6]);
    tree.insert('samwise');        
    tree.insert(values[5]);
    tree.insert(values[1]);
    tree.insert(values[2]);
    tree.insert('pippin');
    
    // Remove strings from tree
    tree.remove('samwise');
    tree.remove('pippin');
    tree.remove('frodo');
    
    for (var i = 0; i < values.length; i += 1) {
      assert.ok(tree.contains(values[i]));
    }
    assert(!tree.contains('samwise'));
    assert(!tree.contains('pippin'));
    assert(!tree.contains('frodo'));    
	
	test.done();
  };  
  
  /**
   * This test verifies that we can insert values into and remove values from 
   * the TreeSet and have its minValue and maxValue routines return the correct
   * min and max values contained by the tree.
   */
  exports.testMinAndMaxValues = function(test) {
     var tree = getTree2(); 
        
    var NUM_TO_INSERT = 2000;
    var NUM_TO_REMOVE = 500;
        
    // Insert ints into tree out of order
    for (var i = 0; i < NUM_TO_INSERT; i += 1) {
      tree.insert(i);
    }    
    
    // Remove valuse
    for (var i = 0; i < NUM_TO_REMOVE; i += 1) {
      tree.remove(i);
    }    
    
    assert.equal(tree.getMin(), NUM_TO_REMOVE);   
    assert.equal(tree.getMax(), NUM_TO_INSERT - 1); 
	test.done();  
  };  

  /**
   * This test verifies that we can insert values into and remove values from 
   * the TreeSet and traverse the tree in reverse order using the 
   * reverseOrderTraverse routine.
   */
  exports.testReverseOrderTraverse = function(test) {
  var tree = getTree2(); 
        
    var NUM_TO_INSERT = 2000;
    var NUM_TO_REMOVE = 500;
        
    // Insert ints into tree out of order
    for (var i = 0; i < NUM_TO_INSERT; i += 1) {
      tree.insert(i);
    }    
    
    // Remove values
    for (var i = 0; i < NUM_TO_REMOVE; i += 1) {
      tree.remove(i);
    }    
    
    var i = NUM_TO_INSERT - 1;
    tree.traverseBackwards(function(value) {
      assert.equal(value, i);
      i -= 1;
    });    
    assert.equal(i, NUM_TO_REMOVE - 1);
	
	test.done();
  };  
  
  /**
 
   */
 exports.testOrderingWithRandomIntegers = function(test) {
  var tree = getTree2(); 
        
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
   
    
    var lastVal = tree.getMin();
    var isLarger = function(val) {
    assert.ok(val >= lastVal);
    lastVal=val;
    }
    tree.traverseFrom(isLarger, tree.successor(lastVal), this);
    var data2 = data.slice(0, NUM_TO_REMOVE);
    
    tree.removeAll(data2);
    lastVal = tree.getMin();
    tree.traverseFrom(isLarger, tree.successor(lastVal), this); // check that the ordering holds after 500 deletes
    tree.insertAll(data2);
    lastVal = tree.getMin();
    tree.traverseFrom(isLarger, tree.successor(lastVal), this); // check that the ordering holds after reinsertion of the 500 deleted values
    test.done();
  };  
  
  exports.testIntersectionAndSubset= function(test) {
  var tree = getTree2(); 
        
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
    var tree2 = getTree2(); 
     var intertree = getTree2(); 
   
    tree2.insertAll(data2);
    assert.ok(tree2.isSubsetOf(tree));
     assert(!tree.isSubsetOf(tree2));
    var data3 = data.slice(0, Math.floor(NUM_TO_REMOVE/2));
    var inter = data.slice(Math.floor(NUM_TO_REMOVE/2), NUM_TO_REMOVE);
    intertree.insertAll(inter);
    tree.removeAll(data3);
    tree2.removeAll(data3);
    var inter = tree.intersection(tree2);
    var inter1 = inter.getValues();
    var inter2 = intertree.getValues();
    for (var i = 0; i< inter1.size; i++){
    assert.equal(inter1[i], inter2[i]);
    }
	test.done();
  };  
  
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
 
  
exports.testSome= function(test) {
  var tree = getTree3(); 
        
   tree.insertAll(data);
    
 	var some = function(element){
 		return element.key == 1000;
 	}
    test.done();
  };  
  
 exports.testEvery = function(test) {
  var tree = getTree3(); 
        tree.insertAll(data);
    var every = function(element){
 		return element.value == "val";
 	}
 	tree.insertAll(data);
 	assert.ok(tree.every(every));
    test.done();
  };  
  
 exports.testFilter = function(test) {
  var tree = getTree3(); 
       tree.insertAll(data); 
    var filter = function(element){
			if (element.key > 100 && element.key < 201) return true;
 			
 	}
 	
 	var filtered = tree.filter(filter);
 	assert.ok(filtered.constructor  == Array);
 	
 	
 	for (var i = 0; i <100; i++){
 		assert.equal(filtered[i].key, i+101);
 		
 	}
    test.done();
  }; 
  
 exports.testMap= function(test) {
  var tree = getTree3(); 
        tree.insertAll(data);
   var map = function(element){
 			return element.value+element.key;
 	}
 	
 	var mapped = tree.map(map);
 	for (var i =0; i < NUM_TO_INSERT; i++){
			assert.equal(("val"+i), mapped[i]);
			}
			test.done();		
  };  
  
  exports.testForEach = function(test) {
  var tree = getTree3(); 
       tree.insertAll(data); 
  var each = function (element){
 		element.newkey = element.key +10;
 	}
    
    tree.forEach(each);
    var i =10;
    var assertforeach = function(element){
    		assert.equal(i, element.newkey);
    		i++;
    }
    
    tree.forEach(assertforeach, this);
	test.done();
  };  
  
    exports.testClone= function(test) {
  
  	var data = [ 23, 11, 11, 11, 78, 3, 99, 34];
  var map = getTree();
  var ordMap = getOrdTree();
  		 for (var i = 0; i < data.length; i++){
  		   map.insert(data[i]);
  		   ordMap.insert(data[i]);
  		 }
      // map.insertAll(data); 
      assert.ok(map.containsAll(data));
      
  var clone = map.clone();

 
 	var cloneval = clone.getValues();
 
 	var mapval = map.getValues();
 	
 	assert.equal(clone.getCount(), map.getCount());
 	assert.notEqual(map.getCount(), ordMap.getCount());
  assert.ok(map.isSubsetOf(clone));
  assert.ok(clone.isSubsetOf(map));
  assert.ok(ordMap.isSubsetOf(map));
  assert(!map.isSubsetOf(ordMap));
  assert.ok(map.containsAll(data));
  assert.ok(map.containsAll(clone));
   assert.ok(ordMap.containsAll(data));
  assert.ok(ordMap.containsAll(clone));
  test.done();
  };  
  
 exports.testMultipleValuesForOneKey = function(test) {
  
  	var data = [ 23, 11, 11, 11, 78, 3, 99, 34];
  var map = getTree2();
  
  		 for (var i = 0; i < data.length; i++){
  		   map.insert(data[i], "val"+data[i]);
  		  
  		 }
     
     assert.ok(map.contains(11));
     map.remove(11);
      assert.ok(map.contains(11));
       map.remove(11);
      assert.ok(map.contains(11));
       map.remove(11);
      assert(!map.contains(11));
      
	  test.done();
  };