# bheap

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

A javascript binary heap implementation

## Installation

``` bash
$ npm install bheap
```

## Usage

``` javascript
var BinaryHeap = require('bheap')

var heap = new BinaryHeap((a, b) => a.diameter - b.diameter)

heap.push({ diameter: 4878, name: 'Mercury' })
heap.push({ diameter: 139822, name: 'Jupiter' })
heap.push({ diameter: 12104, name: 'Venus' })
heap.size // 3
heap.top() // { diameter: 300, name: 'Jupiter' }
heap.pop() // { diameter: 300, name: 'Jupiter' }
heap.size // 2
```

## API

### constructor (comparator, [array])

It creates a `BinaryHeap` instance based on `comparator` order and filled with `array` elements. The top element of the binary heap is the maximum based on `comparator`

**Time complexity:** *O(n)* such that `n === array.length`

##### comparator(a, b)
- Type: Function
- Returns: 
    - positive if `a` is greater than `b`
    - negative if `a`is less than `b`
    - zero if `a` is equal to `b`

##### array
- Type: Array
- Default: []

Elements that are inserted in binary heap.

### .top()
- Type: Function
- Returns: Element of `BinaryHeap` instance

Gets the top element of the binary heap.
Returns `undefined` when the heap is empty.

**Time complexity:** *O(1)*

### .pop()
- Type: Function
- Returns: Element of instance of `BinaryHeap`

Pops the top element of instance of binary heap.
Returns `undefined` when the heap is empty.

**Time complexity:** *O(log(n))* such that `n === this.size`

### .push(element)
- Type: Function
- Returns: Integer

Push the `element` at the binary heap and returns its new size.

**Time complexity:** *O(log(n))* such that `n === this.size`

## FAQ

##### Why does BinaryHeap have the property `size` and not length?

I wanted to keep the [ECMAScript 6 conventions](http://exploringjs.com/es6/ch_maps-sets.html#_why-do-maps-and-sets-have-the-property-size-and-not-length).

##### Why do not methods `pop` or `top` throw an error when binary heap is empty?

I preferred intuitive API for javascript developers. Thus, I wanted to keep the same behaviour that other data structures as Array. An empty array does not throw an error when `pop` or `shift` is called. BinaryQueue neither.

## Testing

```
$ npm test
```

## License

MIT

  [1]: https://travis-ci.org/xgbuils/rearrange.svg?branch=master
  [2]: https://travis-ci.org/xgbuils/rearrange
  [3]: https://badge.fury.io/js/rearrange.svg
  [4]: https://badge.fury.io/js/rearrange
  [5]: https://coveralls.io/repos/github/xgbuils/rearrange/badge.svg?branch=master
  [6]: https://coveralls.io/github/xgbuils/rearrange?branch=master
  [7]: https://david-dm.org/xgbuils/rearrange.svg
  [8]: https://david-dm.org/xgbuils/rearrange