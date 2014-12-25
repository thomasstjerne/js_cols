//Copyright 2010 Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.



/**
 * @fileoverview Bootstrap for the js_cols Library.
 * The code in this file, base.js, is adopted partly from googles base.js,
 * and partly from structs.js.
 * It has been modified to suit the needs of the js_cols Library.
 * The js_cols collections should be easily integratable in projets
 * using google closure library, as they generally use the same method names,
 * code style and use of closures.
 *
 */

/**
 * Declaring a global js_cols variable
 */
js_cols = {};


/**
 * Reference to the global context.  In most cases this will be 'window'.
 */
js_cols.global = this;

  
  /**
 * Gets a unique ID for an object. This mutates the object so that further
 * calls with the same object as a parameter returns the same value. The unique
 * ID is guaranteed to be unique across the current session amongst objects that
 * are passed into {@code getUid}. There is no guarantee that the ID is unique
 * or consistent across sessions. It is unsafe to generate unique ID for
 * function prototypes.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {number} The unique ID for the object.
 * @public
 */
js_cols.getUid = function(obj) {
  // TODO(user): Make the type stricter, do not accept null.

  // In Opera window.hasOwnProperty exists but always returns false so we avoid
  // using it. As a consequence the unique ID generated for BaseClass.prototype
  // and SubClass.prototype will be the same.
  return obj[js_cols.UID_PROPERTY_] ||
      (obj[js_cols.UID_PROPERTY_] = ++js_cols.uidCounter_);
};

/**
 * Removes the unique ID from an object. This is useful if the object was
 * previously mutated using {@code js_cols.getUid} in which case the mutation is
 * undone.
 * @param {Object} obj The object to remove the unique ID field from.
 * @public
 */
js_cols.removeUid = function(obj) {
  // TODO(user): Make the type stricter, do not accept null.

  // DOM nodes in IE are not instance of Object and throws exception
  // for delete. Instead we try to use removeAttribute
  if ('removeAttribute' in obj) {
    obj.removeAttribute(js_cols.UID_PROPERTY_);
  }
  /** @preserveTry */
  try {
    delete obj[js_cols.UID_PROPERTY_];
  } catch (ex) {
  }
};


/**
 * Name for unique ID property. Initialized in a way to help avoid collisions
 * with other closure javascript on the same page.
 * @type {string}
 * @private
 */

 
js_cols.UID_PROPERTY_ = 'js_cols_uid_' +
    Math.floor(Math.random() * 2147483648).toString(36);


/**
 * Counter for UID.
 * @type {number}
 * @private
 */
js_cols.uidCounter_ = 0;

/**
 * Returns the values of the object/map/hash.
 *
 * @param {Object} obj The object from which to get the values.
 * @return {!Array} The values in the object/map/hash.
 * @public
 */
js_cols.getValues = function(obj) {

	if (js_cols.typeOf(obj) == 'array'){
		return obj;
	}
	else if(!obj.getValues){
    var res = [];
    var i = 0;
    for (var key in obj) {
    res[i++] = obj[key];
   }
  }
  else{
   var res = obj.getValues();
  }
  return res;
};


/**
 * Returns the keys of the object/map/hash.
 *
 * @param {Object} obj The object from which to get the keys.
 * @return {!Array.<string>} Array of property keys.
 * @public
 */
js_cols.getKeys = function(obj) {

	if (obj.getKeys){
		return obj.getKeys();
		}
	else if (js_cols.typeOf(obj) == 'array'){
		var res = [];
			for (var i = 0; i < obj.length; i++){
			res.push(i);
			}
		return res;
		}
	else if (js_cols.typeOf(obj) == 'object'){
  		var res = [];
 		 var i = 0;
 		 for (var key in obj) {
   			 res[i++] = key;
  			}
  		return res;
  		}
  
};

/**
 * Calls a function for each element in an object/map/hash. If
 * all calls return true, returns true. If any call returns false, returns
 * false at this point and does not continue to check the remaining elements.
 *
 * @param {Object} obj The object to check.
 * @param {Function} f The function to call for every element. This function
 *     takes 3 arguments (the element, the index and the object) and should
 *     return a boolean.
 * @param {Object=} opt_obj This is used as the 'this' object within f.
 * @return {boolean} false if any element fails the test.
 * @public
 */


js_cols.every = function(obj, f, opt_obj) {

		if (js_cols.typeOf(obj.every) == 'function'){
			return obj.every(f, opt_obj);
		}
else	if (js_cols.typeOf(obj.getValues) == 'function'){
		var col = obj.getValues();
  		for (var i =0; i< col.length; i++ ) {
    		if (!f.call(opt_obj, col[i], i, col)) {
      			return false;
    			}
    		}
    		return true;
 		 }
 else	if (js_cols.typeOf(obj) == 'array'){
 		for (var i =0; i< obj.length; i++ ) {
    		if (!f.call(opt_obj, obj[i], i, obj)) {
      			return false;
    			}
    		}
    		return true;
 		}
else 	if (js_cols.typeOf(obj) == 'object'){
 		for (var key in obj) {
   			 if (!f.call(opt_obj, obj[key], key, obj)) {
      			return false;
    		}
 		}
 		return true;
 	}
 
};

/**
 * Calls a function for each element in an object/map/hash. 
 * @param {Object} obj The object to traverse.
 * @param {Function} f The function to call for every element. This function
 *     takes 3 arguments (the element, the index and the object) 
 * @param {Object=} opt_obj This is used as the 'this' object within f.
 * @public
 */


js_cols.forEach = function(obj, f, opt_obj) {

		if (js_cols.typeOf(obj.forEach) == 'function'){
			obj.forEach(f, opt_obj);
		}
else	if (js_cols.typeOf(obj.getValues) == 'function'){
		var col = obj.getValues();
  		for (var i =0; i< col.length; i++ ) {
    		f.call(opt_obj, col[i], i, col)
 		 }
 		 }
 else	if (js_cols.typeOf(obj) == 'array'){
 		for (var i =0; i< obj.length; i++ ) {
    		f.call(opt_obj, obj[i], i, obj)
 		}
 		}
else 	if (js_cols.typeOf(obj) == 'object'){
 		for (var key in obj) {
   			f.call(opt_obj, obj[key], key, obj)
 	}
 	}
 
};

/**
 * Returns the number of values in the collection-like object.
 * @param {Object} col The collection-like object.
 * @return {number} The number of values in the collection-like object.
 * @public
 */
js_cols.getCount = function(col) {
  if (typeof col.getCount == 'function') {
    return col.getCount();
  }
 else if (col.length && typeof col.length == "number") {
    return col.length;
  }
  else{
  var rv = 0;
  for (var key in col) {
    rv++;
  }
  return rv;
  }
};


/**
 * Whether the collection contains the given value. This is O(n) and uses
 * equals (==) to test the existence.
 * @param {Object} col The collection-like object.
 * @param {*} val The value to check for.
 * @return {boolean} True if the map contains the value.
 * @public
 */
js_cols.contains = function(col, val) {
  if (typeof col.contains == 'function') {
    return col.contains(val);
  }
  if (typeof col.containsValue == 'function') {
    return col.containsValue(val);
  }
  if (js_cols.typeOf(col) == 'array') {
    for (var i=0; i<col.length;i++){
    	if (col[i] == val) return true;
    }
    return false;
  }
   for (var key in col) {
    if (col[key] == val) {
      return true;
    }
  }
  return false;
};



/**
 * This is a "fixed" version of the typeof operator.  It differs from the typeof
 * operator in such a way that null returns 'null' and arrays return 'array'.
 * @param {*} value The value to get the type of.
 * @return {string} The name of the type.
 * @public
 */
js_cols.typeOf = function(value) {
  var s = typeof value;
  if (s == 'object') {
    if (value) {
      // We cannot use constructor == Array or instanceof Array because
      // different frames have different Array objects. In IE6, if the iframe
      // where the array was created is destroyed, the array loses its
      // prototype. Then dereferencing val.splice here throws an exception, so
      // we can't use goog.isFunction. Calling typeof directly returns 'unknown'
      // so that will work. In this case, this function will return false and
      // most array functions will still work because the array is still
      // array-like (supports length and []) even though it has lost its
      // prototype.
      // Mark Miller noticed that Object.prototype.toString
      // allows access to the unforgeable [[Class]] property.
      //  15.2.4.2 Object.prototype.toString ( )
      //  When the toString method is called, the following steps are taken:
      //      1. Get the [[Class]] property of this object.
      //      2. Compute a string value by concatenating the three strings
      //         "[object ", Result(1), and "]".
      //      3. Return Result(2).
      // and this behavior survives the destruction of the execution context.
      if (value instanceof Array ||  // Works quickly in same execution context.
          // If value is from a different execution context then
          // !(value instanceof Object), which lets us early out in the common
          // case when value is from the same context but not an array.
          // The {if (value)} check above means we don't have to worry about
          // undefined behavior of Object.prototype.toString on null/undefined.
          //
          // HACK: In order to use an Object prototype method on the arbitrary
          //   value, the compiler requires the value be cast to type Object,
          //   even though the ECMA spec explicitly allows it.
          (!(value instanceof Object) &&
           (Object.prototype.toString.call(
               /** @type {Object} */ (value)) == '[object Array]') ||

           // In IE all non value types are wrapped as objects across window
           // boundaries (not iframe though) so we have to do object detection
           // for this edge case
           typeof value.length == 'number' &&
           typeof value.splice != 'undefined' &&
           typeof value.propertyIsEnumerable != 'undefined' &&
           !value.propertyIsEnumerable('splice')

          )) {
        return 'array';
      }
      // HACK: There is still an array case that fails.
      //     function ArrayImpostor() {}
      //     ArrayImpostor.prototype = [];
      //     var impostor = new ArrayImpostor;
      // this can be fixed by getting rid of the fast path
      // (value instanceof Array) and solely relying on
      // (value && Object.prototype.toString.vall(value) === '[object Array]')
      // but that would require many more function calls and is not warranted
      // unless closure code is receiving objects from untrusted sources.

      // IE in cross-window calls does not correctly marshal the function type
      // (it appears just as an object) so we cannot use just typeof val ==
      // 'function'. However, if the object has a call property, it is a
      // function.
      if (!(value instanceof Object) &&
          (Object.prototype.toString.call(
              /** @type {Object} */ (value)) == '[object Function]' ||
          typeof value.call != 'undefined' &&
          typeof value.propertyIsEnumerable != 'undefined' &&
          !value.propertyIsEnumerable('call'))) {
        return 'function';
      }


    } else {
      return 'null';
    }

  } else if (s == 'function' && typeof value.call == 'undefined') {
    // In Safari typeof nodeList returns 'function', and on Firefox
    // typeof behaves similarly for HTML{Applet,Embed,Object}Elements
    // and RegExps.  We would like to return object for those and we can
    // detect an invalid function by making sure that the function
    // object has a call method.
    return 'object';
  }
  return s;
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * Usage:
 * <pre>
 * function ParentClass(a, b) { }
 * ParentClass.prototype.foo = function(a) { }
 *
 * function ChildClass(a, b, c) {
 *   ParentClass.call(this, a, b);
 * }
 *
 * js_cols.inherits(ChildClass, ParentClass);
 *
 * var child = new ChildClass('a', 'b', 'see');
 * child.foo(); // works
 * </pre>
 *
 * In addition, a superclass' implementation of a method can be invoked
 * as follows:
 *
 * <pre>
 * ChildClass.prototype.foo = function(a) {
 *   ChildClass.superClass_.foo.call(this, a);
 *   // other code
 * };
 * </pre>
 *
 * @param {Function} childCtor Child class.
 * @param {Function} parentCtor Parent class.
 */
js_cols.inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;
};

//Copyright 2010 Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//js_cols.provide('js_cols.LinkedList');
/**
 * 
 *
 *
 * js_cols.LinkedList provides the implementation of a doubly Linked List. The list is circular,
 * keeping a dummy element (<i>"sentinel"</i>) .<p>
 *
 * The assymptotic running time for important operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - add                    O(n/2)
 * - addFirst               O(1)
 * - addLast                O(1)
 * - clear                  O(1)
 * - clone                  O(n)
 * - contains               O(n)
 * - containsAll            O(n*m) m is the cardinality of the supplied collection
 * - every                  O(n * O(f)) f is the function supplied as argument
 * - filter                 O(n * O(f)) f is the function supplied as argument
 * - forEach                O(n * O(f)) f is the function supplied as argument
 * - getValues              O(n)
 * - insertAll              O(m) m is the cardinality of the supplied collection
 * - map                    O(n * O(f)) f is the function supplied as argument
 * - remove                 O(n)
 * - removeAll              O(n*m) m is the cardinality of the supplied collection
 * - removeFirst            O(1)
 * - removeLast             O(1)
 * - some                   O(n * O(f)) f is the function supplied as argument
 * - contains               O(n * O(f)) f is the function supplied as argument
 * </pre>
 *
 * @constructor
 */

js_cols.LinkedList = function(){

	// creating the dummy element in the list

	this.sentinel ={};
	this.sentinel.next = this.sentinel;
	this.sentinel.previous = this.sentinel;
	this.size = 0; 
	};

	/**
	 * Returns the number of elements in the list
	 * @return {Integer} number of elements in the list
	 * @public
	 */	
	js_cols.LinkedList.prototype.getCount = function(){return this.size;}

	/**
	 * Adds an element to the beginning of the list
	 * @param {*} element the element to add
	 * @public
	 */	
	js_cols.LinkedList.prototype.addFirst = function (element){
		var newFirst = {};
		newFirst.data = element;
		newFirst.previous = this.sentinel;
		var oldFirst = this.sentinel.next;
		newFirst.next = oldFirst;
		oldFirst.previous = newFirst;
		this.sentinel.next = newFirst;
		this.size ++;

	};

	/**
	 * Adds an element to the end of the list
	 * @param {*} element the element to add
	 * @public
	 */	
	js_cols.LinkedList.prototype.addLast = function(element){
		var newLast = {};
		newLast.data = element;
		newLast.next = this.sentinel;
		var oldLast = this.sentinel.previous;
		newLast.previous = oldLast;
		oldLast.next = newLast;
		this.sentinel.previous = newLast;
		this.size ++;

	};

	/**
	 * Removes and returns the last element in the list
	 * @return {*} the last element of the list
	 * @public
	 */
	js_cols.LinkedList.prototype.removeLast = function(){
		if (this.sentinel.previous == this.sentinel) return null;
		var last = this.sentinel.previous;
		last.previous.next = this.sentinel;
		this.sentinel.previous = last.previous;
		this.size --;
		return last.data;

	};

	/**
	 * Removes and returns the first element in the list
	 * @return {*} the first element of the list
	 * @public
	 */
	js_cols.LinkedList.prototype.removeFirst = function(){
		if (this.sentinel.next == this.sentinel) return null;
		var first = this.sentinel.next;
		first.next.previous = this.sentinel;
		this.sentinel.next = first.next;
		this.size --;
		return first.data;

	};

	/**
	 * Returns the first element in the list
	 * @return {*} the first element of the list
	 * @public
	 */
	js_cols.LinkedList.prototype.getFirst = function(){
		if (this.sentinel.next == this.sentinel) return null;
		return this.sentinel.next.data;

	};

	/**
	 * Returns the last element in the list
	 * @return {*} the last element of the list
	 * @public
	 */
	js_cols.LinkedList.prototype.getLast = function(){
		if (this.sentinel.previous == this.sentinel) return null;
		return this.sentinel.previous.data;

	};

	/**
	 * Removes a given element from the list, if it is contained
	 * @param {*} o the element to remove
	 * @return {Boolean} wheter the object was removed;
	 * @public
	 */	
	js_cols.LinkedList.prototype.removeObject = function(o){
		var it = new js_cols.LinkedList.LinkedListIterator(0, this);
		var done = false;
		while(it.hasNext() && !done){
			if (o == it.next()) {
				it.remove();
				done = true;
				return true
			}
		}
		return false;
	};

	/**
	 * This operation is equal to removeObject
	 * Removes a given element from the list, if it is contained
	 * @param {*} o the element to remove
	  * @return {Boolean} wheter the object was removed;
	 * @public
	 */	
	js_cols.LinkedList.prototype.remove = function(o){
		return this.removeObject(o);
	};

	/**
	 * Removes the element at index i from the list
	 * @param {Integer} index the index of the element to remove
	 * @public
	 */	
	js_cols.LinkedList.prototype.removeIndex = function(index){
		var it = new js_cols.LinkedList.LinkedListIterator(index, this);
		it.remove();
	};

	/**
	 * Adds an element at index i in the list
	 * @param {Integer} index the index of the element
	 * @param {*} element the element to add
	 * @public
	 */	
	js_cols.LinkedList.prototype.add = function(index,o){
		var it = new js_cols.LinkedList.LinkedListIterator(index-1, this);
		it.add(o);
	};

	/**
	 * Checks whether a given element is contained in the list
	 * @param {*} o the element to locate
	 * @public
	 */	
	js_cols.LinkedList.prototype.contains = function(o){
		var it = new js_cols.LinkedList.LinkedListIterator(0, this);
		var done = false;
		while(it.hasNext() && !done){
			if (o == it.next()) done = true;

		};
		return done;
	};

	/**
	 * Returns an iterator over the list, starting at the specified position
	 * @param {Integer} startpos the start position of this Iterator
	 * @return {js_cols.LinkedList.LinkedListIterator} an iterator over the elements in the list
	 * @public
	 */
	js_cols.LinkedList.prototype.iterator = function(startPos){
		return new js_cols.LinkedList.LinkedListIterator(startPos, this);
	};

	/**
	 * Returns an Array with the values of the list.
	 * @return {!Array} The values in the list.
	 */

	js_cols.LinkedList.prototype.toArray = function() {
		var retArray = [];
		var iter = this.iterator(0);
		while (iter.hasNext()){
			retArray.push(iter.next());
		};
		return retArray;
	};

	/**
	 * Returns the values of the list in an Array.
	 * This operation is equal to toArray
	 * @return {!Array} The values in the list.
	 */
	js_cols.LinkedList.prototype.getValues = function(){
		return this.toArray();
	};

	/**
	 * Removes all elements from the list.
	 * 
	 */
	js_cols.LinkedList.prototype.clear = function(){
		this.sentinel.next = this.sentinel;
		this.sentinel.previous = this.sentinel;
		this.size = 0; 
	};

	/**
	 * Creates a new list and inserts all elements from this list
	 * to the new list and returns it
	 *@return {js_cols.LinkedList} a shallow clone of this list 
	 */
	js_cols.LinkedList.prototype.clone = function(){
		var rv = new js_cols.LinkedList();
		this.forEach(rv.addLast, rv);
		return rv;
	};
	/**
	 * Returns true if the size of the list is zero.
	 * @return {Boolean} 
	 */
	js_cols.LinkedList.prototype.isEmpty = function(){
		return this.size == 0;
	};

	/**
	 * Calls a function on each item in the LinkedList.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the LinkedHashMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 */
	js_cols.LinkedList.prototype.forEach = function(f, opt_obj) {
		for (var n = this.sentinel.next; n != this.sentinel; n = n.next) {
			f.call(opt_obj, n.data, n.data, this);
		};
	};


	/**
	 * Calls a function on each item in the LinkedList and returns the results of
	 * those calls in an array.
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the LinkedList.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {!Array} The results of the function calls for each element in the
	 *     LinkedList.
	 */
	js_cols.LinkedList.prototype.map = function(f, opt_obj) {
		var rv = [];
		for (var n = this.sentinel.next; n != this.sentinel; n = n.next) {
			rv.push(f.call(opt_obj, n.data, n.data, this));
		};
		return rv;
	};

	/**
	 * Calls a function on each item in the LinkedList, if the function returns true, the key/value pair
	 * is inserted into an object that is returned when all elements in the the list has been visited
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the LinkedList.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {!Array} The elements that evaluated to true in the function calls for each element in the
	 *     LinkedList.
	 */
	js_cols.LinkedList.prototype.filter = function(f, opt_obj) {
		var rv = [];
		for (var n = this.sentinel.next; n != this.sentinel; n = n.next) {
			if (f.call(opt_obj, n.data, n.data, this)) {
				rv.push(n.data);
			};
		};
		return rv;
	};

	/**
	 * Calls a function on each item in the LinkedList and returns true if any of
	 * those function calls returns a true-like value.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the LinkedList, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for at least one element in the
	 *     LinkedList.
	 */
	js_cols.LinkedList.prototype.some = function(f, opt_obj) {
		for (var n = this.sentinel.next; n != this.sentinel; n = n.next) {
			if (f.call(opt_obj, n.data, n.data, this)) {
				return true;
			};
		};
		return false;
	};


	/**
	 * Calls a function on each item in the LinkedList and returns true only if every
	 * function call returns a true-like value.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the LinkedList, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for every element in the LinkedList.
	 */
	js_cols.LinkedList.prototype.every = function(f, opt_obj) {
		for (var n = this.sentinel.next; n != this.sentinel; n = n.next) {
			if (!f.call(opt_obj, n.data, n.data, this)) {
				return false;
			};
		};
		return true;
	};

	/**
	 * Inserts an element to the head of the list
	 * this operation is equal to addFirst
	 * @param {*} element the element to insert
	 * @public
	 */
	js_cols.LinkedList.prototype.insert = function(element){
		this.addFirst(element);
	};

/**
	 * Inserts all values from the collection into the list
	 * @param {js_cols.Collection || Array || Object} col the collection of values
	 * @public
	 */
	js_cols.LinkedList.prototype.insertAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				this.addLast(col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.addLast, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
			var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
				this.addLast(arr[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.addLast(col[key]);
			}
		}
	};

	/**
	 * Removes a all values contained in the collection from the list.
	 * WARNING: this runs in O(n*m) where n is the cardinality of the LinkedList
	 * and m is the cardinality of the collection
	 * @param {js_cols.Collection || Array || Object} col the collection of values to remove
	 * @public
	 */
	js_cols.LinkedList.prototype.removeAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				this.removeObject(col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.removeObject, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
			var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
				this.removeObject(arr[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.removeObject(col[key]);
			}
		}
	};


	/**
	 * Checks that all values contained in the collection are also contained in the LinkedList
	 * WARNING: this runs in O(n*m) where n is the cardinality of the LinkedList
	 * and m is the cardinality of the collection
	 * @param {js_cols.Collection || Array || Object} col the collection of values to check
	 * @return {Boolean}
	 * @public
	 */
	js_cols.LinkedList.prototype.containsAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				if (!this.contains(col[i]))
				{ return false;
				}
			}
			return true;
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			return col.every(this.contains, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
			var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
				if (!this.contains(arr[i])){
					return false;
				}
			}
			return true;
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				if (!this.contains(col[key])){
					return false;
				}
			}
			return true;
		}
	};


