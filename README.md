# bheap

A javascript binary heap implementation for Node.js and the browser.

## Installation

As npm for Node.js:

```
$ npm install bheap
```

## Usage

```js
var BinaryHeap = require('bheap');

var heap = new BinaryHeap(function(a, b) {
  return a.cash - b.cash;
});

heap.push({ cash: 250, name: 'Valentina' });
heap.push({ cash: 300, name: 'Jano' });
heap.push({ cash: 150, name: 'Fran' );
heap.size; // 3
heap.top(); // { cash: 300, name: 'Jano' }
heap.pop(); // { cash: 300, name: 'Jano' }
heap.size; // 2
```

## API

### constructor ([array], [cmp])

It creates a new instance of `BinaryHeap` based on its parameters.

**Time complexity:** *O(n)* such that `n === array.length`

##### array
- Type: Array
- Default: []

Elements that are inserted in binary heap.

##### cmp(a, b)
- Type: Function
- Default: [BinaryHeap.DEFAULT_COMPARATOR](a, b)
- Returns: 
    - positive if `a` is great than `b`
    - negative if `a`is less than `b`
    - zero if `a` is equal to `b`

It is a function that heap uses internally to sort its elements.  

### BinaryHeap.DEFAULT_COMPARATOR(a, b)

It is default comparator if any is passed and compares two `Number` or `String` objects. It is **static** member of `BinaryHeap`.

### .isEmpty()
- Type: Function
- Returns: Boolean

Returns whether the binary heap is empty or not.

**Time complexity:** *O(1)*

### .size
- Type: Number

The size of the binary heap.

**Time complexity:** *O(1)*

### .top()
- Type: Function
- Returns: Element of instancce of `BinaryHeap`

Gets the top element of the binary heap.
Throws an `Error` when the heap is empty.

**Time complexity:** *O(1)*

### .pop()
- Type: Function
- Returns: Element of instancce of `BinaryHeap`

Pops the top element of instance of binary heap.
Throws an `Error` when the heap is empty.

**Time complexity:** *O(log(n))* such that `n === this.size`

### .push(element)
- Type: Function
- Returns: Integer

Push the `element` at the binary heap and returns its new size.

**Time complexity:** *O(log(n))* such that `n === this.size`

## FAQ

#### Why do BinaryHeap have the property size and not length?

I want to keep the [ECMAScript 6 conventions](http://exploringjs.com/es6/ch_maps-sets.html#leanpub-auto-why-do-maps-and-sets-have-the-property-size-and-not-length).

## Testing

As npm package:

```
$ npm test
```

## Licence

MIT