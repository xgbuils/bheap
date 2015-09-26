# bheap

A javascript binary heap implementation for Node.js and the browser.

## Installation

As npm for Node.js:

```
$ npm install bheap
```

## Example

```js
var BinaryHeap = require('bheap');

var heap = new BinaryHeap(function(a, b) {
  return a.cash - b.cash;
});

heap.enq({ cash: 250, name: 'Valentina' });
heap.enq({ cash: 300, name: 'Jano' });
heap.enq({ cash: 150, name: 'Fran' );
heap.size(); // 3
heap.peek(); // { cash: 300, name: 'Jano' }
heap.deq(); // { cash: 300, name: 'Jano' }
heap.size(); // 2
```

## API

### constructor ()

Initializes a new empty `BinaryHeap` which uses `.DEFAULT_COMPARATOR()` as
the comparator function for its elements.

### BinaryHeap(comparator)

Initializes a new empty `BinaryHeap` which uses the given `comparator(a, b)`
function as the comparator for its elements.

The comparator function must return a positive number when `a > b`, 0 when
`a == b` and a negative number when `a < b`.

### BinaryHeap.DEFAULT_COMPARATOR(a, b)

Compares two `Number` or `String` objects.

### BinaryHeap#deq()

Pops the top element of the binary heap.
Throws an `Error` when the heap is empty.

### BinaryHeap#enq(element)

Push the `element` at the binary heap and returns its new size.

### BinaryHeap#forEach(fn)

Executes `fn` on each element. Just be careful to not modify the priorities,
since the heap won't reorder itself.

### BinaryHeap#isEmpty()

Returns whether the binary heap is empty or not.

### BinaryHeap#peek()

Peeks at the top element of the binary heap.
Throws an `Error` when the heap is empty.

### BinaryHeap#size()

Returns the size of the binary heap.

## Testing

As component in the browser, open test/test.html in your browser:

```
$ make
$ open test/test.html
```

As npm package:

```
$ npm test
```

## Licence

MIT