/**
 * A Linked List Iterator used to traverse and modify elements in a Linked List,
 * @param {Integer} startpos the start position of this Iterator
 * @param {js_cols.LinkedList} list the list to iterate
 * @constructor
 * @public 
 */

js_cols.LinkedList.LinkedListIterator = function(startPos, list){

	this.list = list;
	this.position = this.list.sentinel;
	
	if (startPos > this.list.size || startPos < 0) 
		{startpos =0;}

	else 
		if ((this.list.size - startPos) > (this.list.size / 2)) {
			for (i = 1; i <= startPos; i++) 
				this.next();
		}
		else if (startPos !=0){
			for (i = this.list.size + 1; i > startPos; i--) 
				this.previous();
		};
	};

	/**
	 * Checks if the iterator has a next element
	 * @return {Boolean} 
	 * @public
	 */
	js_cols.LinkedList.LinkedListIterator.prototype.hasNext = function(){
		return this.position.next != this.list.sentinel;
	};

	/**
	 * Checks if the iterator has a previous element
	 * @return {Boolean} 
	 * @public
	 */
	js_cols.LinkedList.LinkedListIterator.prototype.hasPrevious = function(){
		return this.position.previous != this.list.sentinel;
	};

	/**
	 * Moves the Iterator 1 step forward, and returns the new element reached
	 * @return {*} the new element reached
	 * @public
	 */
	js_cols.LinkedList.LinkedListIterator.prototype.next = function(){
		if(!this.hasNext()) return null;
		this.position = this.position.next;
		return this.position.data;
	};

	/**
	 * Moves the Iterator 1 step backwards, and returns the new element reached
	 * @return {*} the new element reached
	 * @public
	 */
	js_cols.LinkedList.LinkedListIterator.prototype.previous = function(){
		if(!this.hasPrevious()) return null;
		this.position = this.position.previous;
		return this.position.data;
	};

	/**
	 * Inserts a new element after the current position, and moves the Iterator
	 * forward to this new elemnt
	 * @param {*} element the new element to insert
	 * @public
	 */
	js_cols.LinkedList.LinkedListIterator.prototype.add = function(element){

		var newNode = {};
		newNode.data = element;
		newNode.next = this.position.next;
		this.position.next.previous = newNode;
		newNode.previous = this.position;
		this.position.next = newNode;
		this.position = newNode;
		this.list.size ++;
	};

	/**
	 * Removes the element at the current position, and moves the Iterator
	 * to the previous element
	 * @return {*} the removed element 
	 * @public
	 */
	js_cols.LinkedList.LinkedListIterator.prototype.remove = function(){
		if (this.position == this.list.sentinel) return null;
		var toBeRemoved = this.position;
		this.position.previous.next = this.position.next;
		this.position.next.previous = this.position.previous;
		this.position = this.position.previous;
		this.list.size --;
		return toBeRemoved.data;

	};

	/**
	 * Replaces the element at the current position
	 * @param {*} element the new element to replace the current position 
	 * @public
	 */
	js_cols.LinkedList.LinkedListIterator.prototype.set = function(element){
		if (this.position == this.list.sentinel) return false;
		this.position.data = element;
		return true;
	};

	
	
//Copyright 2010 Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//js_cols.provide('js_cols.HashMap');
/**
 *
 *
 *
 *
 * This file contains an implementation of a Hash Map structure. 
 * It is based on goog.structs.Map from 
 * the google closure library, but has been modified to accept any kind of 
 * objects as keys (not only Strings or Numbers). Hence, the functionality
 * is similar to that of java.util.HashMap.
 * WARNING: keys will be modified, a property named something like "js_cols_uid_2kczq5"
 * will be added. This liberates the user of implementing a getHashCode function, and
 * improves performance as hashing collisions are avoided.
 * The assymptotic running time for important operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - clear                  O(1)
 * - clone                  O(n logn)
 * - contains               O(1)
 * - containsAll            O(m) m is the cardinality of the supplied collection
 * - every                  O(n * O(f)) f is the function supplied as argument
 * - filter                 O(n * O(f)) f is the function supplied as argument
 * - forEach                O(n * O(f)) f is the function supplied as argument
 * - get                    O(1)
 * - getValues              O(n)
 * - insert                 O(1)
 * - insertAll              O(m) m is the cardinality of the supplied collection
 * - map                    O(n * O(f)) f is the function supplied as argument
 * - remove                 O(1)
 * - removeAll              O(m logn) m is the cardinality of the supplied collection
 * - some                   O(n * O(f)) f is the function supplied as argument
 * - contains               O(n * O(f)) f is the function supplied as argument
 * </pre>
* @param {*=} opt_map Map or Object to initialize the map with.
 * @param {...*} var_args If 2 or more arguments are present then they
 *     will be used as key-value pairs.
 * @constructor
 */
js_cols.HashMap = function(opt_map, var_args) {

	/**
	 * Underlying JS object used to implement the map.
	 * @type {!Object}
	 * @private
	 */
	this.map_ = {};

	
	var argLength = arguments.length;

 if (argLength > 1) {
    if (argLength % 2) {
      throw Error('Uneven number of arguments');
    }
    for (var i = 0; i < argLength; i += 2) {
      this.insert(arguments[i], arguments[i + 1]);
    }
  } else if (opt_map) {
    this.insertAll(/** @type {Object} */ (opt_map));
  }
};


	/**
	 * The number of key value pairs in the map.
	 * @private
	 * @type {number}
	 */
	js_cols.HashMap.prototype.count_ = 0;


	/**
	 * Version used to detect changes while iterating.
	 * @private
	 * @type {number}
	 */
	js_cols.HashMap.prototype.version_ = 0;

	/**
	 * @return {number} The number of key-value pairs in the map.
	 */
	js_cols.HashMap.prototype.getCount = function() {
		return this.count_;
	};


	/**
	 * Returns the values of the map.
	 * @return {!Array} The values in the map.
	 */
	js_cols.HashMap.prototype.getValues = function() {


		var rv = [];
		for (var propertyName in this.map_) {

			rv.push(this.map_[propertyName].value);
		}
		return rv;
	};

	/**
	 * Returns the keys of the map.
	 * @return {!Array} Array of key contained in this map.
	 */
	js_cols.HashMap.prototype.getKeys = function() {


		var rv = [];
		for (var propertyName in this.map_) {

			rv.push(this.map_[propertyName].key);
		}
		return rv;
	};



	/**
	 * Whether the map contains the given key.
	 * @param {*} key The key to check for.
	 * @return {boolean} Whether the map contains the key.
	 */
	js_cols.HashMap.prototype.containsKey = function(key) {

		var hash = this.getHash_(key);
		return js_cols.HashMap.hasHash_(this.map_, hash);
	};

	/**
	 * This operation is identical to containsKey.
	 * Whether the map contains the given key.
	 * @param {*} key The key to check for.
	 * @return {boolean} Whether the map contains the key.
	 */
	js_cols.HashMap.prototype.contains = function(key) {

		return this.containsKey(key);
	};

	/**
	 * Whether the map contains the given key.
	 * @param {*} key The key to check for.
	 * @return {boolean} Whether the map contains the key.
	 * @private
	 */
	js_cols.HashMap.prototype.containsSwapped = function(value, key){
		return this.containsKey(key);
	}

	/**
	 * Whether the map contains the given value. This is O(n).
	 * @param {*} val The value to check for.
	 * @return {boolean} Whether the map contains the value.
	 */
	js_cols.HashMap.prototype.containsValue = function(val) {
		for (var propertyName in this.map_) {
			if (this.map_[propertyName].value == val) {
				return true;
			}
		}
		return false;
	};


	/**
	 * Default equality test for values.
	 * @param {*} a The first value.
	 * @param {*} b The second value.
	 * @return {boolean} Whether a and b reference the same object.
	 */
	js_cols.HashMap.prototype.defaultEquals = function(a, b) {
		return a === b;
	};
	
	/**
	 * Whether this map is equal to the argument map.
	 * @param {js_cols.HashMap} otherMap The map against which to test equality.
	  * @param {Function=} opt_equalityFn Optional comparison function.
 *     Should take 2 arguments to compare, and return true if the arguments
 *     are equal. Defaults to {@link js_cols.HashMap.defaultEquals} which
 *     compares the elements using the built-in '===' operator.
	 * @return {boolean} Whether the maps are equal.
	 */
	js_cols.HashMap.prototype.equals = function(otherMap, opt_equalityFn) {
		if (!(otherMap instanceof js_cols.HashMap)) {
		return false;
		}
		if (this === otherMap) {
			return true;
		}

		if (this.count_ != otherMap.getCount()) {
			return false;
		}

		var equalityFn = (js_cols.typeOf(opt_equalityFn) == 'function') ? opt_equalityFn : this.defaultEquals;


		for (var propertyName in this.map_) {
			var key = this.map_[propertyName].key;
			if (!equalityFn(this.get(key), otherMap.get(key))) {
				return false;
			}
		}

		return true;
	};


	/**
	 * @return {boolean} Whether the map is empty.
	 */
	js_cols.HashMap.prototype.isEmpty = function() {
		return this.count_ == 0;
	};


	/**
	 * Removes all key-value pairs from the map.
	 */
	js_cols.HashMap.prototype.clear = function() {
		this.map_ = {};
		this.count_ = 0;
		this.count_ = 0;
		this.version_ = 0;
	};

	/**
	 * Removes a key-value pair based on the key. This is O(logN) amortized due to
	 * updating the keys array whenever the count becomes half the size of the keys
	 * in the keys array.
	 * @param {*} key  The key to remove.
	 * @return {boolean} Whether object was removed.
	 */
	js_cols.HashMap.prototype.remove = function(key) {

		var hash = this.getHash_ (key);

		if (js_cols.HashMap.hasHash_(this.map_, hash)) {
			delete this.map_[hash];
			this.count_--;
			this.version_++;

			return true;
		}
		return false;
	};

	/**
	 * Helper method for removeAll
	 * @param {*} key the key used for ordering and location
	 * @param {*} element the value associated with the key
	 * @private
	 */
	js_cols.HashMap.prototype.removeSwapped = function(value, key){
		this.remove(key);

	}


	/**
	 * Returns the value for the given key.  If the key is not found and the default
	 * value is not given this will return {@code undefined}.
	 * @param {*} key The key to get the value for.
	 * @param {*=} opt_val The value to return if no value is found for the given
	 *     key, defaults to undefined.
	 * @return {*} The value for the given key.
	 */
	js_cols.HashMap.prototype.get = function(key, opt_val) {
		var hash = this.getHash_ (key);
		if (js_cols.HashMap.hasHash_(this.map_, hash)) {
			return this.map_[hash].value;
		}
		return opt_val;
	};


	/**
	 * Adds a key-value pair to the map.
	 * @param {*} key The key.
	 * @param {*} value The value to insert.
	 */
	js_cols.HashMap.prototype.insert = function(key, value) {

		var hash = this.getHash_ (key);

		if (!(js_cols.HashMap.hasHash_(this.map_, hash))) {
			this.count_++;
			// Only change the version if we add a new key.
			this.version_++;
		}
		var pair = {};
		pair.value = value;
		pair.key = key;
		this.map_[hash] = pair;

	};

	/**
	 * Helper method for insertAll
	 * @param {*} key the key used for ordering and location
	 * @param {*} element the value associated with the key
	 * @private
	 */
	js_cols.HashMap.prototype.insertSwapped = function(element, key){
		this.insert(key, element);
	}



	/**
	 * Inserts a collection of key/value pairs into the map
	 * If the collection has no notion of keys (i.e. an Array or Set) each element
	 * is inserted as both key and value (mapping to it self)
	 * @param {js_cols.Collection || Object || Array} col the collection to insert
	 * @public
	 */
	js_cols.HashMap.prototype.insertAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				this.insert(col[i],col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.insertSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function" && js_cols.typeOf(col.getKeys) == "function" ){
			var vals = col.getValues();
			var keys = col.getKeys();
			for (var i = 0; i < keys.length; i++){
				this.insert(keys[i], vals[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.insert(key, col[key]);
			}
		}
	}

	/**
	 * Removes a collection of key/value pairs into the map
	 * If the collection has no notion of keys (i.e. an Array or Set),
	 * the values in the collection are treated as keys in the map,
	 * and the values associated with those keys are removed.
	 * @param {js_cols.Collection || Array || Object} col the collection of values to remove
	 * @public
	 */
	js_cols.HashMap.prototype.removeAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				this.remove(col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.removeSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
			var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
				this.remove(arr[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.remove(col[key]);
			}
		}
	}

	/**
	 * Checks that all keys contained in the collection are also contained as keys in the map.
	 * If the collection has no notion of keys (i.e. an Array or a Set), the values of the collection
	 * will be interpreted as keys in this map.
	 * @param {js_cols.Collection || Array || Object} col the collection of values to check
	 * @return {Boolean}
	 * @public
	 */
	js_cols.HashMap.prototype.containsAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				if (!this.containsKey(col[i]))
				{ return false;
				};
			};
			return true;
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			return col.every(this.containsSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
			var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
				if (!this.containsKey(arr[i])){
					return false;
				};
			};
			return true;
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				if (!this.containsKey(key)){
					return false;
				};
			}
			return true;
		}
	};

	/**
	 * Clones a map and returns a new map.
	 * @return {!js_cols.HashMap} A new map with the same key-value pairs.
	 */
	js_cols.HashMap.prototype.clone = function() {
		return new js_cols.HashMap(this);
	};

	/**
	 * Calls a function on each key/value pair in the HashMap.
	 *
	 * @param {Function} f The function to call for each key/value pair. The function takes
	 *     three arguments: the value, the key, and the HashMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 */
	js_cols.HashMap.prototype.forEach = function(f, opt_obj) {
		for (var key in this.map_) {
			f.call(opt_obj, this.map_[key].value, this.map_[key].key, this);
		}
	};

	/**
	 * Calls a function on each key/value pair in the HashMap and returns true if any of
	 * those function calls returns a true-like value.
	 *
	 * @param {Function} f The function to call for each key/value pair. The function takes
	 *     three arguments: the value, the key and the HashMap, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for at least one key/value pair in the
	 *     HashMap.
	 */
	js_cols.HashMap.prototype.some = function(f, opt_obj) {
		for (var key in this.map_) {
			if (f.call(opt_obj, this.map_[key].value, this.map_[key].key, this)) {
				return true;
			}
		}
		return false;
	};


	/**
	 * Calls a function on each item in the HashMap and returns true only if every
	 * function call returns a true-like value.
	 *
	 * @param {Function} f The function to call for each key/value pair. The function takes
	 *     three arguments: the value, the key, and the HashMap, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for every item in the HashMap.
	 */
	js_cols.HashMap.prototype.every = function(f, opt_obj) {
		for (var key in this.map_) {
			if (!f.call(opt_obj, this.map_[key].value, this.map_[key].key, this)) {
				return false;
			}
		}
		return true;
	};

	/**
	 * Calls a function on each key/value pair in the HashMap and returns the results of
	 * those calls in an array.
	 *
	 * @param {!Function} f The function to call for each key/value pair. The function takes
	 *     three arguments: the value, the key, and the HashMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {!Array} The results of the function calls for each key/value pair in the
	 *     HashMap.
	 */
	js_cols.HashMap.prototype.map = function(f, opt_obj) {
		var rv = [];
		for (var key in this.map_) {
			rv.push(f.call(opt_obj, this.map_[key].value, this.map_[key].key, this));
		}
		return rv;
	};

	/**
	 * Calls a function on each key/value pair in the HashMap, if the function returns true, the key/value pair
	 * is inserted into a new HashMap that is returned when the map is fully traversed
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {js_cols.HashMap} a new map with the key / value pairs that evaluated to true in the function calls 
	 *     
	 */
	js_cols.HashMap.prototype.filter = function(f, opt_obj) {
		var rv = new js_cols.HashMap()
		for (var key in this.map_) {
			if (f.call(opt_obj, this.map_[key].value, this.map_[key].key, this)) {
				rv.insert(this.map_[key].key , this.map_[key].value);
			}
		}
		return rv;
	};

	/**
	 * Finds all key/value pairs that are present in both this map and the given collection.
	 * If the collection has no notion of keys (i.e. a Set or an Array), each element of the collection
	 * will be treated as key, and it will be inserted to the returned map with its corresponding value from this map.
	 * This operation is O(n).
	 * @param {js_cols.Collection || Object} col A collection.
	 * @return {js_cols.HashMap} A new set containing all the key/value pairs (primitives
	 *     or objects) present in both this set and the given collection.
	 */
	js_cols.HashMap.prototype.intersection = function(col) {

		var colCount = js_cols.getCount(col);

		if (!(col instanceof js_cols.HashMap) && colCount > 5) {
			// Convert to a js_cols.Set so that js_cols.contains runs in
			// O(1) time instead of O(n) time.
			var map = new js_cols.HashMap();
			map.insertAll(col);
			col = map;
		}
		var rv = new js_cols.HashMap();
		if (js_cols.typeOf(col.get) == 'function'){
			for (var key in this.map_) {
				if (col.get.call(col, this.map_[key].key) == this.map_[key].value) {
					rv.insert(this.map_[key].key, this.map_[key].value);
				}
			};
		}
		else{
			for (var key in this.map_) {
				if (js_cols.contains.call(col, col, this.map_[key].key)) {
					rv.insert(this.map_[key].key, this.map_[key].value);
				}
			}
		}
		return rv;
	};

	/**
	 * Detects wheter all key/value pairs present in this map are also present in the given collection.
	 * If the collection has no notion of keys (i.e. a Set or an Array), the result will be whether the keys 
	 * in this map is a subset of the elements in the collection.
	 * This operation is O(n).
	 * @param {js_cols.Collection || Object} col A collection.
	 * @return {Boolean} wheter this map is a submap of col
	 *     
	 */
	js_cols.HashMap.prototype.isSubmapOf = function(col) {

		var colCount = js_cols.getCount(col);
		if (this.getCount() > colCount) return false;
		if (!(col instanceof js_cols.HashMap) && colCount > 5) {
			// Convert to a js_cols.Set so that js_cols.contains runs in
			// O(1) time instead of O(n) time.
			var map = new js_cols.HashMap();
			map.insertAll(col);
			col = map;
		}
		var i = 0;
		if (js_cols.typeOf(col.get) == 'function'){
			for (var key in this.map_) {
				if (col.get.call(col, this.map_[key].key) == this.map_[key].value) {
					i++;
				}
			};
		}
		else{
			for (var key in this.map_) {
				if (js_cols.contains.call(col, col, this.map_[key].key)) {
					i++;
				}
			}
		}
		return i == this.getCount();
	};


	/**
	 * Returns a new map in which all the keys and values are interchanged
	 * (keys become values and values become keys). If multiple keys map to the
	 * same value, the chosen transposed value is implementation-dependent.
	 *
	 * It acts very similarly to {goog.object.transpose(Object)}.
	 *
	 * @return {!js_cols.HashMap} The transposed map.
	 */
	js_cols.HashMap.prototype.transpose = function() {
		var transposed = new js_cols.HashMap();
		for (var propertyName in this.map_) {
			var key = this.map_[propertyName].key;
			var value = this.map_[propertyName].value;
			transposed.insert(value, key);
		}

		return transposed;
	};


	/**
	 * generates a "hash code" for an object, i. e.
	 * retrieving the object´s js_cols Uid
	 *
	 * @param val {*} the object generate a hash code for
	 * @return {String} a hash code
	 * @private
	 */
	js_cols.HashMap.prototype.getHash_ = function(val) {
		var type = typeof val;
		if (type == 'object' && val || type == 'function') {
			return 'o' + js_cols.getUid(/** @type {Object} */ (val));
		} else {
			return type.substr(0, 1) + val;
		}
	};

	

/**
 * Safe way to test for hasOwnProperty.  It even allows testing for
 * 'hasOwnProperty'.
 * @param {Object} obj The object to test for presence of the given key.
 * @param {*} key The key to check for.
 * @return {boolean} Whether the object has the key.
 * @private
 */
js_cols.HashMap.hasHash_ = function(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
};

//Copyright 2010 Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//js_cols.provide('js_cols.HashMultiMap');
/**
 *
 *
 *
 *
 * This file contains an implementation of a Hash Mutli Map structure. 
 * A Mutli Map can contain more values for one key.
 * It is based on goog.structs.Map from 
 * the google closure library, but has been modified to accept any kind of 
 * objects as keys (not only Strings or Numbers). Hence, the functionality
 * is similar to that of java.util.HashMap.
 * WARNING: keys that are either Objects or Functions will be modified, a property named something like "js_cols_uid_2kczq5"
 * will be added. This liberates the user of implementing a getHashCode function, and
 * improves performance as hashing collisions are avoided.
 * The assymptotic running time for important operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - clear                  O(1)
 * - clone                  O(n logn)
 * - contains               O(1)
 * - containsAll            O(m) m is the cardinality of the supplied collection
 * - every                  O(n * O(f)) f is the function supplied as argument
 * - filter                 O(n * O(f)) f is the function supplied as argument
 * - forEach                O(n * O(f)) f is the function supplied as argument
 * - get                    O(1)
 * - getValues              O(n)
 * - insert                 O(1)
 * - insertAll              O(m) m is the cardinality of the supplied collection
 * - map                    O(n * O(f)) f is the function supplied as argument
 * - remove                 O(1)
 * - removeAll              O(m logn) m is the cardinality of the supplied collection
 * - some                   O(n * O(f)) f is the function supplied as argument
 * - contains               O(n * O(f)) f is the function supplied as argument
 * </pre>
* @param {*=} opt_map Map or Object to initialize the map with.
 * @param {...*} var_args If 2 or more arguments are present then they
 *     will be used as key-value pairs.
 * @constructor
 */
