# bheap

![travis ci](https://travis-ci.org/xgbuils/bheap.svg?branch=master)

A javascript binary heap implementation for Node.js and browser with [browserify](http://browserify.org/).

## Installation

``` bash
$ npm install bheap
```

## Usage

``` javascript
var BinaryHeap = require('bheap')

var heap = new BinaryHeap(function(a, b) {
  return a.cash - b.cash;
})

heap.push({ cash: 250, name: 'Valentina' })
heap.push({ cash: 300, name: 'Jano' })
heap.push({ cash: 150, name: 'Fran' )
heap.size // 3
heap.top() // { cash: 300, name: 'Jano' }
heap.pop() // { cash: 300, name: 'Jano' }
heap.size // 2
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
- Default: [BinaryHeap.DEFAULT_COMPARATOR](#BinaryHeap-DEFAULT_COMPARATOR-a-b)
- Returns: 
    - positive if `a` is great than `b`
    - negative if `a`is less than `b`
    - zero if `a` is equal to `b`

It is a function that binary heap uses internally to sort its elements.

### BinaryHeap.DEFAULT_COMPARATOR(a,b)

It is default comparator if any is passed to constructor and compares two `Number` or `String` objects. It is **static** property of `BinaryHeap`.

### .size
- Type: Number

The size of the binary heap.

**Time complexity:** *O(1)*

### .top()
- Type: Function
- Returns: Element of instance of `BinaryHeap`

Gets the top element of the binary heap.
Throws an `Error` when the heap is empty.

**Time complexity:** *O(1)*

### .pop()
- Type: Function
- Returns: Element of instance of `BinaryHeap`

Pops the top element of instance of binary heap.
Throws an `Error` when the heap is empty.

**Time complexity:** *O(log(n))* such that `n === this.size`

### .push(element)
- Type: Function
- Returns: Integer

Push the `element` at the binary heap and returns its new size.

**Time complexity:** *O(log(n))* such that `n === this.size`

### .heapify(array)
- Type: Function

Sets a new binary heap based on elements of `array` and keeps the same comparator.

**Time complexity:** *O(n)* such that `n === array.length`

## FAQ

##### Why do BinaryHeap have the property `size` and not length?

I wanted to keep the [ECMAScript 6 conventions](http://exploringjs.com/es6/ch_maps-sets.html#leanpub-auto-why-do-maps-and-sets-have-the-property-size-and-not-length).

##### Why do not methods `pop` or `top` throw an error when binary heap is empty?

I preferred intuitive API for javascript developers. Thus, I wanted to keep the same behaviour that other data structures as Array which doesn't throw an error when is empty and method `pop` is called.

## Testing

```
$ npm test
```

## Licence

MIT