js_cols.HashMultiMap = function(opt_map, var_args) {

	/**
	 * Underlying JS object used to implement the map.
	 * @type {!Object}
	 * @private
	 */
	this.map_ = {};


	var argLength = arguments.length;
	
	 if (argLength > 1) {
    if (argLength % 2) {
      throw Error('Uneven number of arguments');
    }
    for (var i = 0; i < argLength; i += 2) {
      this.insert(arguments[i], arguments[i + 1]);
    }
  } else if (opt_map) {
    this.insertAll(/** @type {Object} */ (opt_map));
  }
};

	/**
	 * The number of key value pairs in the map.
	 * @private
	 * @type {number}
	 */
	js_cols.HashMultiMap.prototype.count_ = 0;


	

	/**
	 * @return {number} The number of key-value pairs in the map.
	 */
	js_cols.HashMultiMap.prototype.getCount = function() {
		return this.count_;
	};


	/**
	 * Returns the values of the map.
	 * @return {!Array} The values in the map.
	 */
	js_cols.HashMultiMap.prototype.getValues = function() {

		var rv = [];
		for (var propertyName in this.map_) {
			var node = this.map_[propertyName];
			while (node){
				rv.push(node.value);
				node = node.next;
			}
		}
		return rv;
	};

	/**
	 * Returns the keys of the map.
	 * @return {!Array} Array of key values.
	 */
	js_cols.HashMultiMap.prototype.getKeys = function() {

		var rv = [];
		for (var propertyName in this.map_) {
			var node = this.map_[propertyName];
			while (node){
				rv.push(node.key);
				node = node.next;
			}
		}
		return rv;
	};



	/**
	 * Whether the map contains the given key.
	 * @param {*} key The key to check for.
	 * @return {Integer} Number of values for the key.
	 */
	js_cols.HashMultiMap.prototype.containsKey = function(key) {

		var hash = this.getHash_ (key);
		if (js_cols.HashMultiMap.hasHash_(this.map_, hash)){
			return this.getAllValuesForKey(key).length;
		}
		return 0;
	};

	/**
	 * This operation is identical to containsKey
	 * Whether the map contains the given key.
	 * @param {*} key The key to check for.
	 * @return {boolean} Whether the map contains the key.
	 */
	js_cols.HashMultiMap.prototype.contains = function(key) {

		return this.containsKey(key);
	};

	/**
	 * Whether the map contains the given key.
	 * @param {*} key The key to check for.
	 * @return {boolean} Whether the map contains the key.
	 * @private
	 */
	js_cols.HashMultiMap.prototype.containsSwapped = function(value, key){
		return this.containsKey(key);
	}


	/**
	 * Whether the map contains the given value. This is O(n).
	 * @param {*} val The value to check for.
	 * @return {boolean} Whether the map contains the value.
	 */
	js_cols.HashMultiMap.prototype.containsValue = function(val) {
		for (var propertyName in this.map_) {
			if (this.map_[propertyName].value == val) {
				return true;
			}
		}
		return false;
	};


	/**
	 * Whether this map is equal to the argument map.
	 * @param {js_cols.HashMap} otherMap The map against which to test equality.
	 * @param {function(*, *) : boolean=} opt_equalityFn Optional equality function
	 *     to test equality of values. If not specified, this will test whether
	 *     the values contained in each map are identical objects.
	 * @return {boolean} Whether the maps are equal.
	 */
	js_cols.HashMultiMap.prototype.equals = function(otherMap, opt_equalityFn) {
		if (!(otherMap instanceof js_cols.HashMultiMap)) {
		return false;
		}
		if (this === otherMap) {
			return true;
		}
		if (this.count_ != otherMap.getCount()) {
			return false;
		}

		var equalityFn = (js_cols.typeOf(opt_equalityFn) == 'function') ? opt_equalityFn : this.defaultEquals;

		for (var propertyName in this.map_) {
			var key = this.map_[propertyName].key;
			thisVals = this.getAllValuesForKey(key);
			otherVals = otherMap.getAllValuesForKey(key);
			if (thisVals.length != otherVals.length) return false;
			for (var i = 0; i < thisVals.length; i++){
			if (!equalityFn(thisVals[i], otherVals[i])) {
				return false;
			}
			
			}
		}

		return true;
	};


	/**
	 * Default equality test for values.
	 * @param {*} a The first value.
	 * @param {*} b The second value.
	 * @return {boolean} Whether a and b reference the same object.
	 */
	js_cols.HashMultiMap.prototype.defaultEquals = function(a, b) {
		return a === b;
	};


	/**
	 * @return {boolean} Whether the map is empty.
	 */
	js_cols.HashMultiMap.prototype.isEmpty = function() {
		return this.count_ == 0;
	};


	/**
	 * Removes all key-value pairs from the map.
	 */
	js_cols.HashMultiMap.prototype.clear = function() {
		this.map_ = {};
		this.count_ = 0;
		this.count_ = 0;
		
	};

	/**
	 * Removes a key-value pair based on the key. If more than
	 * one entry for the key are present in the map, the most
	 * recently inserted will be removed
	 * @param {*} key  The key to remove.
	 * @return {boolean} Whether object was removed.
	 */
	js_cols.HashMultiMap.prototype.remove = function(key) {

		var hash = this.getHash_ (key);

		if (js_cols.HashMultiMap.hasHash_(this.map_, hash)) {
			var node = this.map_[hash];
			if (node.next){
				this.map_[hash] = node.next;
			}
			else{
				delete this.map_[hash];
				
			}
			this.count_--;


			return true;
		}
		return false;
	};

	/**
	 * Removes all values associated with the key. 
	 * @param {*} key  The key to remove.
	 * @return {boolean} Whether one or more objects were removed.
	 */
	js_cols.HashMultiMap.prototype.removeAllValuesForKey = function(key) {

		var removed = this.remove(key);
		var res = removed;
		while (removed){
			removed = this.remove(key);
		}
		return res;

	};




	/**
	 * Returns the most recently inserted value for the given key.  If the key is not found and the default
	 * value is not given this will return {@code undefined}.
	 * @param {*} key The key to get the value for.
	 * @param {*=} opt_val The value to return if no item is found for the given
	 *     key, defaults to undefined.
	 * @return {*} The value for the given key.
	 */
	js_cols.HashMultiMap.prototype.get = function(key, opt_val) {
		var hash = this.getHash_ (key);

		if (js_cols.HashMultiMap.hasHash_(this.map_, hash)) {
			return this.map_[hash].value;
		}
		return opt_val;
	};

	/**
	 * Returns all values for the given key in an Array.  If the key is not found and the default
	 * value is not given this will return {@code undefined}.
	 * @param {*} key The key to get the values for.
	 * @param {*=} opt_val The value to return if no item is found for the given
	 *     key, defaults to undefined.
	 * @return {Array} The values for the given key.
	 */
	js_cols.HashMultiMap.prototype.getAllValuesForKey = function(key, opt_val) {
		var hash = this.getHash_ (key);
		var rv = [];
		if (js_cols.HashMultiMap.hasHash_(this.map_, hash)) {
			var node = this.map_[hash];
			while (node){
				rv.push(node.value);
				node = node.next;

			}
			return rv;
		}
		return opt_val;
	};




	/**
	 * Adds a key-value pair to the map.
	 * @param {*} key The key.
	 * @param {*} value The value to add.
	 */
	js_cols.HashMultiMap.prototype.insert = function(key, value) {

		var hash = this.getHash_ (key);

		if ((js_cols.HashMultiMap.hasHash_(this.map_, hash))) {

			var node = this.map_[hash];
			this.map_[hash]= {
					key : key,
					value : value,
					next : node
			}

		}
		else {	 
			this.map_[hash]= {
					key : key,
					value : value
			}
			
		}

		this.count_++;



	};

	/**
	 * Helper method for insertAll
	 * @param {*} key the key used for ordering and location
	 * @param {*} value the value associated with the key
	 * @private
	 */
	js_cols.HashMultiMap.prototype.insertSwapped = function(value, key){
		this.insert(key, value);
	}

	/**
	 * Associates all ellements of the values Array to the key in this map.
	 * @param {*} key The key.
	 * @param {Array} values The values to add.
	 */
	js_cols.HashMultiMap.prototype.insertValuesForKey = function(key, values) {

		for (var i = 0; i < values.length; i ++){
			this.insert (key, values[i]);
		}
	};



	js_cols.HashMultiMap.prototype.insertAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				this.insert(col[i],col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.insertSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function" && js_cols.typeOf(col.getKeys) == "function" ){
			var vals = col.getValues();
			var keys = col.getKeys();
			for (var i = 0; i < keys.length; i++){
				this.insert(keys[i], vals[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.insert(key, col[key]);
			}
		}
	}

	/**
	 * Removes a all values contained in the collection from the tree
	 * If the collection has no notion of keys (i.e. an Array or a Set), the values of the collection will be
	 * treated as keys in this map.
	 * @param {js_cols.Collection || Array || Object} col the collection of values to remove
	 * @public
	 */
	js_cols.HashMultiMap.prototype.removeAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				this.removeAllValuesForKey(col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.removeAllValuesForKey, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
			var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
				this.removeAllValuesForKey(arr[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.removeAllValuesForKey(col[key]);
			}
		}
	}

	/**
	 * Checks that all values contained in the collection are also contained as keys in the tree
	 * @param {js_cols.Collection || Array || Object} col the collection of values to check
	 * @return {Boolean}
	 * @public
	 */
	js_cols.HashMultiMap.prototype.containsAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				if (!this.containsKey(col[i]))
				{ return false;
				};
			};
			return true;
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			return col.every(this.containsSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
			var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
				if (!this.containsKey(arr[i])){
					return false;
				};
			};
			return true;
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				if (!this.contains(key)){
					return false;
				};
			}
			return true;
		}
	}
	/**
	 * Calls a function on each item in the HashMultiMap.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashMultiMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 */
	js_cols.HashMultiMap.prototype.forEach = function(f, opt_obj) {
		for (var key in this.map_) {
			var node = this.map_[key];
			while (node){
				f.call(opt_obj, node.value, node.key, this);
				node = node.next;
			}
		}
	};

	/**
	 * Calls a function on each item in the HashMultiMap and returns true if any of
	 * those function calls returns a true-like value.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key and the HashMultiMap, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for at least one item in the
	 *     RedBlackSet.
	 */
	js_cols.HashMultiMap.prototype.some = function(f, opt_obj) {
		for (var key in this.map_) {
			var node = this.map_[key];
			while (node){
				if (f.call(opt_obj, node.value, node.key, this)) {
					return true;
				}
				node = node.next;
			}
		}
		return false;
	};


	/**
	 * Calls a function on each item in the HashMultiMap and returns true only if every
	 * function call returns a true-like value.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashMultiMap, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for every item in the HashMultiMap.
	 */
	js_cols.HashMultiMap.prototype.every = function(f, opt_obj) {
		for (var key in this.map_) {
			var node = this.map_[key];
			while (node){
				if (!f.call(opt_obj, node.value, node.key, this)) {
					return false;
				}
				node = node.next;
			}
		}
		return true;
	};

	/**
	 * Calls a function on each item in the HashMultiMap and returns the results of
	 * those calls in an array.
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashMultiMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {!Array} The results of the function calls for each item in the
	 *     HashMultiMap.
	 */
	js_cols.HashMultiMap.prototype.map = function(f, opt_obj) {
		var rv = [];
		for (var key in this.map_) {
			var node = this.map_[key];
			while (node){
				rv.push(f.call(opt_obj, node.value, node.key, this));
				node = node.next;
			}
		} 
		return rv;
	};

		/**
	 * Calls a function on each item in the HashMultiMap, if the function returns true, the key/value pair
	 * is inserted into an object that is returned when the tree is fully traversed
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashMultiMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {js_cols.HashMultiMap} a new multi map with the key / value pairs that evaluated to true in the function calls 
	 *    
	 */
	js_cols.HashMultiMap.prototype.filter = function(f, opt_obj) {
		var rv = new js_cols.HashMultiMap();
		for (var key in this.map_) {
			var node = this.map_[key];
			while (node){
				if (f.call(opt_obj, node.value, node.key, this)) {
					rv.insert(node.key, node.value);
				}
				node = node.next;
			}
		}
		return rv;
	};

	

	/**
	 * Clones a multi map and returns a new multi map.
	 * @return {!js_cols.HashMultiMap} A new map with the same key-value pairs.
	 */

	js_cols.HashMultiMap.prototype.clone = function() {
		return new js_cols.HashMultiMap(this);
	};


	/**
	 * generates a "hash code" for an object, i. e.
	 * retrieving the object´s js_cols Uid
	 *
	 * @param val {*} the object generate a hash code for
	 * @return {String} a hash code
	 * @private
	 */
	js_cols.HashMultiMap.prototype.getHash_ = function(val) {
		var type = typeof val;
		if (type == 'object' && val || type == 'function') {
			return 'o' + js_cols.getUid(/** @type {Object} */ (val));
		} else {
			return type.substr(0, 1) + val;
		}
	};

		

/**
 * Safe way to test for hasOwnProperty.  It even allows testing for
 * 'hasOwnProperty'.
 * @param {Object} obj The object to test for presence of the given key.
 * @param {*} key The key to check for.
 * @return {boolean} Whether the object has the key.
 * @private
 */
js_cols.HashMultiMap.hasHash_ = function(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
};

//Copyright Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

//js_cols.require('js_cols.HashMultiMap');
//js_cols.provide('js_cols.HashBag');

/**
 * 
 *
 * This file contains an implementation of a Hash Bag structure. 
 * It is based on goog.structs.Set from 
 * the google closure library.
 * The assymptotic running time for important operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - clear                  O(1)
 * - clone                  O(n logn)
 * - contains               O(1)
 * - containsAll            O(m) m is the cardinality of the supplied collection
 * - every                  O(n * O(f)) f is the function supplied as argument
 * - filter                 O(n * O(f)) f is the function supplied as argument
 * - forEach                O(n * O(f)) f is the function supplied as argument
 * - getValues              O(n)
 * - insert                 O(1)
 * - insertAll              O(m) m is the cardinality of the supplied collection
 * - map                    O(n * O(f)) f is the function supplied as argument
 * - remove                 O(1)
 * - removeAll              O(m logn) m is the cardinality of the supplied collection
 * - some                   O(n * O(f)) f is the function supplied as argument
 * - contains               O(n * O(f)) f is the function supplied as argument
 * </pre>
 *
 * This class implements a multi set data structure. Adding and removing is O(1). It
 * supports both object and primitive values. Be careful because you can add
 * both 1 and new Number(1), because these are not the same. You can even add
 * multiple new Number(1) because these are not equal.
 *
 * A set that can contain both primitives and objects.  Adding and removing
 * elements is O(1).  Primitives are treated as identical if they have the same
 * type and convert to the same string.  Objects are treated as identical only
 * if they are references to the same object.  WARNING: A js_cols.Set can
 * contain both 1 and (new Number(1)), because they are not the same.  WARNING:
 * Adding (new Number(1)) twice will yield two distinct elements, because they
 * are two different objects.  WARNING: Any object that is added to a
 * js_cols.Set will be modified!  Because js_cols.getUid() is used to
 * identify objects, every object in the set will be mutated.
 * This liberates the user of implementing a getHashCode function, and
 * improves performance as hashing collisions are avoided.
 * @param {*=} opt_map Map or Object to initialize the map with.
 * @param {...*} var_args If 2 or more arguments are present then they
 *     will be used as key-value pairs.
 * @constructor
 */

js_cols.HashBag = function(opt_map, opt_values) {
	this.map_ = new js_cols.HashMultiMap();
	var argLength = arguments.length;
	 if (argLength > 1) {
    if (argLength % 2) {
      throw Error('Uneven number of arguments');
    }
    for (var i = 0; i < argLength; i += 2) {
      this.insert(arguments[i], arguments[i + 1]);
    }
  } else if (opt_map) {
    this.insertAll(/** @type {Object} */ (opt_map));
  }
};


	/**
	 * Add a primitive or an object to the set.
	 * @param {*} element The primitive or object to add.
	 */
	js_cols.HashBag.prototype.insert = function(element) {
		this.map_.insert(element, element);
	};


	/**
	 * Adds all the values in the given collection to this set.
	 * @param {Array|Object} col A collection containing the elements to add.
	 */
	js_cols.HashBag.prototype.insertAll = function(col) {
		this.map_.insertAll(col);
	};


	/**
	 * @return {number} The number of elements in the set.
	 */
	js_cols.HashBag.prototype.getCount = function() {
		return this.map_.getCount();
	};




	/**
	 * Removes all values in the given collection from this Bag.
	 * If the collection has a notion of keys (a Map), the keys will be
	 * treated as values in this set.
	 * @param {Array|Object} col A collection containing the elements to remove.
	 */
	js_cols.HashBag.prototype.removeAll = function(col) {
		this.map_.removeAll(col);
	};



	/**
	 * Removes the given element from this set.
	 * @param {*} element The primitive or object to remove.
	 * @return {boolean} Whether the element was found and removed.
	 */
	js_cols.HashBag.prototype.remove = function(element) {
		return this.map_.remove(element);
	};


	/**
	 * Removes all elements from this set.
	 */
	js_cols.HashBag.prototype.clear = function() {
		this.map_.clear();
	};


	/**
	 * Tests whether this set is empty.
	 * @return {boolean} True if there are no elements in this set.
	 */
	js_cols.HashBag.prototype.isEmpty = function() {
		return this.map_.isEmpty();
	};


	/**
	 * Tests whether this set contains the given element.
	 * @param {*} element The primitive or object to test for.
	 * @return {Number} Number entries of the given element.
	 */
	js_cols.HashBag.prototype.contains = function(element) {
		return this.map_.containsKey(element);
	};


	/**
	 * Tests whether this set contains all the values in a given collection.
	 * Repeated elements in the collection are ignored, e.g.  (new
	 * js_cols.Set([1, 2])).containsAll([1, 1]) is True.
	 * @param {Object} col A collection-like object.
	 * @return {boolean} True if the set contains all elements.
	 */
	js_cols.HashBag.prototype.containsAll = function(col) {
		return this.map_.containsAll(col);
	};

	/**
	 * Finds all values that are present in both this bag and the given collection.
	 * NOTICE: intersection with bags does not deal with multiple entries of the same element.
	 * Example: intersection of HashBags [ 1, 2, 3, 3, 3, 4, 5] and [ 1, 2, 3, 3, 4, 5] would be [1, 2, 3, 4, 5]
	 * @param {js_cols.Collection || Object} col A collection.
	 * @return {js_cols.HashBag} A new set containing all the key/value pairs (primitives
	 *     or objects) present in both this set and the given collection.
	 */
	js_cols.HashBag.prototype.intersection = function(col) {
	
		
		var colCount = js_cols.getCount(col);

		if (!(col instanceof js_cols.HashBag) && colCount > 5) {
			// Convert to a js_cols.Set so that js_cols.contains runs in
			// O(1) time instead of O(n) time.
			var map = new js_cols.HashBag();
			map.insertAll(col);
			col = map;
		}
		var rv = new js_cols.HashBag();
	
	
			for (var hash in this.map_.map_) {
				if (js_cols.contains.call(col, col, this.map_.map_[hash].key)) {
					rv.insert(this.map_.map_[hash].value);
				}
			}
		
		return rv;
	};

	/**
	 * Detects wheter all values present in this bag are also present in the given collection.
	 * NOTICE: this operation does not deal with multiple entries of the same element.
	 * Example: the HashBag [ 1, 2, 3, 3, 3, 4, 5] would be a subset of the HashBag [ 1, 2, 3, 3, 4, 5]
	 * @param {js_cols.Collection || Object} col A collection.
	 * @return {Boolean} wheter this map is a submap of col
	 *     
	 */
	js_cols.HashBag.prototype.isSubsetOf = function(col) {
		
		
		var colCount = js_cols.getCount(col);
		if (this.getCount() > colCount) return false;
		if (!(col instanceof js_cols.HashBag) && colCount > 5) {
			// Convert to a goog.js_cols.Set so that goog.structs.contains runs in
			// O(1) time instead of O(n) time.
			col = new js_cols.HashBag(col);
		}
	
			var f = function (val){
			  return js_cols.contains.call(col, col, val)
			};
			return this.every(f);
				
	};


	/**
	 * Returns an array containing all the elements in this set.
	 * @return {Array} An array containing all the elements in this set.
	 */
	js_cols.HashBag.prototype.getValues = function() {
		return this.map_.getValues();
	};


	/**
	 * Creates a shallow clone of this set.
	 * @return {js_cols.Set} A new set containing all the same elements as
	 *     this set.
	 */
	js_cols.HashBag.prototype.clone = function() {
	return new js_cols.HashBag( this);
		
	};

	/**
	 * Calls a function on each item in the HashBag.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashBag.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 */
	js_cols.HashBag.prototype.forEach = function(f, opt_obj) {
		this.map_.forEach(f, opt_obj);
	};

	/**
	 * Calls a function on each item in the HashBag and returns true if any of
	 * those function calls returns a true-like value.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key and the HashBag, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for at least one item in the
	 *     RedBlackSet.
	 */
	js_cols.HashBag.prototype.some = function(f, opt_obj) {
		return this.map_.some(f, opt_obj);
	};


	/**
	 * Calls a function on each item in the HashBag and returns true only if every
	 * function call returns a true-like value.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashBag, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for every item in the HashBag.
	 */
	js_cols.HashBag.prototype.every = function(f, opt_obj) {
		return this.map_.every(f, opt_obj);
	};
	
	/**
	 * Calls a function on each element in the HashSet, if the function returns true, the element
	 * is inserted into an Array that is returned when the tree is fully traversed
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashSet.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {Array} The elements that evaluated to true in the function calls 
	 *    
	 */
	js_cols.HashBag.prototype.filter = function(f, opt_obj) {
		return new this.map_.filter(f, opt_obj).getValues();;
	};
	
		/**
	 * Calls a function on each item in the HashSet and returns the results of
	 * those calls in an array.
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the ABTreeMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {!Array} The results of the function calls for each item in the
	 *     HashSet.
	 */
	js_cols.HashBag.prototype.map = function(f, opt_obj) {
		return this.map_.map(f, opt_obj);
	};



	/**
	 * Tests whether the given collection consists of the same elements as this set,
	 * regardless of order, without repetition.  Primitives are treated as equal if
	 * they have the same type and convert to the same string; objects are treated
	 * as equal if they are references to the same object.  This operation is O(n).
	 * @param {Object} col A collection.
	 * @return {boolean} True if the given collection consists of the same elements
	 *     as this set, regardless of order, without repetition.
	 */
	js_cols.HashBag.prototype.equals = function(col) {
		if (!(col instanceof js_cols.HashBag)) {
		return false;
		}
		return this.map_.equals(col.map_);
	};



//Copyright Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

//js_cols.require('js_cols.HashMap');
//js_cols.provide('js_cols.HashSet');

/**
 * 
 *
 * This file contains an implementation of a Hash Set structure. 
 * It is based on goog.structs.Set from 
 * the google closure library.
 * The assymptotic running time for important operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - clear                  O(1)
 * - clone                  O(n logn)
 * - contains               O(1)
 * - containsAll            O(m) m is the cardinality of the supplied collection
 * - every                  O(n * O(f)) f is the function supplied as argument
 * - filter                 O(n * O(f)) f is the function supplied as argument
 * - forEach                O(n * O(f)) f is the function supplied as argument
 * - getValues              O(n)
 * - insert                 O(1)
 * - insertAll              O(m) m is the cardinality of the supplied collection
 * - map                    O(n * O(f)) f is the function supplied as argument
 * - remove                 O(1)
 * - removeAll              O(m logn) m is the cardinality of the supplied collection
 * - some                   O(n * O(f)) f is the function supplied as argument
 * - contains               O(n * O(f)) f is the function supplied as argument
 * </pre>
 *
 * This class implements a set data structure. Inserting and removing is O(1). It
 * supports both object and primitive values. Be careful because you can insert
 * both 1 and new Number(1), because these are not the same. You can even insert
 * multiple new Number(1) because these are not equal.
 *
 * A set that can contain both primitives and objects.  Inserting and removing
 * elements is O(1).  Primitives are treated as identical if they have the same
 * type and convert to the same string.  Objects are treated as identical only
 * if they are references to the same object.  WARNING: A js_cols.Set can
 * contain both 1 and (new Number(1)), because they are not the same.  WARNING:
 * inserting (new Number(1)) twice will yield two distinct elements, because they
 * are two different objects.  WARNING: Any object that is inserted to a
 * js_cols.Set will be modified!  Because js_cols.getUid() is used to
 * identify objects, every object in the set will be mutated.
 * This liberates the user of implementing a getHashCode function, and
 * improves performance as hashing collisions are avoided.
 * @param {Array|Object=} opt_values Initial values to start with.
 * @constructor
 */

js_cols.HashSet = function(opt_values) {
	this.map_ = new js_cols.HashMap;
	
	if (opt_values) this.insertAll(opt_values);

};
	/**
	 * insert a primitive or an object to the set.
	 * @param {*} element The primitive or object to insert.
	 */
	js_cols.HashSet.prototype.insert = function(element) {
		this.map_.insert(element, element);
	};

	/**
	 * inserts all the values in the given collection to this set.
	 * @param {Array|Object} col A collection containing the elements to insert.
	 */
	js_cols.HashSet.prototype.insertAll = function(col) {
		this.map_.insertAll(col);
	};


	/**
	 * 
	 * @return {number} The number of elements in the set.
	 */
	js_cols.HashSet.prototype.getCount = function() {
		return this.map_.getCount();
	};


	/**
	 * Removes all values in the given collection from this set.
	 * If the collection has a notion of keys (a Map), the keys will be
	 * treated as values in this set.
	 * @param {Array|Object} col A collection containing the elements to remove.
	 */
	js_cols.HashSet.prototype.removeAll = function(col) {
		this.map_.removeAll(col);
	};


	/**
	 * Removes the given element from this set.
	 * @param {*} element The primitive or object to remove.
	 * @return {boolean} Whether the element was found and removed.
	 */
	js_cols.HashSet.prototype.remove = function(element) {
		return this.map_.remove(element);
	};



	/**
	 * Removes all elements from this set.
	 */
	js_cols.HashSet.prototype.clear = function() {
		this.map_.clear();
	};


	/**
	 * Tests whether this set is empty.
	 * @return {boolean} True if there are no elements in this set.
	 */
	js_cols.HashSet.prototype.isEmpty = function() {
		return this.map_.isEmpty();
	};


	/**
	 * Tests whether this set contains the given element.
	 * @param {*} element The primitive or object to test for.
	 * @return {boolean} True if this set contains the given element.
	 */
	js_cols.HashSet.prototype.contains = function(element) {
		return this.map_.containsKey(element);
	};


	/**
	 * Tests whether this set contains all the values in a given collection.
	 * Checks that all keys contained in the collection are also contained as keys in the map.
	 * If the collection has a notion of keys (a Map), the keys of the collection
	 * will be interpreted as values in this set.
	 * Repeated elements in the collection are ignored, e.g.  (new
	 * js_cols.Set([1, 2])).containsAll([1, 1]) is True.
	 * @param {Object} col A collection-like object.
	 * @return {boolean} True if the set contains all elements.
	 */
	js_cols.HashSet.prototype.containsAll = function(col) {
		return this.map_.containsAll(col);
	};


	/**
	 * Finds all values that are present in both this set and the given collection.
	 * WARNING: This operation is not guaranteed to work correctly if col is a Map.
	 * This operation is O(n).
	 * @param {js_cols.Set|Array|Object} col A collection.
	 * @return {js_cols.Set} A new set containing all the values (primitives
	 *     or objects) present in both this set and the given collection.
	 */
	js_cols.HashSet.prototype.intersection = function(col) {
		return this.map_.intersection(col);
	};


	/**
	 * Returns an array containing all the elements in this set.
	 * @return {Array} An array containing all the elements in this set.
	 */
	js_cols.HashSet.prototype.getValues = function() {
		return this.map_.getValues();
	};


	/**
	 * Creates a shallow clone of this set.
	 * @return {js_cols.Set} A new set containing all the same elements as
	 *     this set.
	 */
	js_cols.HashSet.prototype.clone = function() {
		return new js_cols.HashSet(this);
	};

	/**
	 * Calls a function on each item in the HashSet.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashSet.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 */
	js_cols.HashSet.prototype.forEach = function(f, opt_obj) {
		this.map_.forEach(f, opt_obj);
	};

	/**
	 * Calls a function on each item in the HashSet and returns true if any of
	 * those function calls returns a true-like value.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key and the HashSet, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for at least one item in the
	 *     RedBlackSet.
	 */
	js_cols.HashSet.prototype.some = function(f, opt_obj) {
		return this.map_.some(f, opt_obj);
	};


	/**
	 * Calls a function on each item in the HashSet and returns true only if every
	 * function call returns a true-like value.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashSet, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for every item in the HashSet.
	 */
	js_cols.HashSet.prototype.every = function(f, opt_obj) {
		return this.map_.every(f, opt_obj);
	};

	/**
	 * Calls a function on each item in the HashSet and returns the results of
	 * those calls in an array.
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the ABTreeMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {!Array} The results of the function calls for each item in the
	 *     HashSet.
	 */
	js_cols.HashSet.prototype.map = function(f, opt_obj) {
		return this.map_.map(f, opt_obj);
	};

/**
	 * Calls a function on each element in the HashSet, if the function returns true, the element
	 * is inserted into an Array that is returned when the tree is fully traversed
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the HashSet.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {Array} The elements that evaluated to true in the function calls 
	 *    
	 */
	js_cols.HashSet.prototype.filter = function(f, opt_obj) {
		return new this.map_.filter(f, opt_obj).getValues();;
	};


	/**
	 * Tests whether the given collection consists of the same elements as this set,
	 * regardless of order, without repetition.  Primitives are treated as equal if
	 * they have the same type and convert to the same string; objects are treated
	 * as equal if they are references to the same object.  This operation is O(n).
	 * @param {Object} col A collection.
	 * @return {boolean} True if the given collection consists of the same elements
	 *     as this set, regardless of order, without repetition.
	 */
	js_cols.HashSet.prototype.equals = function(col) {
		return this.getCount() == js_cols.getCount(col) && this.isSubsetOf(col);
	};


	/**
	 * Tests whether the given collection contains all the elements in this set.
	 * WARNING: This operation is not guaranteed to work correctly if col is a Map.
	 * Primitives are treated as equal if they have the same type and convert to the
	 * same string; objects are treated as equal if they are references to the same
	 * object.  This operation is O(n).
	 * @param {Object} col A collection.
	 * @return {boolean} True if this set is a subset of the given collection.
	 */
	js_cols.HashSet.prototype.isSubsetOf = function(col) {
		return this.map_.isSubmapOf(col);
	};

//Copyright Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.


/**
 * 
 *
 *
 * js_cols.IntervalHeap is a double-ended Priority Queue, based on a Binary Heap.
 * This allows deleteMin and deleteMax in at O(logn) running time, and also efficiently
 * keeps track of the current interval contained in the queue.
 * This IntervalHeap is addressable, i.e. a handle is returned when inserting an element.
 * The handles are used for efficient remove and change key operations, both in time O(logn).
 * Algorithms are adaptations of those in J. van Leeuwen and
 * D. Wood <I>Interval Heaps</I>.<p>
 * The big-O notation for all operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - changeKey              O(logn)
 * - clear                  O(1)
 * - clone                  O(n)
 * - deleteMin              O(logn)
 * - deleteMax              O(logn)
 * - getKeys                O(n)
 * - getValues              O(n)
 * - insert                 O(logn)
 * - insertAll              O(n logn)
 * - max                    O(1)
 * - min                    O(1)
 * - remove                 O(logn)                  
 * </pre>
 *
 * @param {Function=} compare_func an optional compare function to compare the keys. This function should
 * take two values, a and b, and return x where:
 * <pre>
 *  x < 0 if a < b,
 *  x > 0 if a > b,
 *  x = 0 otherwise
 * </pre>
 * if not defined, a default compare function for <tt>numbers</tt> will be used
 * @constructor
 * @public
 */

js_cols.IntervalHeap = function(compare_func){

	this.heap = [];

	this.n = 0;
	
	this.count = 0;
	
	/**
	 * Comparison function used to compare values in the tree. This function should
	 * take two values, a and b, and return x where:
	 * <pre>
	 *  x < 0 if a < b,
	 *  x > 0 if a > b,
	 *  x = 0 otherwise
	 * </pre>
	 *
	 * @type {Function}
	 * @private
	 */
	this.compare = compare_func || this.default_compare;
	
	};
	
	/**
	 * Returns the number of key/value pairs in the Priorityqueue
	 * @return {number} 
	 * @public
	 */
	js_cols.IntervalHeap.prototype.getCount = function(){
	return this.count;
	};
	
	/**
	 * Removes all key/value pairs from the heap
	 * @public
	 */
	js_cols.IntervalHeap.prototype.clear = function(){
	this.heap = [];
	this.count =0;
	this.n = 0;
	};
	
	/**
	 * Returns true if theres zero key/ value pairs in the heap
	 * @return {boolean}
	 * @public
	 */
	js_cols.IntervalHeap.prototype.isEmpty = function(){
		return this.getCount() ==0;
	};
	
	/**
	 * Returns a shallow clone of this heap
	 * @return {js_cols.IntervalHeap}
	 * @public
	 */
	js_cols.IntervalHeap.prototype.clone = function(){
		var retval = new js_cols.IntervalHeap(this.compare);
		if (this.isEmpty()) return retval;
		var arr = [];
		var j = Math.floor(this.getCount()/2);
		for (var i =1; i<= j; i++){
			if(this.heap[i]){
			arr[i] = {
				"left": {},
				"right":{}
			};
			arr[i].left.key = this.heap[i].left.key;
			arr[i].left.value = this.heap[i].left.value;
			
			arr[i].right.key = this.heap[i].right.key;
			arr[i].right.value = this.heap[i].right.value;
			
		};
		};
		j++;
		
		if (this.heap[j]){
		arr[j] = {
				"left": {}			
			};
		arr[j].left.key = this.heap[j].left.key;
		arr[j].left.value = this.heap[j].left.value;
		}
		retval.heap = arr;
		retval.n = this.n;
		retval.count = this.count;
		return retval;
	};
	
	/**
	 * Returns an array with the keys of this heap.
	 * NOTICE: The returned array is unordered
	 * @return {Array}
	 * @public
	 */
	js_cols.IntervalHeap.prototype.getKeys = function(){
		var retval = []
		if (this.isEmpty()) return retval;
		var j = Math.floor(this.getCount()/2);
		for (var i =1; i<= j; i++){
			if(this.heap[i]){
			retval.push(this.heap[i].left.key);
			
			retval.push(this.heap[i].right.key);
			
		};
		};
		j++;
		
		if (this.heap[j]){
		retval.push(this.heap[j].left.key);
		}
		
		return retval;
	};
	
	/**
	 * Returns an array with the values of this heap.
	 * NOTICE: The returned array is unordered
	 * @return {Array}
	 * @public
	 */
	js_cols.IntervalHeap.prototype.getValues = function(){
		var retval = []
		if (this.isEmpty()) return retval;
		var j = Math.floor(this.getCount()/2);
		for (var i =1; i<= j; i++){
			if(this.heap[i]){
			retval.push(this.heap[i].left.value);
			
			retval.push(this.heap[i].right.value);
			
		};
		};
		j++;
		if (this.heap[j]){
		retval.push(this.heap[j].left.value);
		}
		
		return retval;
	};
	
	/**
	 * Inserts a collection of key/value pairs into the map
	 * If the collection has no notion of keys (i.e. an Array or Set) each element
	 * is inserted as both key and value (mapping to it self)
	 * @param {js_cols.Collection || Object || Array} col the collection to insert
	 * @public
	 */
	js_cols.IntervalHeap.prototype.insertAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				this.insert(col[i], col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.insertSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function" && js_cols.typeOf(col.getKeys) == "function" ){
			var vals = col.getValues();
			var keys = col.getKeys();
			for (var i = 0; i < keys.length; i++){
				this.insert(keys[i], vals[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.insert(key, col[key]);
			}
		}
	};
	
	/*
	* Helpermethod for insertAll
	*
	* @param {*} value
	* @param {*} key
	* @private
	*/
	
	js_cols.IntervalHeap.prototype.insertSwapped = function(value, key){
		this.insert(key, value);
	};
	
	
	
	/**
	 * Returns the value associated with the minimum key of the queue
	 * @return {*} the value associated with the minimum key
	 * @public
	 */

	js_cols.IntervalHeap.prototype.min = function(){

		if (this.n > 0)
			return this.heap[1].left.value;
		else return null;
	};

	/**
	 * Returns the value associated with the maximum key of the queue
	 * @return {*} the value associated with the maximumkey
	 * @public
	 */
	js_cols.IntervalHeap.prototype.max = function(){

		if (this.n > 0 && this.heap[1].right) {
			return this.heap[1].right.value;
		}
		else if (this.n === 1){
			return this.heap[1].left.value;
		}
		else return null;
	};
	
	/**
	 * A default compare function
	 * @private
	 */
	js_cols.IntervalHeap.prototype.default_compare = function (a,b) {
		if (a < b) return -1;
		else if (b < a) return 1;
		else return 0;
	};
	

	/**
	 * Inserts a value prioritized after the supplied key
	 * @param {*} k the priority key
	 * @param {*} v the value to insert
	 * @return {js_cols.IntervalHeap.Handle} a Priority Queue Handle, used for later changeKey or remove operations
	 * @public
	 */
	js_cols.IntervalHeap.prototype.insert = function(k, v){ 

		
		var handle = new js_cols.IntervalHeap.Handle(k, v, this.n, this);

		// if the last node "n" is full, create new node and insert handle at its left

		if (this.n>0){
			if (this.heap[this.n].right == null){
				var temp = this.heap[this.n].left;
				if (this.compare(temp.key, handle.key) <= 0){
					this.heap[this.n].right = handle;
				}
				else{
					this.heap[this.n].left = handle;
					this.heap[this.n].right = temp;
				}
			}
			else {
				this.n++;
				handle.index = this.n;
				this.heap[this.n] = {};
				this.heap[this.n].left = handle;

			}	


		}
		// if n=0
		else {
			this.n++;

			handle.index = this.n;
			this.heap[this.n] = {};
			this.heap[this.n].left = handle;

		}
		var m = Math.floor(this.n / 2);

		if (this.n>1){
			if(this.compare(this.heap[m].left.key, this.heap[this.n].left.key) > 0) this.siftUpMin(this.n);

			else if (this.heap[this.n].right != null && this.compare(this.heap[m].right.key, this.heap[this.n].right.key) < 0) this.siftUpMax(this.n);

			else if (this.compare(this.heap[m].right.key, this.heap[this.n].left.key) < 0) this.siftUpMax(this.n);
		}

		this.count++;
		return handle;
	};

	/**
	 * Removes and returns the value associated with the minimum key in the queue
	 * @return {*} the value associated with the minimum key in the queue
	 * @public
	 */
	js_cols.IntervalHeap.prototype.deleteMin = function (){

		if (this.n <= 0) return null; 
		var result = this.heap[1].left.value;
		this.heap[1].left.container = undefined; // invalidate handle
		this.heap[this.n].left.index = 1;
		this.heap[1].left = this.heap[this.n].left;

		if (this.heap[this.n].right == null) {
			this.heap.pop();
			this.n --;

		}
		else {
			this.heap[this.n].left = this.heap[this.n].right;
			this.heap[this.n].right = null;
		}
		this.siftDownMin(1);
		this.count--;
		return result;
	};

	/**
	 * Removes and returns the value associated with the maximum key in the queue
	 * @return {*} the value associated with the maximum key in the queue
	 * @public
	 */
	js_cols.IntervalHeap.prototype.deleteMax = function (){

		if (this.n <= 0) return null; 
		
		if (this.heap[1].right !=null){ // if heap[1].right is not null 

			var result = this.heap[1].right.value;
			this.heap[1].right.container = null; // invalidate handle

			if (this.heap[this.n].right != null){
				this.heap[this.n].right.index = 1;
				this.heap[1].right = this.heap[this.n].right;
				this.heap[this.n].right = null;
			}
			else{
				this.heap[this.n].left.index = 1;
				this.heap[1].right = this.heap[this.n].left;
				this.heap.pop();
				this.n--;
			}

			this.siftDownMax(1);
			this.count--;
			return result;
		}
		// if heap[1].right is null (only one element in queue) deletemin instead
		else return this.deleteMin();
	};

	/**
	 * Changes the key for the value associated with the supplied handle
	 * @param {js_cols.IntervalHeap.Handle} handle the handle to use for location of the value
	 * @param {*} newKey the new key to associate with the value
	 * @return {boolean} true if the handle was valid for this heap, and the key was successfully changed, otherwise false
	 * @public
	 */
	js_cols.IntervalHeap.prototype.changeKey = function(handle, newKey){

		if (!this.containedInThisQueue(handle)) 
			return false;

		var idx = handle.index;
		var j = Math.floor(idx / 2);

		if (this.heap[idx].left === handle) {

			this.heap[idx].left.key = newKey;

		}

		else {

			this.heap[idx].right.key = newKey;

		}

		if (idx < this.n || this.heap[idx].right) {
			if (this.compare(this.heap[idx].left.key, this.heap[idx].right.key) > 0) {

				this.swapSides(idx);
			}
			
			if (idx > 1 && this.compare(this.heap[j].left.key, this.heap[idx].left.key) > 0) 
				this.siftUpMin(idx);
			else 
				this.siftDownMin(idx);
			if (idx > 1 && this.compare(this.heap[j].right.key, this.heap[idx].right.key) < 0) 
				this.siftUpMax(idx);
			else 
				this.siftDownMax(idx);

		}

		else {
			if (idx > 1 && this.compare(this.heap[j].left.key, this.heap[idx].left.key) > 0) 
				this.siftUpMin(idx);
			else 
				if (idx > 1 && this.compare(this.heap[j].right.key, this.heap[idx].left.key) < 0) 
					this.siftUpMax(idx);

		}
		return true;
	};



	/**
	 * Removes the value associated with the supplied handle
	 * @param {js_cols.IntervalHeap.Handle} handle the handle to use for location of the value
	 * @return {boolean} true if the handle was valid for this heap, and the value was successfully removed, otherwise false
	 * @public
	 */
	js_cols.IntervalHeap.prototype.remove = function (handle){

		if (! this.containedInThisQueue(handle)) return false;
		var idx = handle.index;
		var isLeft = false;
		if (this.heap[idx].left == handle) isLeft =true;
		
		if (isLeft){
			this.heap[idx].left.container = null; // invalidate handle
			this.heap[idx].left = this.heap[this.n].left;
			this.heap[idx].left.index = idx;
			this.heap[this.n].left =null;	
			this.siftDownMin(idx);
			if (this.heap[this.n].right==null){
				this.heap.pop();
				this.n--;
			}
			else{
				this.swapSides(this.n);	
			}
		}
		else{
			if (this.heap[this.n].right !=null){
				this.heap[idx].right.container = null; // invalidate handle
				this.heap[idx].right = this.heap[this.n].right;
				this.heap[idx].right.index = idx;
				this.heap[this.n].right =null;
				this.siftDownMax(idx);
			}
			else{
				this.heap[idx].right.container = null; // invalidate handle
				this.heap[idx].right = this.heap[this.n].left;
				this.heap[idx].right.index = idx;
				this.heap[this.n] =null;
				this.n--;
				this.siftDownMax(idx);
			}

		}
		this.count--;
		return true;
	};

	/**
	 * A recursive helper function to reestablish heap order
	 * @param {Integer} i the index
	 * @private
	 */
	js_cols.IntervalHeap.prototype.siftUpMin = function(i){

		var j = Math.floor(i / 2); 
		if (i == 1 || this.compare(this.heap[j].left.key, this.heap[i].left.key) <= 0) return;

		this.swapLeft(j,i);
		this.siftUpMin(j);
	};
	
	/**
	 * A recursive helper function to reestablish heap order
	 * @param {Integer} i the index
	 * @private
	 */
	js_cols.IntervalHeap.prototype.siftDownMin = function (i){

		if (2*i<= this.n){

			if (2*i+1 > this.n ||!this.heap[2*i+1].left ||this.compare(this.heap[2*i].left.key, this.heap[2*i+1].left.key) <= 0) var m= 2*i;
			else var m = 2*i+1;
			if (this.compare(this.heap[i].left.key, this.heap[m].left.key) > 0){

				this.swapLeft(i,m);
				if (this.heap[m].right && this.compare(this.heap[m].left.key, this.heap[m].right.key) > 0){
					this.swapSides(m);
				}
				this.siftDownMin(m);
			}

		}
	};
	
	/**
	 * A recursive helper function to reestablish heap order
	 * @param {Integer} i the index
	 * @private
	 */
	js_cols.IntervalHeap.prototype.siftUpMax = function(i){

		var j = Math.floor(i / 2);
		if (i < this.n || this.heap[this.n].right != null) {
			if (i == 1 || this.compare(this.heap[j].right.key, this.heap[i].right.key) >= 0) 
				return;

			this.swapRight(j, i);
			this.siftUpMax(j);
		}
		else  {
			if (i == 1 || this.compare(this.heap[j].right.key, this.heap[i].left.key) >= 0) return;

			this.heap[j].right.index = i; //change indexes in handles
			this.heap[i].left.index = j;
			var temp = this.heap[j].right; 
			this.heap[j].right = this.heap[i].left;
			this.heap[i].left = temp;
			this.siftUpMax(j);
		}
	};
	
	/**
	 * A recursive helper function reestablish heap order
	 * @param {Integer} i the index
	 * @private
	 */
	js_cols.IntervalHeap.prototype.siftDownMax = function (i){

		if (2*i<= this.n){

			if (2*i+1 > this.n || this.heap[2*i+1].right ==null || this.compare(this.heap[2*i].right.key, this.heap[2*i+1].right.key) > 0) var m= 2*i;
			else var m = 2*i+1;
			if (this.heap[m].right != null && this.compare(this.heap[i].right.key, this.heap[m].right.key) < 0){

				this.swapRight(i,m);

				if (this.compare(this.heap[m].left.key, this.heap[m].right.key) > 0){
					this.swapSides(m);
				}
				this.siftDownMax(m);
			}

		}
	};
	/**
	 * A helper function to swap two elements in the
	 * left side (minimum side) of the heap
	 * @param {Integer} i1 the first elements index
	 * @param {Integer} i2 the second elements index
	 * @private
	 */
	js_cols.IntervalHeap.prototype.swapLeft = function(i1, i2){

		this.heap[i1].left.index = i2;
		this.heap[i2].left.index = i1;
		var temp = this.heap[i1].left; 
		this.heap[i1].left = this.heap[i2].left;
		this.heap[i2].left = temp;
	};
	
	/**
	 * A helper function to swap two elements in the
	 * right side (maximum side) of the heap
	 * @param {Integer} i1 the first elements index
	 * @param {Integer} i2 the second elements index
	 * @private
	 */
	js_cols.IntervalHeap.prototype.swapRight = function(i1, i2){

		this.heap[i1].right.index = i2;
		this.heap[i2].right.index = i1;
		var temp = this.heap[i1].right; 
		this.heap[i1].right = this.heap[i2].right;
		this.heap[i2].right = temp;
	};
	/**
	 * A helper function to swap sides in a heap node
	 * @param {Integer} index the index where the elements should be swapped
	 * @private
	 */
	js_cols.IntervalHeap.prototype.swapSides = function(index){

		var temp = this.heap[index].left;
		this.heap[index].left = this.heap[index].right;
		this.heap[index].right = temp;
	};
	
	/**
	 * Function to check that a given handle is contained in this queue
	 * @param {js_cols.IntervalHeap.Handle} hdl the handle to check
	 * @private
	 */
	js_cols.IntervalHeap.prototype.containedInThisQueue = function(hdl){

		if (hdl.container === this) 
			return true;
		else 
			return false;
	};


	/**
	 * A handle used to locate a given element in the heap to obtain O(logn) running time
	 * for changeKey and remove. Handles are returned when inserting a key/value pair into the heap.
	 * @param {*} k the priority key
	 * @param {*} v the value to insert
	 * @param {Integer} i the index in the heap
	 * @param {js_cols.IntervalHeap} c the heap containing the element referenced by this handle
	 * @constructor
	 * @public
	 */
js_cols.IntervalHeap.Handle = function(k,v,i,c){
this.key = k;
this.value = v;
this.index = i;
this.container = c;

};

//Copyright 2010 Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

//js_cols.require('js_cols.LinkedList');
//js_cols.require('js_cols.HashMap');
//js_cols.provide('js_cols.LinkedHashMap');

/**
 * Class for a LinkedHashMap datastructure, which combines O(1) map access for
 * key/value pairs with a linked list for a consistent iteration order. 
 * This implementation is based on goog.structs.LinkedMap from the google closure library,
 * but allows any type as keys. It is also possible to obtain an iterator over the values in this implentation,
 * and direct insertion before or after a given key is also supported.
 * Sample
 * usage:
 *
 * <pre>
 * var m = new js_cols.LinkedHashMap();
 * m.insert('param1', 'A');
 * m.insert('param2', 'B');
 * m.insert('param3', 'C');
 * alert(m.getKeys()); // param1, param2, param3
 *
 * var c = new js_cols.LinkedHashMap(5, true);
 * for (var i = 0; i < 10; i++) {
 *   c.insert('entry' + i, false);
 * }
 * alert(c.getKeys()); // entry9, entry8, entry7, entry6, entry5
 *
 * c.insert('entry5', true);
 * c.insert('entry1', false);
 * alert(c.getKeys()); // entry1, entry5, entry9, entry8, entry7
 * </pre>
 *
 *
 * The assymptotic running time for important operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - clear                  O(1)
 * - clone                  O(n logn)
 * - contains               O(1)
 * - containsAll            O(m) m is the cardinality of the supplied collection
 * - every                  O(n * O(f)) f is the function supplied as argument
 * - filter                 O(n * O(f)) f is the function supplied as argument
 * - forEach                O(n * O(f)) f is the function supplied as argument
 * - get                    O(1)
 * - getValues              O(n)
 * - insert                 O(1)
 * - insertBefore           O(1)
 * - insertAfter            O(1)
 * - insertAll              O(m) m is the cardinality of the supplied collection
 * - map                    O(n * O(f)) f is the function supplied as argument
 * - peek                   O(1)
 * - peekLast               O(1)
 * - peekValue              O(1)
 * - pop                    O(1)
 * - remove                 O(1)
 * - removeAll              O(m logn) m is the cardinality of the supplied collection
 * - shift                  O(1)
 * - some                   O(n * O(f)) f is the function supplied as argument
 * - contains               O(n * O(f)) f is the function supplied as argument
 * </pre>
 *
 * WARNING: keys will be modified, a property named something like "js_cols_uid_2kczq5"
 * will be added. This liberates the user of implementing a getHashCode function, and
 * improves performance as hashing collisions are avoided.
 *
 * @param {number=} opt_maxCount The maximum number of objects to store in the
 *     LinkedHashMap. If unspecified or 0, there is no maximum.
 * @param {boolean=} isLFOcache When set, the LinkedHashMap stores items in order
 *     from most recently used to least recently used, instead of insertion
 *     order.
 * @constructor
 */

js_cols.LinkedHashMap = function(opt_maxCount, isLFOcache){

	this.list_ = new js_cols.LinkedList();
	this.augmentList();
	this.map_ = new js_cols.HashMap();
	this.maxCount_ = null || opt_maxCount;
	this.isCache_ = false || isLFOcache;
};

js_cols.LinkedHashMap.prototype.augmentList = function(){
	/**
	 * Direct insertion to the leaf list after a given node in the list.
	 * @param element the element after which the insertion should be
	 * @param newElement the new element to insert
	 * @private
	 **/
	this.list_.insertAfter = function(element, newElement){

		newElement.next = element.next;
		newElement.previous = element;
		element.next.previous = newElement;
		element.next = newElement;
		this.size ++;

	};

	/**
	 * Direct insertion to the leaf list before a given node in the list.
	 * @param element the element  before which the insertion should be
	 * @param newElement the new element to insert
	 * @private
	 **/

	this.list_.insertBefore = function(element, newElement){

		newElement.next = element;
		newElement.previous = element.previous;
		element.previous.next = newElement;
		element.previous = newElement;
		this.size ++;

	};

	/**
	 * Direct removal of a given node in the leaf list.
	 * @param element the node to remove
	 * @private
	 **/

	this.list_.removeFromList = function( element){

		element.previous.next = element.next;
		element.next.previous = element.previous;

		this.size --;

	};
	
};

	/**
	 * Finds a node and updates it to be the most recently used.
	 * @param {*} key The key of the node.
	 * @return {*} The node or null if not found.
	 * @private
	 */
js_cols.LinkedHashMap.prototype.findAndMoveToTop_ = function(key) {
		var node = this.map_.get(key);
		if (node) {
			if (this.isCache_) {
				this.list_.removeFromList(node);
				this.insert_(node);
			}
		}
		return node;
	};

	/**
	 * Sets a value for a given key. If this is a LRUcaching LinkedHashMap, this entry
	 * will become the most recently used.
	 * @param {*} key The key to set the value for.
	 * @param {*} value The value associated with the key
	 *     
	 */
js_cols.LinkedHashMap.prototype.insert = function(key, value) {
		var node = this.findAndMoveToTop_(key);
		if (node) {
			node.data = value;
		} else {
			node = {
					"key" : key,
					"data" : value
			};
			this.map_.insert(key, node);
			this.insert_(node);
		}
	};

	/**
	 * Helper method for insertAll
	 * 
	 * @param {*} key The key to set the value for.
	 * @param {*} value The value associated with the key
	 * @private    
	 */
js_cols.LinkedHashMap.prototype.insertSwapped = function(value, key) {
		this.insert(key, value);
	};


	/**
	 * Sets a value for a given key, and inserts them after a specified key.
	 * If this is a LRUcaching LinkedHashMap, a call to this method will be ignored.
	 * @param {*} exKey a key, after which the new key/value pair should be inserted
	 * @param {*} key The key to set the value for.
	 * @param {*} value The value associated with the key
	 * @return {boolean} whether the key/value pair was inserted
	 *     
	 */

js_cols.LinkedHashMap.prototype.insertAfter = function (exKey, key, value){

		var node = this.map_.get(exKey);
		if (node && !this.isCache_){
			var newNode = {
					"key" : key,
					"data" : value
			};
			this.list_.insertAfter(node, newNode);
			this.map_.insert(key, newNode);
			if (this.maxCount_ != null) {
				this.truncate_(this.maxCount_);
			}
			return true;
		};
		return false;
	};

	/**
	 * Sets a value for a given key, and inserts them before a specified key.
	 * If this is a LRUcaching LinkedHashMap, a call to this method will be ignored.
	 * @param {*} exKey a key, before which the new key/value pair should be inserted
	 * @param {*} key The key to set the value for.
	 * @param {*} value The value associated with the key
	 * @return {boolean} whether the key/value pair was inserted
	 *     
	 */

js_cols.LinkedHashMap.prototype.insertBefore = function (exKey, key, value){

		var node = this.map_.get(exKey);
		if (node && !this.isCache_){
			var newNode = {
					"key" : key,
					"data" : value
			};
			this.list_.insertBefore(node, newNode);
			this.map_.insert(key, newNode);
			if (this.maxCount_ != null) {
				this.truncate_(this.maxCount_);
			}
			return true;
		};
		return false;
	};

	/**
	 * Inserts a collection of key/value pairs into the LinkedHashMap
	 * @param {*} element the value
	 * @public
	 */
js_cols.LinkedHashMap.prototype.insertAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				this.insert(col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.insertSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function" && js_cols.typeOf(col.getKeys) == "function" ){
			var vals = col.getValues();
			var keys = col.getKeys();
			for (var i = 0; i < keys.length; i++){
				this.insert(keys[i], vals[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.insert(key, col[key]);
			}
		}
	};

	/**
	 * Removes a all values contained in the collection from the map
	 * The values in the collection are treated as keys in the map,
	 * and the values associated with those keys are removed.
	 * @param {js_cols.Collection || Array || Object} col the collection of values to remove
	 * @public
	 */
js_cols.LinkedHashMap.prototype.removeAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				this.remove(col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.removeSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
			var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
				this.remove(arr[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.remove(col[key]);
			}
		}
	};

	/**
	 * Checks that all values contained in the collection are also contained as keys in the Map
	 * @param {js_cols.Collection || Array || Object} col the collection of values to check
	 * @return {Boolean}
	 * @public
	 */
js_cols.LinkedHashMap.prototype.containsAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
				if (!this.containsKey(col[i]))
				{ return false;
				};
			};
			return true;
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			return col.every(this.containsSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
			var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
				if (!this.containsKey(arr[i])){
					return false;
				};
			};
			return true;
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				if (!this.containsKey(key)){
					return false;
				};
			}
			return true;
		}
	};


	/**
	 * Retrieves the value for a given key. If this is a LRU-caching LinkedHashMap, the
	 * entry will become the most recently used.
	 * @param {*} key The key to retrieve the value for.
	 * @param {*=} opt_val A default value that will be returned if the key is
	 *     not found, defaults to undefined.
	 * @return {*} The retrieved value.
	 */
js_cols.LinkedHashMap.prototype.get = function(key, opt_val) {
		var node = this.findAndMoveToTop_(key);
		return node ? node.data : opt_val;
	};

	/**
	 * Retrieves the value for a given key without updating the entry to be the
	 * most recently used.
	 * @param {string} key The key to retrieve the value for.
	 * @param {*=} opt_val A default value that will be returned if the key is
	 *     not found.
	 * @return {*} The retrieved value.
	 */
js_cols.LinkedHashMap.prototype.peekValue = function(key, opt_val) {
		var node = this.map_.get(key);
		return node ? node.data : opt_val;
	};

	/**
	 * Returns the value of the first node without making any modifications.
	 * @return {*} The value of the first node or undefined if the map is empty.
	 */
js_cols.LinkedHashMap.prototype.peek = function() {
		return this.list_.getFirst();
	};

	/**
	 * Returns the value of the last node without making any modifications.
	 * @return {*} The value of the last node or undefined if the map is empty.
	 */
js_cols.LinkedHashMap.prototype.peekLast = function() {
		return this.list_.getLast();
	};

	/**
	 * Removes the first node from the list and returns its value.
	 * @return {*} The value of the popped node, or undefined if the map was empty.
	 */
js_cols.LinkedHashMap.prototype.shift = function() {
		return this.popNode_(this.list_.sentinel.next);
	};

	/**
	 * Removes the last node from the list and returns its value.
	 * @return {*} The value of the popped node, or undefined if the map was empty.
	 */
js_cols.LinkedHashMap.prototype.pop = function() {
		return this.popNode_(this.list_.sentinel.previous);
	};


	/**
	 * Removes a value from the LinkedHashMap based on its key.
	 * @param {*} key The key to remove.
	 * @return {boolean} True if the entry was removed, false if the key was not
	 *     found.
	 */
js_cols.LinkedHashMap.prototype.remove = function(key) {
		var node = this.map_.get(key);
		if (node) {
			this.removeNode(node);
			return true;
		}
		return false;
	};

	/**
	 * Helper method for removeAll
	 * @param {*} key The key to remove.
	 * @private
	 */
js_cols.LinkedHashMap.prototype.removeSwapped = function(value, key) {

		this.remove(key);
	};


	/**
	 * Removes a node from the {@code LinkedHashMap}. It can be overridden to do
	 * further cleanup such as disposing of the node value.
	 * @param {*} node The LinkedList-node to remove.
	 * @private
	 */
js_cols.LinkedHashMap.prototype.removeNode = function(node) {
		this.list_.removeFromList(node);
		this.map_.remove(node.key);
	};

	/**
	 * * Returns the current size of the LinkedHashMap (number of key/value pairs)
	 * @return {number} The number of items currently in the LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.getCount = function() {
		return this.map_.getCount();
	};


	/**
	 * Whether the map is empty
	 * @return {Boolean} True if the map is empty, false if it contains any key/value pairs.
	 */
js_cols.LinkedHashMap.prototype.isEmpty = function() {
		return this.map_.isEmpty();
	};

	/**
	 * Sets the maximum number of entries allowed in this object, truncating any
	 * excess objects if necessary.
	 * @param {number} maxCount The new maximum number of entries to allow.
	 */
js_cols.LinkedHashMap.prototype.setMaxCount = function(maxCount) {
		this.maxCount_ = maxCount || null;
		if (this.maxCount_ != null) {
			this.truncate_(this.maxCount_);
		}
	};


	/**
	 * Inserts all Valuesof this map into an Array and returns it
	 * @return {!Array} The list of the values in the appropriate order for
	 *     this LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.getValues = function() {
		return this.list_.getValues();
	};

	/**
	 * Inserts all keys of this map into an Array and returns it
	 * @return {!Array} The list of the keys in the appropriate order for
	 *     this LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.getKeys = function() {
		return this.map(function(val, key) {
			return key;
		});
	};


	/**
	 * Tests whether a provided value is currently in the LinkedHashMap. This does not
	 * affect item ordering in cache-style LinkedHashMaps.
	 * @param {*} value The value to check for.
	 * @return {boolean} Whether the value is in the LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.containsValue = function(value) {
		return this.list_.contains(value);
	};


	/**
	 * Tests whether a provided key is currently in the LinkedHashMap. This does not
	 * affect item ordering in cache-style LinkedHashMaps.
	 * @param {*} key The key to check for.
	 * @return {boolean} Whether the key is in the LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.containsKey = function(key) {
		return this.map_.containsKey(key);
	};

	/**
	 * Tests whether a provided key is currently in the LinkedHashMap. This does not
	 * affect item ordering in cache-style LinkedHashMaps.
	 * This operation is identical to containsKey
	 * @param {*} key The key to check for.
	 * @return {boolean} Whether the key is in the LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.contains = function(key) {
		return this.containsKey(key);
	};
	
	/**
	 * Helper method for containsAll
	 * @param {*} key The key to check for.
	 * @return {boolean} Whether the key is in the LinkedHashMap.
	 * @private
	 */
js_cols.LinkedHashMap.prototype.containsSwapped = function(value, key) {
		return this.containsKey(key);
	};


	/**
	 * Removes all entries in this object.
	 */
js_cols.LinkedHashMap.prototype.clear = function() {
		this.truncate_(0);
	};

	/**
	 * Returns a shallow clone of this LinkedHashMap, containing the same key/value pairs.
	 * @return {js_cols.LinkedHashMap} the new LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.clone = function() {
		var rv = new js_cols.LinkedHashMap(this.maxCount_, this.isCache_ );
		rv.insertAll(this);
		return rv;
	};

	/**
	 * Calls a function on each item in the LinkedHashMap.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the LinkedHashMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 */
js_cols.LinkedHashMap.prototype.forEach = function(f, opt_obj) {
		for (var n = this.list_.sentinel.next; n != this.list_.sentinel; n = n.next) {
			f.call(opt_obj, n.data, n.key, this);
		}
	};


	/**
	 * Calls a function on each item in the LinkedHashMap and returns the results of
	 * those calls in an array.
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the LinkedHashMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {!Array} The results of the function calls for each item in the
	 *     LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.map = function(f, opt_obj) {
		var rv = [];
		for (var n = this.list_.sentinel.next; n != this.list_.sentinel; n = n.next) {
			rv.push(f.call(opt_obj, n.data, n.key, this));
		}
		return rv;
	};

	/**
	 * Calls a function on each item in the LinkedHashMap, if the function returns true, the key/value pair
	 * is inserted into a LinkedHashMap that is returned when all elements in the the map has been visited
	 *
	 * @param {!Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the LinkedHashMap.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {js_cols.LinkedHashMap} The key / value pairs that evaluated to true in the function calls for each item in the
	 *     LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.filter = function(f, opt_obj) {
		var rv = new js_cols.LinkedHashMap(this.maxCount_ ,this.isCache_ );
		for (var n = this.list_.sentinel.next; n != this.list_.sentinel; n = n.next) {
			if (f.call(opt_obj, n.data, n.key, this)) {
				rv.insert(n.key, n.data);
			}
		}
		return rv;
	};

	/**
	 * Calls a function on each item in the LinkedHashMap and returns true if any of
	 * those function calls returns a true-like value.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the LinkedHashMap, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for at least one item in the
	 *     LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.some = function(f, opt_obj) {
		for (var n = this.list_.sentinel.next; n != this.list_.sentinel; n = n.next) {
			if (f.call(opt_obj, n.data, n.key, this)) {
				return true;
			}
		}
		return false;
	};


	/**
	 * Calls a function on each item in the LinkedHashMap and returns true only if every
	 * function call returns a true-like value.
	 *
	 * @param {Function} f The function to call for each item. The function takes
	 *     three arguments: the value, the key, and the LinkedHashMap, and returns a
	 *     boolean.
	 * @param {Object=} opt_obj The object context to use as "this" for the
	 *     function.
	 * @return {boolean} Whether f evaluates to true for every item in the LinkedHashMap.
	 */
js_cols.LinkedHashMap.prototype.every = function(f, opt_obj) {
		for (var n = this.list_.sentinel.next; n != this.list_.sentinel; n = n.next) {
			if (!f.call(opt_obj, n.data, n.key, this)) {
				return false;
			}
		}
		return true;
	};

	/**
	 * Finds all key/value pairs that are present in both this map and the given collection.
	 * If the collection has no notion of keys (i.e. a Set or an Array), each element of the collection
	 * will be treated as key, and it will be inserted to the returned map with its corresponding value from this map.
	 * @param {js_cols.Collection || Object} col A collection.
	 * @return {js_cols.LinkedHashMap} A new set containing all the key/value pairs (primitives
	 *     or objects) present in both this set and the given collection.
	 */
js_cols.LinkedHashMap.prototype.intersection = function(col) {
		var rv = new js_cols.LinkedHashMap(this.maxCount_, this.isCache_ );
		if (js_cols.typeOf(col.get) == 'function'){
			for (var n = this.list_.sentinel.next; n != this.list_.sentinel; n = n.next) {
				if (col.get.call(col, n.key) == n.data) {
					rv.insert(n.key, n.data);
				}
			}
		}
		else{
			for (var n = this.list_.sentinel.next; n != this.list_.sentinel; n = n.next) {
				if (js_cols.contains.call(col, col, n.key)) {
					rv.insert(n.key, n.data);
				}
			}
		}
		return rv;
	};
	
		/**
	 * Detects wheter all key/value pairs present in this map are also present in the given collection.
	 * If the collection has no notion of keys (i.e. a Set or an Array), the result will be whether the keys 
	 * in this map is a subset of the elements in the collection.
	 * This operation is O(n * O(col.contains)).
	 * Example: if col is another LinkedHashMap, running time is O(n),
	 * if col is an Array or LinkedList, running time is O(n * m),
	 * if col is a HashSet, running time is O(n).
	 * @param {js_cols.Collection || Object} col A collection.
	 * @return {Boolean} wheter this map is a submap of col
	 *     
	 */
js_cols.LinkedHashMap.prototype.isSubmapOf = function(col) {
		var i = 0;
		if (js_cols.typeOf(col.get) == 'function'){
			for (var n = this.list_.sentinel.next; n != this.list_.sentinel; n = n.next) {
				if (col.get.call(col, n.key) == n.data) {
					i++;
				}
			}
		}
		else{
			for (var n = this.list_.sentinel.next; n != this.list_.sentinel; n = n.next) {
				if (js_cols.contains.call(col, col, n.key)) {
					i++;
				}
			}
		}
		return i == this.getCount();
	};


	/**
	 * Appends a node to the list. LinkedHashMap in cache mode adds new nodes to
	 * the head of the list, otherwise they are appended to the tail. If there is a
	 * maximum size, the list will be truncated if necessary.
	 *
	 * @param {*} node A LinkedList-node to insert.
	 * @private
	 */
js_cols.LinkedHashMap.prototype.insert_ = function(node) {
		if (this.isCache_) {

			this.list_.insertAfter(this.list_.sentinel, node);
		} else {
			this.list_.insertBefore(this.list_.sentinel, node);
		}

		if (this.maxCount_ != null) {
			this.truncate_(this.maxCount_);
		}
	};

	/**
	 * Removes elements from the LinkedHashMap if the given count has been exceeded.
	 * In cache mode removes nodes from the tail of the list. Otherwise removes
	 * nodes from the head.
	 * @param {number} count Number of elements to keep.
	 * @private
	 */
js_cols.LinkedHashMap.prototype.truncate_ = function(count) {
		for (var i = this.map_.getCount(); i > count; i--) {
			this.removeNode(this.isCache_ ? this.list_.sentinel.previous : this.list_.sentinel.next);
		}
	};

	/**
	 * Removes the node from the LinkedHashMap if it is not the head, and returns
	 * the node's value.
	 * @param {*} node The node to remove.
	 * @return {*} The value of the popped node.
	 * @private
	 */
js_cols.LinkedHashMap.prototype.popNode_ = function(node) {
		if (this.list_.sentinel != node) {
			this.removeNode(node);
		}
		return node.data;
	};

	/**
	 * NOTICE: the iterator returned by this method is unable to add, remove or update items
	 * Returns an iterator over the values of the list, starting before the first node, if no starting key is specified.
	 * @see {js_cols.LinkedList.LinkedListIterator}
	 * @param {*} key the starting key for the Iterator (if not present in the map, it will start from the beginning of the list)
	 * @return {js_cols.LinkedList.LinkedListIterator} an iterator over the values in this LinkedHashMap
	 * @public
	 */
js_cols.LinkedHashMap.prototype.iterator = function(key){
		var iter = this.list_.iterator(0);

		delete iter.add;
		delete iter.remove;
		delete iter.set;
		var pos = this.map_.get(key, false);
		if (pos){
			iter.position = pos;
		}
		return iter;
	};

// Copyright 2010 Thomas Stjernegaard Jeppesen. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//js_cols.require('js_cols.LinkedList');
//js_cols.provide('js_cols.Queue');
/**
 * 
 *
 *
 * js_cols.Queue provides the implementation of a Queue based on a doubly Linked List. The list is circular,
 * keeping a dummy element (<i>"sentinel"</i>) .<p>
 * @see js_cols.LinkedList
 *
 * The big-O notation for all operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - enqueue                 O(1)
 * - dequeue                 O(1)
 * - peek                    O(1)
 * - isEmpty                 O(1)
 * - remove                  O(n)
 * </pre>
 *
 * @constructor
 * @extends js_cols.LinkedList
 */

js_cols.Queue = function(){

js_cols.LinkedList.call(this);

};

js_cols.inherits(js_cols.Queue, js_cols.LinkedList);

/**
 * Puts the specified element on this queue.
 * @param {*} element The element to be added to the queue.
 */
js_cols.Queue.prototype.enqueue = function (element){

this.addLast(element);
};
/**
 * Retrieves and removes the head of this queue.
 * @return {*} The element at the head of this queue. Returns undefined if the
 *     queue is empty.
 */
js_cols.Queue.prototype.dequeue = function(){

return this.removeFirst();

};

/**
 * Retrieves but does not remove the head of this queue.
 * @return {*} The element at the head of this queue. Returns null if the
 *     queue is empty.
 */
js_cols.Queue.prototype.peek = function(){

return this.getFirst();

};


/**
	 * Removes a given element from the queue, if it is contained
	 * @param {*} o the element to remove
	 * @return {Boolean} wheter the object was removed;
	 * @public
	 */	
	js_cols.Queue.prototype.remove = function(o){
		return this.removeObject(o);
	};




// Copyright 2010 Thomas Stjernegaard Jeppesen. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//js_cols.require('js_cols.LinkedList');
//js_cols.provide('js_cols.Stack');

/**
 * 
 *
 *
 * js_cols.Stack provides the implementation of a Stack based on a doubly Linked List. The list is circular,
 * keeping a dummy element (<i>"sentinel"</i>) .<p>
 * @see js_cols.LinkedList
 *
 * The big-O notation for all operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - push                    O(1)
 * - pop                     O(1)
 * - peek                    O(1)
 * - isEmpty                 O(1)
 * </pre>
 *
 * @constructor
 * @extends js_cols.LinkedList
 */

js_cols.Stack = function(){

js_cols.LinkedList.call(this);

};

js_cols.inherits(js_cols.Stack, js_cols.LinkedList);

/**
 * Puts the specified element on this stack.
 * @param {*} element The element to be added to the stack.
 */
js_cols.Stack.prototype.push = function (element){

this.addFirst(element);
};
/**
 * Retrieves and removes the head of this stack.
 * @return {*} The element at the head of this queue. Returns undefined if the
 *     queue is empty.
 */
js_cols.Stack.prototype.pop = function(){

return this.removeFirst();

};

/**
 * Retrieves but does not remove the head of this stack.
 * @return {*} The element at the head of this stack. Returns null if the
 *     stack is empty.
 */
js_cols.Stack.prototype.peek =  function(){

return this.getFirst();

};


/**
	 * Removes a given element from the stack, if it is contained
	 * @param {*} o the element to remove
	 * @return {Boolean} wheter the object was removed;
	 * @public
	 */	
js_cols.Stack.prototype.remove = function(o){
		return this.removeObject(o);
	};



//Copyright Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//js_cols.provide('js_cols.RBnode');

js_cols.RBnode = function(tree){
		this.tree = tree;
		this.right = this.tree.sentinel;
		this.left = this.tree.sentinel;	
	};

//Copyright Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//js_cols.require('js_cols.RBnode');
//js_cols.provide('js_cols.RedBlackMap');


/**
 * 
 *
 *
 * js_cols.RedBlackMap provides the implementation of a Red Black Tree map datastructure. The tree
 * maintains a set of values, sorted by their corresponding keys. The key/value pairs can be
 * inserted and deleted efficiently in their sorted order as the tree enforces a logn
 * maximum height. This implementation provides guaranteed log(n) time cost for the
 * <tt>contains</tt>, <tt>insert</tt> and <tt>remove</tt>
 * operations.  Algorithms are adaptations of those in Thomas H. Cormen, Charles E. Leiserson, 
 * Ronald L. Rivest, Clifford Stein <I>Introduction to Algorithms, second edition</I>.<p>
 *
 * The assymptotic running time for important operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - clear                  O(1)
 * - clone                  O(n logn)
 * - contains               O(logn)
 * - containsAll            O(m logn) m is the cardinality of the supplied collection
 * - every                  O(n * O(f)) f is the function supplied as argument
 * - filter                 O(n * O(f)) f is the function supplied as argument
 * - forEach                O(n * O(f)) f is the function supplied as argument
 * - get                    O(logn)
 * - getValues              O(n)
 * - insert                 O(logn)
 * - insertAll              O(m logn) m is the cardinality of the supplied collection
 * - map                    O(n * O(f)) f is the function supplied as argument
 * - remove                 O(logn)
 * - removeAll              O(m logn) m is the cardinality of the supplied collection
 * - some                   O(n * O(f)) f is the function supplied as argument
 * - contains               O(n * O(f)) f is the function supplied as argument
 * </pre>
 * 
 *
 * Constructs a new Red Black map
 * @param {Function=} compare_func an optional compare function to compare the keys. This function should
 * take two values, a and b, and return x where:
 * <pre>
 *  x < 0 if a < b,
 *  x > 0 if a > b,
 *  x = 0 otherwise
 * </pre>
 * if not defined, a default compare function for <tt>numbers</tt> will be used
 * @constructor
 * @public
 */
js_cols.RedBlackMap = function(compare_func){

	this.RED = true; 
	this.BLACK = false;
	this.size = 0;
	this.sentinel = new js_cols.RBnode(this);
	this.sentinel.color = this.BLACK;
	this.root = this.sentinel; // when the tree is empty, root = sentinel 
	this.root.parent = this.sentinel;
	/**
	 * Comparison function used to compare values in the tree. This function should
	 * take two values, a and b, and return x where:
	 * <pre>
	 *  x < 0 if a < b,
	 *  x > 0 if a > b,
	 *  x = 0 otherwise
	 * </pre>
	 *
	 * @type {Function}
	 * @private
	 */
	js_cols.RedBlackMap.prototype.compare = compare_func || this.default_compare;
	
	};
		/**
		* A default compare function, if compare_func is not specified.
		* @private
		*/
		js_cols.RedBlackMap.prototype.default_compare = function (a,b) {
		if (a < b) return -1;
		else if (b < a) return 1;
		else return 0;
	};
	
	
	/**
	 * Clones a set and returns a new set.
	 * @return {!js_cols.RedBlackMap} A new map with the same key-value pairs.
	 */
	js_cols.RedBlackMap.prototype.clone = function(){
		var rv = new js_cols.RedBlackMap(this.compare);
		rv.insertAll(this);
		return rv;

	};
	
	/**
	 * Removes all elements from this set
	 * 
	 */
	js_cols.RedBlackMap.prototype.clear = function(){
		this.size = 0;
	this.sentinel = new js_cols.RBnode(this);
	this.sentinel.color = this.BLACK;
	this.root = this.sentinel; // when the tree is empty, root = sentinel 
	this.root.parent = this.sentinel;

	};
	
	
	/**
		* A helper function, used for tree balancing
		* @param x {js_cols.RBnode} the node to rotate about
		* @private
		*/
	js_cols.RedBlackMap.prototype.leftRotate = function(x){
		
		var y = x.right;
		x.right = y.left;
		if (y.left != this.sentinel) y.left.parent= x;
		y.parent = x.parent;
		if (x.parent == this.sentinel){
			this.root = y;
		}
		else if(x==x.parent.left){
			x.parent.left = y;
		}
		else {
			x.parent.right = y;
		}
		y.left = x;
		x.parent = y;

	};
		/**
		* A helper function, used for tree balancing
		* @param x {js_cols.RBnode} the node to rotate about
		* @private
		*/
	js_cols.RedBlackMap.prototype.rightRotate= function(x){
		
		var y = x.left;
		x.left = y.right;
		if (y.right != this.sentinel) y.right.parent= x;
		y.parent = x.parent;
		if (x.parent == this.sentinel){
			this.root = y;
		}
		else if(x==x.parent.right){
			x.parent.right = y;
		}
		else {
			x.parent.left = y;
		}
		y.right = x;
		x.parent = y;

	};
    /**
	 * Inserts a key/value pair into the tree
	 * @param {*} key the key used for ordering and location
	 * @param {*} element the value associated with the key
	 * @public
	 */
	js_cols.RedBlackMap.prototype.insert = function(key, value){
	
		if (!this.contains(key)){
		
		var z = new js_cols.RBnode(this);
		z.key = key;
		z.value = value;
		var y = this.sentinel;
		var x = this.root;
		while (x != this.sentinel){
			y=x;
			//if (z.key < x.key) x = x.left;
			if (this.compare(z.key, x.key) <0) x = x.left;
			else x=x.right;
		}
		z.parent = y;
		if (y == this.sentinel){
			this.root = z;
		}
		//else if(z.key < y.key){
		else if(this.compare(z.key, y.key) < 0){
			y.left = z;
		}
		else {
			y.right = z;
		}
		z.left = this.sentinel;
		z.right = this.sentinel;
		z.color = this.RED;
		this.insertFixup(z);
		this.size++;
		}
		else{
		var node = this.get_(key);
		node.value = value;
		}
	};
	
	/**
	* Helper method for insertAll	
	* @private
	*/
	js_cols.RedBlackMap.prototype.insertSwapped = function(value, key){
		this.insert(key, value);
	};
	

	/**
		* A helper function, used to reestablish the tree invariants after insertion of a node
		* @private
		*/
	js_cols.RedBlackMap.prototype.insertFixup = function(z) {

        while (z != this.sentinel && z != this.root && z.parent.color == this.RED) {
        	if (z.parent == z.parent.parent.left){
        		var y = z.parent.parent.right;
        		if (y.color == this.RED){
        			z.parent.color = this.BLACK;
        			y.color = this.BLACK;
        			z.parent.parent.color = this.RED;
        			z = z.parent.parent;
        		}
        		else
        		{
        			if (z == z.parent.right){
        				z = z.parent;
        				this.leftRotate(z);
        			}
        			z.parent.color = this.BLACK;
        			z.parent.parent.color = this.RED;
        			if (z.parent.parent != this.sentinel) this.rightRotate(z.parent.parent);
        		}
        		}else{
        			var y = z.parent.parent.left;
        			if (y.color == this.RED){
        				z.parent.color = this.BLACK;
        				y.color = this.BLACK;
        				z.parent.parent.color = this.RED;
        				z = z.parent.parent;
        			}else{
        				if (z == z.parent.left){
        					z=z.parent;
        					this.rightRotate(z);
        				}
        				z.parent.color = this.BLACK;
        				z.parent.parent.color = this.RED;
        				if (z.parent.parent != this.sentinel) this.leftRotate(z.parent.parent);
        			}
        	}
        }
        this.root.color = this.BLACK;
	};

	/**
	*	Deletes a node in the tree
	* @param z {js_cols.RBnode} the node to delete
	* @private
	*/
	
	js_cols.RedBlackMap.prototype.delete_ = function(z){
		var y;
		var x;
		
		if (z.left == this.sentinel || z.right == this.sentinel){
			y = z;
			
		}
		else {
			y = this.successor_(z);
	
		}
		
		if (y.left != this.sentinel){
			x = y.left;
			
		}
		else {
			x = y.right;
			
		}
		x.parent = y.parent;
		if (y.parent == this.sentinel){
			this.root = x;
			
		}
		else if (y == y.parent.left){
			y.parent.left = x;
		
		}
		else {
			y.parent.right = x;
			
		}

		if (y != z){
			z.key = y.key;
			z.value = y.value;
			
		}
		if (y.color == this.BLACK){
			this.deleteFixup(x);
			
		}
		this.size--;
		//return y;

	};
	

/**
		* A helper function, used to reestablish the tree invariants after deletion of a node
		* @param x {js_cols.RBnode}
		* @private
		*/
	js_cols.RedBlackMap.prototype.deleteFixup = function(x) {
	
		while (x != this.root && x.color == this.BLACK) {
            if (x == x.parent.left) {
                var w = x.parent.right;

                if (w.color == this.RED) {
                    w.color = this.BLACK;
                    x.parent.color = this.RED;
                    this.leftRotate(x.parent);
                    w = x.parent.right;
                }

                if (w.left.color  == this.BLACK &&
                    w.right.color == this.BLACK) {
                    w.color = this.RED;
                    x = x.parent;
                } else {
                    if (w.right.color == this.BLACK) {
                    	w.left.color = this.BLACK;
                        w.color = this.RED;
                        this.rightRotate(w);
                        w = x.parent.right;
                    }
                    w.color = x.parent.color;
                    x.parent.color = this.BLACK;
                    w.right.color = this.BLACK;
                    this.leftRotate(x.parent);
                    x = this.root;
                }
            } else { 
                var w = x.parent.left;

                if (w.color == this.RED) {
                    w.color = this.BLACK;
                    x.parent.color = this.RED;
                    this.rightRotate(x.parent);
                    w = x.parent.left;
                }

                if (w.right.color == this.BLACK &&
                   w.left.color == this.BLACK) {
                    w.color =  this.RED;
                    x = x.parent;
                } else {
                    if (w.left.color == this.BLACK) {
                        w.right.color = this.BLACK;
                        w.color = this.RED;
                        this.leftRotate(w);
                        w = x.parent.left;
                    }
                    w.color = x.parent.color;
                    x.parent.color = this.BLACK;
                    w.left.color = this.BLACK;
                    this.rightRotate(x.parent);
                    x = this.root;
                }
            }
        }

       x.color = this.BLACK;
        
	   
	};
	/**
	 * Remove the key and the value associated with it,
	 * and returns the value
	 * @param {*} key
	 * @return {*} the value
	 * @public
	 */
	js_cols.RedBlackMap.prototype.remove = function(key){
		var x = this.get_(key);
		if (x != this.sentinel){
		var retval = x.value;
		this.delete_(x);
		return retval;
		}
		else return null;
	};
	
	/**
	 * helper function for removeAll
	 * @param {*} key
	 * @param {*} value
	 * @private
	 */
	js_cols.RedBlackMap.prototype.removeSwapped = function(value,key){
		this.remove(key);
	};
	
	/**
	 * Retrieve the node with the minimum key
	 * @param {js_cols.RBnode} x the node from which to retrieve the minimum key
	 * @return {js_cols.RBnode} the node with the minimum key
	 * @private
	 */
	js_cols.RedBlackMap.prototype.min = function(x){
		while (x.left != this.sentinel){
			x = x.left;
		}
		return x;
	};
	
	/**
	 * Retrieve the node with the maximum key
	 * @param {js_cols.RBnode} x the node from which to retrieve the maximum key
	 * @return {js_cols.RBnode} the node with the maximum key
	 * @private
	 */
	js_cols.RedBlackMap.prototype.max = function(x){
		while (x.right != this.sentinel){
			x = x.right;
		}
		return x;
	};
	
	/**
	 * Finds and returns the succeeding node of that passed to the function
	 * @param {js_cols.RBnode} x
	 * @return {js_cols.RBnode} the succeeding node
	 * @private
	 */
	js_cols.RedBlackMap.prototype.successor_ = function(x){
		if (x.right != this.sentinel) return this.min(x.right);
		var y = x.parent;
		while (y != this.sentinel && x==y.right){
			x = y;
			y = y.parent;
		}
		return y;
	};
	
	/**
	 * Finds and returns the preceeding node of that passed to the function
	 * @param {js_cols.RBnode} x
	 * @return {js_cols.RBnode} the preceeding node
	 * @private
	 */
	js_cols.RedBlackMap.prototype.predecessor_ = function(x){
		
		if (x.left != this.sentinel) return this.max(x.left);
		var y = x.parent;
		while (y != this.sentinel && x==y.left){
			x = y;
			y = y.parent;
		}
		return y;
	};
	/**
	 * Finds and returns the value associated with the succeeding key to that passed to the function
	 * @param {*} key
	 * @return {*} the value associated with the succeeding key
	 * @public
	 */
	js_cols.RedBlackMap.prototype.successor = function(key){
		// TODO if key not in tree, throw exception?
		if(this.size >0){
		var x = this.get_(key);
		if (x == this.sentinel) return null;
		if (x.right != this.sentinel) return this.min(x.right).value;
		var y = x.parent;
		while (y != this.sentinel && x==y.right){
			x = y;
			y = y.parent;
		}
		if (y != this.sentinel)return y.value;
		else return null;
		}
		else {
		return null;
		}
	};
	/**
	 * Finds and returns the value associated with the preceeding key to that passed to the function
	 * @param {*} key
	 * @return {*} the value associated with the preceeding key, or null if the tree is not in the map
	 * @public
	 */
	js_cols.RedBlackMap.prototype.predecessor = function(key){
		
		if(this.size >0){
		var x = this.get_(key);
		if (x == this.sentinel) return null;
		if (x.left != this.sentinel) return this.max(x.left).value;
		var y = x.parent;
		while (y != this.sentinel && x==y.left){
			x = y;
			y = y.parent;
		}
		if (y != this.sentinel)return y.value;
		else return null;
		}
		else {
		return null;
		}

	};
	
	/**
	 * Returns the value associated with the minimum key in this tree
	 * @return {*} the value associated with the minimum key in this tree 
	 * @public
	 */
	js_cols.RedBlackMap.prototype.getMin = function (){
	return this.min(this.root).value;
	};
	
	/**
	 * Returns the value associated with the maximum key in this tree
	 * @return {*} the value associated with the maximum key in this tree 
	 * @public
	 */
	js_cols.RedBlackMap.prototype.getMax = function (){
	return this.max(this.root).value;
	};
	/**
	* @return {js_cols.RBnode} the node with the given key
	* @private
	*/
	js_cols.RedBlackMap.prototype.get_ = function(key){
		var x = this.root;
		while (x != this.sentinel && this.compare(x.key, key) !=0){
			if (this.compare(key, x.key)<0) x = x.left;
			else x= x.right;
		}
		return x;
	};
	

	/**
	 * Finds and returns the value associated with the key that is passed to the function
	 * @param {*} key
	 * @return {*} the value associated with the key if it exists in this tree, otherwise null
	 * @public
	 */
	js_cols.RedBlackMap.prototype.get = function(key){
		var x = this.root;
		while (x != this.sentinel && this.compare(x.key, key) != 0){
			if (this.compare(key, x.key)<0) x = x.left;
			else x= x.right;
		}
		return x.value;
	};
	
	/**
	 * Returns true if the key is associated with a value in this tree
	 * @param {*} key
	 * @return {Boolean} 
	 * @public
	 */
	js_cols.RedBlackMap.prototype.contains = function(key){
	return this.get_(key).key != null;
	};
	
			/**
 * Whether the map contains the given key.
 * @param {*} key The key to check for.
 * @return {boolean} Whether the map contains the key.
 * @private
 */
js_cols.RedBlackMap.prototype.containsSwapped = function(value, key){
	return this.contains(key);
};

	/**
 * Inserts the values stored in the tree into a new Array and returns the Array.
 *
 * @return {Array} An array containing all of the trees values in sorted order.
 */
js_cols.RedBlackMap.prototype.getValues = function() {
  var ret = [];
  this.traverse(function(x) {
    ret.push(x);
  });
  return ret;
};
	
		/**
 * Inserts the keys stored in the tree into a new Array and returns the Array.
 *
 * @return {Array} An array containing all of the trees values in sorted order.
 */
js_cols.RedBlackMap.prototype.getKeys = function() {
  var ret = [];
  if (this.isEmpty()) return ret;
  var node = this.min(this.root);
   while (node != this.sentinel){
    ret.push(node.key);
    node = node = this.successor_(node);
  };
  return ret;
};

/**
	 * Inserts a collection of key/value pairs into the map
	 * If the collection has no notion of keys (i.e. an Array or Set) each element
	 * is inserted as both key and value (mapping to it self)
	 * @param {js_cols.Collection || Object || Array} col the collection to insert
	 * @public
	 */
	js_cols.RedBlackMap.prototype.insertAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
					this.insert(col[i],col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.insertSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function" && js_cols.typeOf(col.getKeys) == "function" ){
		var vals = col.getValues();
		var keys = col.getKeys();
			for (var i = 0; i < keys.length; i++){
					this.insert(keys[i], vals[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.insert(key, col[key]);
			}
		}
	};
	
	
	
		/**
	 * Removes a all values contained in the collection from the tree
	 * The values in the collection are treated as keys in the tree,
	 * and the values associated with those keys are removed.
	 * @param {js_cols.Collection || Array || Object} col the collection of values to remove
	 * @public
	 */
	js_cols.RedBlackMap.prototype.removeAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
					this.remove(col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.removeSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
		var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
					this.remove(arr[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.remove(col[key]);
			}
		}
	};
	
	/**
	 * Checks that all values contained in the collection are also contained as keys in the tree
	 * @param {js_cols.Collection || Array || Object} col the collection of values to check
	 * @return {Boolean}
	 * @public
	 */
	js_cols.RedBlackMap.prototype.containsAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
					if (!this.contains(col[i]))
					{ return false;
					};
			};
			return true;
		}
		else if (js_cols.typeOf(col.every) == "function"){
			return col.every(this.containsSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
		var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
					if (!this.contains(arr[i])){
					return false;
					};
			};
			return true;
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				if (!this.contains(key)){
				return false;
				};
			}
			return true;
		}
	};


/**
 * Calls a function on each item in the RedBlackMap.
 *
 * @param {Function} f The function to call for each item. The function takes
 *     three arguments: tha value, the key, and the RedBlackMap.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 */
js_cols.RedBlackMap.prototype.forEach = function(f, opt_obj) {
if (this.isEmpty()) return;
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
  	
    f.call(opt_obj, n.value, n.key, this);
  }
};

/**
 * Calls a function on each item in the RedBlackMap and returns true if any of
 * those function calls returns a true-like value.
 *
 * @param {Function} f The function to call for each item. The function takes
 *     three arguments: the value, the key and the RedBlackMap, and returns a
 *     boolean.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @return {boolean} Whether f evaluates to true for at least one item in the
 *     RedBlackSet.
 */
js_cols.RedBlackMap.prototype.some = function(f, opt_obj) {
if (this.isEmpty()) return false;
   for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (f.call(opt_obj,n.value, n.key, this)) {
      return true;
    }
  }
  return false;
};


/**
 * Calls a function on each item in the RedBlackMap and returns true only if every
 * function call returns a true-like value.
 *
 * @param {Function} f The function to call for each item. The function takes
 *     three arguments: the value, the key, and the RedBlackMap, and returns a
 *     boolean.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @return {boolean} Whether f evaluates to true for every item in the RedBlackMap.
 */
js_cols.RedBlackMap.prototype.every = function(f, opt_obj) {
if (this.isEmpty()) return false;
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (!f.call(opt_obj,n.value, n.key, this)) {
      return false;
    }
  }
  return true;
};

/**
 * Calls a function on each item in the RedBlackMap and returns the results of
 * those calls in an array.
 *
 * @param {!Function} f The function to call for each item. The function takes
 *     three arguments: the value, the key, and the RedBlackMap.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @return {!Array} The results of the function calls for each item in the
 *     RedBlackMap.
 */
js_cols.RedBlackMap.prototype.map = function(f, opt_obj) {
  var rv = [];
  if (this.isEmpty()) return rv;
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    rv.push(f.call(opt_obj, n.value, n.key, this));
  }
  return rv;
};

/**
 * Calls a function on each item in the RedBlackMap, if the function returns true, the key/value pair
 * is inserted into a new RedBlackMap that is returned when the tree is fully traversed
 *
 * @param {!Function} f The function to call for each item. The function takes
 *     three arguments: the value, the key, and the RedBlackMap.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @return {js_cols.RedBlackMap} The key / value pairs that evaluated to true in the function calls are returned in 
 *    a new RedBlackMap.
 */
js_cols.RedBlackMap.prototype.filter = function(f, opt_obj) {
  var rv = new js_cols.RedBlackMap(this.compare);
  if (this.isEmpty()) return rv;
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (f.call(opt_obj, n.value, n.key, this)) {
    	rv.insert(n.key, n.value);
    }
  }
  return rv;
};

/**
 * Finds all key/value pairs that are present in both this map and the given collection.
 * If the collection has no notion of keys (i.e. a Set or an Array), each element of the collection
 * will be treated as key, and it will be inserted to the returned map with its corresponding value from this map.
 * This operation is O(n * O(col.contains)).
 * Example: if col is another RedBlackMap of size m, running time is O(n log(m)),
 * if col is an Array or LinkedList, running time is O(n * m),
 * if col is a HashSet, running time is O(n).
 * @param {js_cols.Collection || Object} col A collection.
 * @return {js_cols.RedBlackMap} A new set containing all the key/value pairs (primitives
 *     or objects) present in both this set and the given collection.
 */
js_cols.RedBlackMap.prototype.intersection = function(col) {
  var rv = new js_cols.RedBlackMap(this.compare);
  if (this.isEmpty()) return rv;
  if (js_cols.typeOf(col.get) == 'function'){
  		for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (col.get.call(col, n.key) == n.value) {
    	rv.insert(n.key, n.value);
    }
  }
  }
  else{
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (js_cols.contains.call(col, col, n.key)) {
    	rv.insert(n.key, n.value);
    }
  }
  }
  return rv;
};

/**
 * Detects wheter all key/value pairs present in this map are also present in the given collection.
 * If the collection has no notion of keys (i.e. a Set or an Array), the result will be whether the keys 
 * in this map is a subset of the elements in the collection.
 * This operation is O(n * O(col.contains)).
 * Example: if col is another RedBlackMap of size m, running time is O(n log(m)),
 * if col is an Array or LinkedList, running time is O(n * m),
 * if col is a HashSet, running time is O(n).
 * @param {js_cols.Collection || Object} col A collection.
 * @return {Boolean} wheter this map is a submap of col
 *     
 */
js_cols.RedBlackMap.prototype.isSubmapOf = function(col) {
	var colCount = js_cols.getCount(col);
  if (this.getCount() > colCount) {
    return false;
  }
  var i =0;
  if (this.isEmpty()) return true;
  if (js_cols.typeOf(col.get) == 'function'){
  		for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (col.get.call(col, n.key) == n.value) {
    	i++;
    }
  }
  }
  else{
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (js_cols.contains.call(col, col, n.key)) {
    	i++;
    }
  }
  }
  return i == this.getCount();
};

	/**
	 * Returns an array of the values in a given key range in this tree. 
	 * The 'from' key is inclusive, the 'to' key exclusive
	 * @param {*} from the smallest key in the range
	 * @param {*} to the successor of the largest key in the range
	 * @return {Array} an array of values 
	 * @public
	 */

	js_cols.RedBlackMap.prototype.range = function(from, to){
		
		var retArray = [];
		var f = function(x){
		retArray.push(x);
		};
		this.traverseFromTo(f, from, to);
		return retArray;
		
	};
	/**
 * Performs an in-order traversal of the tree and calls {@code func} with the value of each
 * traversed node. The traversal ends after traversing the tree's
 * maximum node or when {@code func} returns a value that evaluates to true.
 *
 * @param {Function} func Function to call on the value of each traversed node.
 * @public
 */	
	js_cols.RedBlackMap.prototype.traverse =
    function(func) {
    if (this.isEmpty()) return;
    var node = this.min(this.root);
  while (node != this.sentinel){
		
		if (func(node.value)) return;
		node = this.successor_(node);
		}
};

/**
 * Performs an in-order traversal of the tree and calls {@code func} with the value of each
 * traversed node, starting on the node with a key = to
 * the specified start key. The traversal ends after traversing the tree's
 * maximum node or when {@code func} returns a value that evaluates to true.
 *
 * @param {Function} func Function to call on the value of each traversed node.
 * @param {Object=} fromKey Traversal will begin on the
 *    node with key = fromKey.
 * @public
 */
js_cols.RedBlackMap.prototype.traverseFrom =
    function(func, fromKey) {
    if (this.isEmpty()) return;
    var node = this.get_(fromKey);
  while (node != this.sentinel){
		
		if (func(node.value)) return;
		node = this.successor_(node);
		}
};

/**
 * Performs an in-order traversal of the tree and calls {@code func} with the value of each
 * traversed node. The traversal ends before the node with key = toKey
 * or when {@code func} returns a value that evaluates to true.
 * @param {Function} func Function to call the value of on each traversed node.
 * @param {Object=} toKey Traversal will end before the
 *    node with the smallest key < toKey.
 * @public
 */
js_cols.RedBlackMap.prototype.traverseTo =
    function(func, toKey) {
    if (this.isEmpty()) return;
    var node = this.min(this.root);
    var toNode = this.get_(toKey);
  while (node != toNode){
		
		if (func(node.value)) return;
		node = this.successor_(node);
		}
};

/**
 * Performs an in-order traversal of the tree and calls {@code func} with the value of each
 * traversed node, starting on the node with a key = to
 * the specified start key. The traversal ends before the node with key = toKey
 * or when {@code func} returns a value that evaluates to true.
 *
 * @param {Function} func Function to call on the value of each traversed node.
 * @param {Object=} fromKey Traversal will begin on the
 *    node with key = fromKey.
 * @param {Object=} toKey Traversal will end before the
 *    node with the smallest key < toKey.
 * @public
 */
js_cols.RedBlackMap.prototype.traverseFromTo =
    function(func,fromKey, toKey) {
    if (this.isEmpty()) return;
    var node = this.get_(fromKey);
    var toNode = this.get_(toKey);
  while (node != toNode){
		
		if (func(node.value)) return;
		node = this.successor_(node);
		}
};

/**
 * Performs a reverse-order traversal of the tree and calls {@code f} with the value of
 * each traversed node, optionally starting from the largest node with a value
 * <= to the specified start value. The traversal ends after traversing the
 * tree's minimum node or when func returns a value that evaluates to true.
 *
 * @param {Function} f Function to call on the value of each traversed node.
 * @param {Object=} opt_startValue If specified, traversal will begin on the
 *    node with the largest value <= opt_startValue.
 * @public
 */
js_cols.RedBlackMap.prototype.traverseBackwards =
    function(f) {
    if (this.isEmpty()) return;
    var node = this.max(this.root);
  while (node != this.sentinel){
		
		if (f(node.value)) return;
		node = this.predecessor_(node);
		}
};

/**
	 * Returns the current size of the tree (number of elements)
	 * @return {Integer} 
	 * @public
	 */

	js_cols.RedBlackMap.prototype.getCount = function(){
		return this.size;
	};
	
	/**
	 * Returns true current size of the tree is zero
	 * @return {Boolean} 
	 * @public
	 */

js_cols.RedBlackMap.prototype.isEmpty = function(){
		return this.size ==0;
	};
	
	
	

//Copyright Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//js_cols.require('js_cols.RBnode');
//js_cols.provide('js_cols.RedBlackSet');

/**
 *
 * 
 *
 * js_cols.RedBlackSet provides the implementation of a Red Black Tree Set datastructure. The tree
 * maintains a set of values in sorted order. The values can be
 * inserted and deleted efficiently in their sorted order as the tree enforces a logn
 * maximum height. This implementation provides guaranteed log(n) time cost for the
 * <tt>contains</tt>, <tt>insert</tt> and <tt>remove</tt>
 * operations.  Algorithms are adaptations of those in Thomas H. Cormen, Charles E. Leiserson, 
 * Ronald L. Rivest, Clifford Stein <I>Introduction to Algorithms, second edition</I>.<p>
 *
 * The assymptotic running time for important operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - clear                  O(1)
 * - clone                  O(n logn)
 * - contains               O(logn)
 * - containsAll            O(m logn) m is the cardinality of the supplied collection
 * - every                  O(n * O(f)) f is the function supplied as argument
 * - filter                 O(n * O(f)) f is the function supplied as argument
 * - forEach                O(n * O(f)) f is the function supplied as argument
 * - getValues              O(n)
 * - insert                 O(logn)
 * - insertAll              O(m logn) m is the cardinality of the supplied collection
 * - map                    O(n * O(f)) f is the function supplied as argument
 * - remove                 O(logn)
 * - removeAll              O(m logn) m is the cardinality of the supplied collection
 * - some                   O(n * O(f)) f is the function supplied as argument
 * - contains               O(n * O(f)) f is the function supplied as argument
 * </pre>
 *
 * @param {Function=} compare_func an optional compare function to compare the keys. This function should
 * take two values, a and b, and return x where:
 * <pre>
 *  x < 0 if a < b,
 *  x > 0 if a > b,
 *  x = 0 otherwise
 * </pre>
 * if not defined, a default compare function for <tt>numbers</tt> will be used
 * @constructor
 * @public
 */


js_cols.RedBlackSet = function(compare_func){

	this.RED = true; 
	this.BLACK = false;
	this.size = 0;
	this.sentinel = new js_cols.RBnode(this);
	this.sentinel.color = this.BLACK;
	this.root = this.sentinel; // when the tree is empty, root = sentinel 
	this.root.parent = this.sentinel;
	
		/**
	 * Comparison function used to compare values in the tree. This function should
	 * take two values, a and b, and return x where:
	 * <pre>
	 *  x < 0 if a < b,
	 *  x > 0 if a > b,
	 *  x = 0 otherwise
	 * </pre>
	 *
	 * @type {Function}
	 * @private
	 */
	this.compare = compare_func || this.default_compare;
	
};
	
		/**
		* A default compare function, if compare_func is not specified.
		* @private
		*/
		js_cols.RedBlackSet.prototype.default_compare = function (a,b) {
		if (a < b) return -1;
		else if (b < a) return 1;
		else return 0;
	};

	
		/**
	 * Clones a set and returns a new set.
	 * @return {!js_cols.RedBlackSet} A new map with the same key-value pairs.
	 */
	js_cols.RedBlackSet.prototype.clone = function(){
		var rv = new js_cols.RedBlackSet(this.compare);
		rv.insertAll(this);
		return rv;

	};
	
	/**
	 * Removes all elements from this set
	 * 
	 */
	js_cols.RedBlackSet.prototype.clear = function(){
		this.size = 0;
	this.sentinel = new js_cols.RBnode(this);
	this.sentinel.color = this.BLACK;
	this.root = this.sentinel; // when the tree is empty, root = sentinel 
	this.root.parent = this.sentinel;

	};
	
	/**
		* A helper function, used for tree balancing
		* @private
		*/
	js_cols.RedBlackSet.prototype.leftRotate = function(x){
		
		var y = x.right;
		x.right = y.left;
		if (y.left != this.sentinel) y.left.parent= x;
		y.parent = x.parent;
		if (x.parent == this.sentinel){
			this.root = y;
		}
		else if(x==x.parent.left){
			x.parent.left = y;
		}
		else {
			x.parent.right = y;
		}
		y.left = x;
		x.parent = y;

	};
/**
		* A helper function, used for tree balancing
		* @private
		*/
	js_cols.RedBlackSet.prototype.rightRotate= function(x){
		
		var y = x.left;
		x.left = y.right;
		if (y.right != this.sentinel)y.right.parent= x;
		y.parent = x.parent;
		if (x.parent == this.sentinel){
			this.root = y;
		}
		else if(x==x.parent.right){
			x.parent.right = y;
		}
		else {
			x.parent.left = y;
		}
		y.right = x;
		x.parent = y;

	};
/**
	 * Inserts a key/value pair into the tree
	 * @param {*} key the key used for ordering and location
	 * @param {*} element the value associated with the key
	 * @public
	 */
	js_cols.RedBlackSet.prototype.insert = function(key){
	
		if (!this.contains(key)){
		
		var z = new js_cols.RBnode(this);
		z.key = key;
		var y = this.sentinel;
		var x = this.root;
		while (x != this.sentinel){
			y=x;
			//if (z.key < x.key) x = x.left;
			if (this.compare(z.key, x.key) <0) x = x.left;
			else x=x.right;
		}
		z.parent = y;
		if (y == this.sentinel){
			this.root = z;
		}
		//else if(z.key < y.key){
		else if(this.compare(z.key, y.key) < 0){
			y.left = z;
		}
		else {
			y.right = z;
		}
		z.left = this.sentinel;
		z.right = this.sentinel;
		z.color = this.RED;
		this.insertFixup(z);
		this.size++;
		}
		else{
		var node = this.get_(key);
		node.key = key;
		}
	};
	

	/**
		* A helper function, used to reestablish the tree invariants after insertion of a node
		* @private
		*/
	js_cols.RedBlackSet.prototype.insertFixup = function(z) {

        while (z != this.sentinel && z != this.root && z.parent.color == this.RED) {
        	if (z.parent == z.parent.parent.left){
        		var y = z.parent.parent.right;
        		if (y.color == this.RED){
        			z.parent.color = this.BLACK;
        			y.color = this.BLACK;
        			z.parent.parent.color = this.RED;
        			z = z.parent.parent;
        		}
        		else
        		{
        			if (z == z.parent.right){
        				z = z.parent;
        				this.leftRotate(z);
        			}
        			z.parent.color = this.BLACK;
        			z.parent.parent.color = this.RED;
        			if (z.parent.parent != this.sentinel) this.rightRotate(z.parent.parent);
        		}
        		}else{
        			var y = z.parent.parent.left;
        			if (y.color == this.RED){
        				z.parent.color = this.BLACK;
        				y.color = this.BLACK;
        				z.parent.parent.color = this.RED;
        				z = z.parent.parent;
        			}else{
        				if (z == z.parent.left){
        					z=z.parent;
        					this.rightRotate(z);
        				}
        				z.parent.color = this.BLACK;
        				z.parent.parent.color = this.RED;
        				if (z.parent.parent != this.sentinel) this.leftRotate(z.parent.parent);
        			}
        	}
        }
        this.root.color = this.BLACK;
	};

	/**
	*	Deletes a node in the tree
	* @param {js_cols.RBnode} z the node to delete
	* @private
	*/
js_cols.RedBlackSet.prototype.delete_ = function(z){
		var y;
		var x;
		if (z.left == this.sentinel || z.right == this.sentinel){
			y = z;
		}
		else {
			y = this.successor_(z);
		}
		
		if (y.left != this.sentinel){
			x = y.left;
		}
		else {
			x = y.right;
		}
		x.parent = y.parent;
		if (y.parent == this.sentinel){
			this.root = x;
		}
		else if (y == y.parent.left){
			y.parent.left = x;
		}
		else {
			y.parent.right = x;
		}

		if (y != z){
			z.key = y.key;
		}
		if (y.color == this.BLACK){
			this.deleteFixup(x);
		}
		this.size--;
		//return y;

	};

/**
		* A helper function, used to reestablish the tree invariants after deletion of a node
		* @param x {js_cols.RBnode}
		* @private
		*/
js_cols.RedBlackSet.prototype.deleteFixup = function(x) {
	
		while (x != this.root && x.color == this.BLACK) {
            if (x == x.parent.left) {
                var w = x.parent.right;

                if (w.color == this.RED) {
                    w.color = this.BLACK;
                    x.parent.color = this.RED;
                    this.leftRotate(x.parent);
                    w = x.parent.right;
                }

                if (w.left.color  == this.BLACK &&
                    w.right.color == this.BLACK) {
                    w.color = this.RED;
                    x = x.parent;
                } else {
                    if (w.right.color == this.BLACK) {
                    	w.left.color = this.BLACK;
                        w.color = this.RED;
                        this.rightRotate(w);
                        w = x.parent.right;
                    }
                    w.color = x.parent.color;
                    x.parent.color = this.BLACK;
                    w.right.color = this.BLACK;
                    this.leftRotate(x.parent);
                    x = this.root;
                }
            } else { 
                var w = x.parent.left;

                if (w.color == this.RED) {
                    w.color = this.BLACK;
                    x.parent.color = this.RED;
                    this.rightRotate(x.parent);
                    w = x.parent.left;
                }

                if (w.right.color == this.BLACK &&
                   w.left.color == this.BLACK) {
                    w.color =  this.RED;
                    x = x.parent;
                } else {
                    if (w.left.color == this.BLACK) {
                        w.right.color = this.BLACK;
                        w.color = this.RED;
                        this.leftRotate(w);
                        w = x.parent.left;
                    }
                    w.color = x.parent.color;
                    x.parent.color = this.BLACK;
                    w.left.color = this.BLACK;
                    this.rightRotate(x.parent);
                    x = this.root;
                }
            }
        }

       x.color = this.BLACK;
        
	   
	};
	/**
	 * Remove the key and the value associated with it
	 * @param {*} key
	 * @public
	 */
	js_cols.RedBlackSet.prototype.remove = function(key){
		var x = this.get_(key);
		if (x != this.sentinel){
		var retval = x.key
		this.delete_(x);
		return retval;
		}
		else return null;
	};
	
		/**
	 * helper function for removeAll
	 * @param {*} key
	 * @param {*} value
	 * @private
	 */
	js_cols.RedBlackSet.prototype.removeSwapped = function(value,key){
		this.remove(key);
	};
	/**
	* @private
	*/
js_cols.RedBlackSet.prototype.min = function(x){
		while (x.left != this.sentinel){
			x = x.left;
		}
		return x;
	};
	/**
	* @private
	*/
	js_cols.RedBlackSet.prototype.max = function(x){
		while (x.right != this.sentinel){
			x = x.right;
		}
		return x;
	};
	/**
	 * Finds and returns the value associated with the succeeding key to that passed to the function
	 * @param {js_cols.RBnode} x 
	 * @return {js_cols.RBnode} the node with the succeeding key
	 * @private
	 */
js_cols.RedBlackSet.prototype.successor_ = function(x){
		if (x.right != this.sentinel) return this.min(x.right);
		var y = x.parent;
		while (y != this.sentinel && x==y.right){
			x = y;
			y = y.parent;
		}
		return y;
	};
	
	/**
	 * Finds and returns the value associated with the preceeding key to that passed to the function
	 * @param {js_cols.RBnode} x
	 * @return {js_cols.RBnode} the node with the preceeding key
	 * @private
	 */
	js_cols.RedBlackSet.prototype.predeccessor_ = function(x){
		
		if (x.left != this.sentinel) return this.max(x.left);
		var y = x.parent;
		while (y != this.sentinel && x==y.left){
			x = y;
			y = y.parent;
		}
		return y;
	};
	/**
	 * Finds and returns the value associated with the succeeding key to that passed to the function
	 * @param {*} key
	 * @return {*} the value associated with the succeeding key, or null if the supplied key was not in the set
	 * @public
	 */
	js_cols.RedBlackSet.prototype.successor = function(key){
		
		if(this.size >0){
		var x = this.get_(key);
		if (x == this.sentinel) return null;
		if (x.right != this.sentinel) return this.min(x.right).key;
		var y = x.parent;
		while (y != this.sentinel && x==y.right){
			x = y;
			y = y.parent;
		}
		if (y != this.sentinel)return y.key;
		else return null;
		}
		else {
		return null;
		}
	};
	/**
	 * Finds and returns the value associated with the preceeding key to that passed to the function
	 * @param {*} key
	 * @return {*} the value associated with the preceeding key, or null if the supplied key was not in the set
	 * @public
	 */
js_cols.RedBlackSet.prototype.predecessor = function(key){
		
		if(this.size >0){
		var x = this.get_(key);
		if (x == this.sentinel) return null;
		if (x.left != this.sentinel) return this.max(x.left).key;
		var y = x.parent;
		while (y != this.sentinel && x==y.left){
			x = y;
			y = y.parent;
		}
		if (y != this.sentinel)return y.key;
		else return null;
		}
		else {
		return null;
		}
	};
	
	/**
	 * Returns the value associated with the minimum key in this tree
	 * @return {*} the value associated with the minimum key in this tree 
	 * @public
	 */
	js_cols.RedBlackSet.prototype.getMin = function (){
	return this.min(this.root).key;
	};
	
	/**
	 * Returns the value associated with the maximum key in this tree
	 * @return {*} the value associated with the maximum key in this tree 
	 * @public
	 */
	js_cols.RedBlackSet.prototype.getMax = function (){
	return this.max(this.root).key;
	};
	
	/**
	* @param {*} key
	* @return {js_cols.RBnode} the node with the given key
	* @private
	*/
	js_cols.RedBlackSet.prototype.get_ = function(key){
		var x = this.root;
		while (x != this.sentinel && this.compare(x.key, key) != 0){
			if (this.compare(key, x.key)<0) x = x.left;
			else x= x.right;
		}
		return x;
	};

	
	/**
	 * Returns true if the key is associated with a value in this tree
	 * @param {*} key
	 * @return {Boolean} 
	 * @public
	 */
	js_cols.RedBlackSet.prototype.contains = function(key){
	return this.get_(key).key != null;
	};
	
	
	/**
 * Inserts the elements stored in the tree into a new Array and returns the Array.
 *
 * @return {Array} An array containing all of the trees elements in sorted order.
 */
js_cols.RedBlackSet.prototype.getValues = function() {
  var ret = [];
  this.forEach(function(x) {
    ret.push(x);
  });
  return ret;
};

/**
	 * Inserts a collection of values into the tree
	 * @param {*} element the value
	 * @public
	 */
	js_cols.RedBlackSet.prototype.insertAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
					this.insert(col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.insert, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
		var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
					this.insert(arr[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.insert(col[key]);
			}
		}
	};
	
		/**
	 * Removes a all values contained in the collection from the tree
	  * If the collection has a notion of keys (a Map), the keys will be
	 * treated as values in this set.
	 * @param {js_cols.Collection || Array || Object} col the collection of values to remove
	 * @public
	 */
	js_cols.RedBlackSet.prototype.removeAll = function(col){
	if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
					this.remove(col[i]);
			};
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			col.forEach(this.removeSwapped, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
		var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
					this.remove(arr[i]);
			};
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				this.remove(col[key]);
			}
		}
	
	};
	
	/**
	 * Checks that all values contained in the collection are also contained in the tree.
	 * Checks that all values contained in the collection are also contained in the tree.
	 * If the collection has a notion of keys (i.e. an Array or a Set), the keys of the collection
	 * will be interpreted as values in this set.
	 * @param {js_cols.Collection || Array || Object} col the collection of values to check
	 * @return {Boolean}
	 * @public
	 */
js_cols.RedBlackSet.prototype.containsAll = function(col){
		if (js_cols.typeOf(col) == "array"){
			for (var i = 0; i < col.length; i++){
					if (!this.contains(col[i]))
					{ return false;
					};
			};
			return true;
		}
		else if (js_cols.typeOf(col.forEach) == "function"){
			return col.every(this.contains, this);
		}
		else if (js_cols.typeOf(col.getValues) == "function"){
		var arr = col.getValues();
			for (var i = 0; i < arr.length; i++){
					if (!this.contains(arr[i])){
					return false;
					};
			};
			return true;
		}
		else if (js_cols.typeOf(col) == "object") {
			for (var key in col){
				if (!this.contains(col[key])){
				return false;
				};
			}
			return true;
		}
	};

	/**
	 * Returns an array of the values in a given key range in this tree. 
	 * The 'from' key is inclusive, the 'to' key exclusive
	 * @param {*} from the smallest key in the range
	 * @param {*} to the successor of the largest key in the range
	 * @return {Array} an array of values 
	 * @public
	 */

	js_cols.RedBlackSet.prototype.range = function(from, to){
		
		var retArray = [];
		this.traverseFromTo(function(x){
		retArray.push(x);
		}, from, to);
		return retArray;
		
	};
	
	/**
 * Performs an in-order traversal of the tree and calls {@code f} with each
 * traversed node. The traversal ends after traversing the tree's
 * maximum node or when {@code f} returns a value that evaluates to true.
 *
  * @param {Function} f The function to call for each item. The function takes
 *     two arguments: the key, and the RedBlackSet.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @public
 */	
js_cols.RedBlackSet.prototype.traverse =
    function(f, opt_obj ) {
    if (this.isEmpty()) return;
    var node = this.min(this.root);
  while (node != this.sentinel){
		
		if (f.call(opt_obj, node.key, this)) return;
		node = this.successor_(node);
		}
};

/**
 * Performs an in-order traversal of the tree and calls {@code f} with each
 * traversed node, starting on the node with a key = to
 * the specified start key. The traversal ends after traversing the tree's
 * maximum node or when {@code f} returns a value that evaluates to true.
 *
  * @param {Function} f The function to call for each item. The function takes
 *     two arguments: the key, and the RedBlackSet.
 * @param {Object=} fromKey Traversal will begin on the
 *    node with key = fromKey.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @public
 */
js_cols.RedBlackSet.prototype.traverseFrom =
    function(f, fromKey, opt_obj) {
    if (this.isEmpty()) return;
    var node = this.get_(fromKey);
  while (node != this.sentinel){
		
		if (f.call(opt_obj, node.key, this)) return;
		node = this.successor_(node);
		}
};

/**
 * Performs an in-order traversal of the tree and calls {@code f} with each
 * traversed node. The traversal ends before the node with key = toKey
 * or when {@code f} returns a value that evaluates to true.
 * @param {Function} f The function to call for each item. The function takes
 *     two arguments: the key, and the RedBlackSet.
 * @param {Object=} toKey Traversal will end before the
 *    node with the smallest key < toKey.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @public
 */
js_cols.RedBlackSet.prototype.traverseTo =
    function(f, toKey, opt_obj) {
    if (this.isEmpty()) return;
    var node = this.min(this.root);
    var toNode = this.get_(toKey);
  while (node != toNode){
		
		if (f.call(opt_obj, node.key, this)) return;
		node = this.successor_(node);
		}
};

/**
 * Performs an in-order traversal of the tree and calls {@code f} with each
 * traversed node, starting on the node with a key = to
 * the specified start key. The traversal ends before the node with key = toKey
 * or when {@code f} returns a value that evaluates to true.
 *
 * @param {Function} f The function to call for each item. The function takes
 *     two arguments: the key, and the RedBlackSet.
 * @param {Object=} fromKey Traversal will begin on the
 *    node with key = fromKey.
 * @param {Object=} toKey Traversal will end before the
 *    node with the smallest key < toKey.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @public
 */
js_cols.RedBlackSet.prototype.traverseFromTo =
    function(f,fromKey, toKey, opt_obj) {
    if (this.isEmpty()) return;
    var node = this.get_(fromKey);
    var toNode = this.get_(toKey);
  while (node != toNode){
		
		if (f.call(opt_obj, node.key, this)) return;
		node = this.successor_(node);
		}
};

/**
 * Performs a reverse-order traversal of the tree and calls {@code f} with
 * each traversed node, optionally starting from the largest node with a value
 * <= to the specified start value. The traversal ends after traversing the
 * tree's minimum node or when func returns a value that evaluates to true.
 *
  * @param {Function} f The function to call for each item. The function takes
 *     two arguments: the key, and the RedBlackSet.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @public
 */
js_cols.RedBlackSet.prototype.traverseBackwards =
    function(f, opt_obj) {
    if (this.isEmpty()) return;
    var node = this.max(this.root);
  while (node != this.sentinel){
		
		if (f.call(opt_obj, node.key, this)) return;
		node = this.predeccessor_(node);
		}
};

	/**
 * Calls a function on each item in the RedBlackSet.
 *
 * @param {Function} f The function to call for each item. The function takes
 *     two arguments: the key, and the RedBlackSet.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 */
js_cols.RedBlackSet.prototype.forEach = function(f, opt_obj) {
	if (this.isEmpty()) return;
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
  	
    f.call(opt_obj, n.key, n.key, this);
  }
};

/**
 * Calls a function on each item in the RedBlackSet and returns true if any of
 * those function calls returns a true-like value.
 *
 * @param {Function} f The function to call for each item. The function takes
 *     three arguments: the value, the key and the RedBlackSet, and returns a
 *     boolean.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @return {boolean} Whether f evaluates to true for at least one item in the
 *     RedBlackSet.
 */
js_cols.RedBlackSet.prototype.some = function(f, opt_obj) {
	if (this.isEmpty()) return false;
   for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (f.call(opt_obj, n.key, n.key, this)) {
      return true;
    }
  }
  return false;
};


/**
 * Calls a function on each item in the RedBlackSet and returns true only if every
 * function call returns a true-like value.
 *
 * @param {Function} f The function to call for each item. The function takes
 *     three arguments: the value, the key and the RedBlackSet, and returns a
 *     boolean.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @return {boolean} Whether f evaluates to true for every item in the RedBlackSet.
 */
js_cols.RedBlackSet.prototype.every = function(f, opt_obj) {
	if (this.isEmpty()) return false;
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (!f.call(opt_obj, n.key, n.key, this)) {
      return false;
    }
  }
  return true;
};

/**
 * Calls a function on each item in the RedBlackSet and returns the results of
 * those calls in an array.
 *
 * @param {!Function} f The function to call for each item. The function takes
 *     three arguments: the value, the key, and the RedBlackSet.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @return {!Array} The results of the function calls for each item in the
 *     RedBlackSet.
 */
js_cols.RedBlackSet.prototype.map = function(f, opt_obj) {
  var rv = [];
  if (this.isEmpty()) return rv;
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    rv.push(f.call(opt_obj, n.key, n.key, this));
  }
  return rv;
};

/**
 * Calls a function on each item in the RedBlackSet, if the function returns true, the key/value pair
 * is inserted into an object that is returned when the tree is fully traversed
 *
 * @param {!Function} f The function to call for each item. The function takes
 *     three arguments: the value, the key, and the RedBlackSet.
 * @param {Object=} opt_obj The object context to use as "this" for the
 *     function.
 * @return {!Array} The key / value pairs that evaluated to true in the function calls for each item in the
 *     RedBlackSet.
 */
js_cols.RedBlackSet.prototype.filter = function(f, opt_obj) {
  var rv = [];
  if (this.isEmpty()) return rv;
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (f.call(opt_obj, n.key, n.key, this)) {
    	rv.push(n.key);
    }
  }
  return rv;
};

/**
	 * Returns the current size of the tree (number of elements)
	 * @return {Integer} 
	 * @public
	 */

js_cols.RedBlackSet.prototype.getCount = function(){
		return this.size;
	};
	
	/**
	 * Returns true if the current size of the tree is zero
	 * @return {Boolean} 
	 * @public
	 */

	js_cols.RedBlackSet.prototype.isEmpty = function(){
		return this.size ==0;
	};
	
		/**
 * Tests whether the given collection contains all the elements in this set.
  * WARNING: This operation is not guaranteed to work correctly if col is a Map.
 * Primitives are treated as equal if they have the same type and convert to the
 * same string; objects are treated as equal if they are references to the same
 * object.  
  * This operation is O(n * O(col.contains)).
 * Example: if col is another RedBlackSet of size m, running time is O(n log(m)),
 * if col is an Array or LinkedList, running time is O(n * m),
 * if col is a HashSet, running time is O(n).
 * @param {js_cols.Set|Array|Object} col A collection.
 * @return {boolean} True if this set is a subset of the given collection.
 */
js_cols.RedBlackSet.prototype.isSubsetOf = function(col) {
  var colCount = js_cols.getCount(col);
  if (this.getCount() > colCount) {
    return false;
  }
    var i =0;
  if (this.isEmpty()) return true;
  
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (js_cols.contains.call(col, col, n.key)) {
    	i++;
    }
  }
  return i == this.getCount();
};

/**
 * Finds all values that are present in both this set and the given collection.
 * This operation is O(n * O(col.contains)).
  * WARNING: This operation is not guaranteed to work correctly if col is a Map.
 * Example: if col is another RedBlackSet of size m, running time is O(n log(m)),
 * if col is an Array or LinkedList, running time is O(n * m),
 * if col is a HashSet, running time is O(n).
 * @param {js_cols.Set|Array|Object} col A collection.
 * @return {js_cols.Set} A new set containing all the values (primitives
 *     or objects) present in both this set and the given collection.
 */
js_cols.RedBlackSet.prototype.intersection = function(col) {
	var  result = new js_cols.RedBlackSet(this.compare);
	if (this.isEmpty()) return result;
  for (var n = this.min(this.root); n != this.sentinel; n = this.successor_(n)) {
    if (col.contains.call(col, n.key, n.key, this)) {
    	result.insert(n.key);
    }
  }
  return result;
};
	

//Copyright Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//js_cols.require('js_cols.RedBlackSet');
// js_cols.require('js_cols.RBnode');
//  js_cols.provide('js_cols.RedBlackBag');
/**
 *
 * 
 *
 * js_cols.RedBlackBag provides the implementation of a Red Black Tree multiset datastructure. The tree
 * maintains a set of values in sorted order. A MultiSet allows dublicates. In case of dublicate values, 
 * the most recently inserted will be deleted when calling remove. The range function can be used to retrieve
 * all equal values. The values can be
 * inserted and deleted efficiently in their sorted order as the tree enforces a logn
 * maximum height. This implementation provides guaranteed log(n) time cost for the
 * <tt>contains</tt>, <tt>insert</tt> and <tt>remove</tt>
 * operations.  Algorithms are adaptations of those in Thomas H. Cormen, Charles E. Leiserson, 
 * Ronald L. Rivest, Clifford Stein <I>Introduction to Algorithms, second edition</I>.<p>
 *
 * The assymptotic running time for important operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - clear                  O(1)
 * - clone                  O(n logn)
 * - contains               O(logn)
 * - containsAll            O(m logn) m is the cardinality of the supplied collection
 * - every                  O(n * O(f)) f is the function supplied as argument
 * - filter                 O(n * O(f)) f is the function supplied as argument
 * - forEach                O(n * O(f)) f is the function supplied as argument
 * - get                    O(logn)
 * - getValues              O(n)
 * - insert                 O(logn)
 * - insertAll              O(m logn) m is the cardinality of the supplied collection
 * - map                    O(n * O(f)) f is the function supplied as argument
 * - remove                 O(logn)
 * - removeAll              O(m logn) m is the cardinality of the supplied collection
 * - some                   O(n * O(f)) f is the function supplied as argument
 * - contains               O(n * O(f)) f is the function supplied as argument
 * </pre>
 *
 * @param {Function=} compare_func an optional compare function to compare the keys. This function should
 * take two values, a and b, and return x where:
 * <pre>
 *  x < 0 if a < b,
 *  x > 0 if a > b,
 *  x = 0 otherwise
 * </pre>
 * if not defined, a default compare function for <tt>numbers</tt> will be used
 * @public
 * @see js_cols.RedBlackSet
 * @constructor
 * @extends js_cols.RedBlackSet
 */


 
js_cols.RedBlackBag = function(compare_func){
js_cols.RedBlackSet.call(this,compare_func);

};

js_cols.inherits(js_cols.RedBlackBag, js_cols.RedBlackSet);

	/**
	* alternative insert function for multiple entries of same key
	* @param {*} key the keyto insert
	* @private
	*/
		js_cols.RedBlackBag.prototype.insert = function(key){
	
		
		
		var z = new js_cols.RBnode(this);
		z.key = key;
		var y = this.sentinel;
		var x = this.root;
		while (x != this.sentinel){
			y=x;
			//if (z.key < x.key) x = x.left;
			if (this.compare(z.key, x.key)<0) x = x.left;
			else x=x.right;
		}
		z.parent = y;
		if (y == this.sentinel){
			this.root = z;
		}
		//else if(z.key < y.key){
		else if(this.compare(z.key, y.key) < 0){
			y.left = z;
		}
		else {
			y.right = z;
		}
		z.left = this.sentinel;
		z.right = this.sentinel;
		z.color = this.RED;
		this.insertFixup(z);
		this.size++;
		
	};
	/**
	* A version of this.get_ modified to handle multiple entries for same key in correct order
	* @param {*} key
	* @return {js_cols.RBnode} the node with the given key
	* @private
	*/
	js_cols.RedBlackBag.prototype.get_ = function(key){
		var x = this.root;
		while (x != this.sentinel && this.compare(x.key, key) != 0){
			if (this.compare(key, x.key)<0) x = x.left;
			else x= x.right;
		}
		while (x != this.sentinel && x.left != this.sentinel && this.compare(x.left.key, key) ==0) {
		x = x.left;
		}
		return x;
	}
	
	/**
	 * Overriding RedBlackSets clone method.
	 * Clones a set and returns a new set.
	 * @return {!js_cols.RedBlackBag} A new map with the same key-value pairs.
	 */
	js_cols.RedBlackBag.prototype.clone = function(){
		var rv = new js_cols.RedBlackBag(this.compare);
		rv.insertAll(this);
		return rv;

	};
	

//Copyright Thomas Stjernegaard Jeppesen. All Rights Reserved.

//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at

//http://www.apache.org/licenses/LICENSE-2.0

//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS-IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//js_cols.require('js_cols.RedBlackMap');
// js_cols.require('js_cols.RBnode');
// js_cols.provide('js_cols.RedBlackMultiMap');
/**
 * 
 *
 *
 * js_cols.RedBlackMultiMap provides the implementation of a Red Black Tree multi map datastructure. The tree
 * maintains a set of values, sorted by their corresponding keys. A MultiMap allows key dublicates. In case of dublicate keys, 
 * the most recently inserted will be deleted when calling remove. The range function can be used to retrieve
 * all values, mapped to a single key. Sample usage:
 * <pre>
 * var mm = new js_cols.ABTreeMultiMap();
 * mm.insert('a', 'apple');
 * mm.insert('a', 'almond');
 * mm.insert('a', 'anaconda');
 * var aValues = mm.range('a','b'); // returns ['apple', 'almond', 'anaconda']
 * </pre> 
 * The key/value pairs can be inserted and deleted efficiently 
 * in their sorted order as the tree enforces a log(n)
 * maximum height. This implementation provides guaranteed log(n) time cost for the
 * <tt>contains</tt>, <tt>insert</tt> and <tt>remove</tt>
 * operations.  Algorithms are adaptations of those in Thomas H. Cormen, Charles E. Leiserson, 
 * Ronald L. Rivest, Clifford Stein <I>Introduction to Algorithms, second edition</I>.<p>
 *
 * The assymptotic running time for important operations are below:
 * <pre>
 *   Method                 big-O
 * ----------------------------------------------------------------------------
 * - clear                  O(1)
 * - clone                  O(n logn)
 * - contains               O(logn)
 * - containsAll            O(m logn) m is the cardinality of the supplied collection
 * - every                  O(n * O(f)) f is the function supplied as argument
 * - filter                 O(n * O(f)) f is the function supplied as argument
 * - forEach                O(n * O(f)) f is the function supplied as argument
 * - get                    O(logn)
 * - getValues              O(n)
 * - insert                 O(logn)
 * - insertAll              O(m logn) m is the cardinality of the supplied collection
 * - map                    O(n * O(f)) f is the function supplied as argument
 * - remove                 O(logn)
 * - removeAll              O(m logn) m is the cardinality of the supplied collection
 * - some                   O(n * O(f)) f is the function supplied as argument
 * - contains               O(n * O(f)) f is the function supplied as argument
 * </pre>
 *
 * @param {Function=} compare_func an optional compare function to compare the keys. This function should
 * take two values, a and b, and return x where:
 * <pre>
 *  x < 0 if a < b,
 *  x > 0 if a > b,
 *  x = 0 otherwise
 * </pre>
 * if not defined, a default compare function for <tt>numbers</tt> will be used
 * @public
 * @see js_cols.RedBlackMap
 * @constructor
 * @extends js_cols.RedBlackMap
 */

js_cols.RedBlackMultiMap = function(compare_func){
js_cols.RedBlackMap.call(this, compare_func);
};

js_cols.inherits(js_cols.RedBlackMultiMap, js_cols.RedBlackMap);

	// changing addToLeafs to allow multiple entries for same key
	 /**
	 * Inserts a key/value pair into the tree
	 * @param {*} key the key used for ordering and location
	 * @param {*} element the value associated with the key
	 * @public
	 */
	js_cols.RedBlackMultiMap.prototype.insert = function(key, value){
	
		
		
		var z = new js_cols.RBnode(this);
		z.key = key;
		z.value = value;
		var y = this.sentinel;
		var x = this.root;
		while (x != this.sentinel){
			y=x;
			//if (z.key < x.key) x = x.left;
			if (this.compare(z.key, x.key)<0) x = x.left;
			else x=x.right;
		}
		z.parent = y;
		if (y == this.sentinel){
			this.root = z;
		}
		//else if(z.key < y.key){
		else if(this.compare(z.key, y.key) < 0){
			y.left = z;
		}
		else {
			y.right = z;
		}
		z.left = this.sentinel;
		z.right = this.sentinel;
		z.color = this.RED;
		this.insertFixup(z);
		this.size++;
		
	};
	
	
	/**
	* A version of this.get_ modified to handle multiple entries for same key in correct order
	* @return {js_cols.RBnode} the node with the given key
	* @private
	*/
js_cols.RedBlackMultiMap.prototype.get_ = function(key){
		var x = this.root;
		while (x != this.sentinel && this.compare(x.key, key) != 0){
			if (this.compare(key, x.key)<0) x = x.left;
			else x= x.right;
		}
		
		while (x != this.sentinel && x.left != this.sentinel && this.compare(x.left.key, key) ==0) {
		x = x.left;
		}
		
		return x;
	};
	
	/**
	 * Overriding RedBlackMaps clone method.
	 * Clones a set and returns a new set.
	 * @return {!js_cols.RedBlackMultiMap} A new map with the same key-value pairs.
	 */
js_cols.RedBlackMultiMap.prototype.clone = function(){
		var rv = new js_cols.RedBlackMultiMap(this.compare);
		rv.insertAll(this);
		return rv;
	
	};
	
	/**
	 * this opreation is not supported by Multi Maps
	 */
js_cols.RedBlackMultiMap.prototype.isSubmapOf = undefined; 
	
	/**
	 * this operation is not supported by Multi Maps
	 */
js_cols.RedBlackMultiMap.prototype.intersection = undefined;


if (typeof module !== 'undefined' && module.exports) {
	module.exports = js_cols
};