/**
 * Expose `BinaryHeap`.
 */
module.exports = BinaryHeap

/**
 * Initializes a new empty `BinaryHeap` with the given `comparator(a, b)`
 * function, uses `.DEFAULT_COMPARATOR()` when no function is provided.
 *
 * The comparator function must return a positive number when `a > b`, 0 when
 * `a == b` and a negative number when `a < b`.
 *
 * @api public
 * @param {(Array|Function)} [array=[]] - array of elements to insert in heap
 * or comparator function.
 * @param {Function} [comparator=BinaryHeap.DEFAULT_COMPARATOR] - function that
 * compares elements to sort binary heap.
 * @returns {BinaryHeap} create instance of binary heap class.
 * @complexity O(N) such that N = array.length
 */
function BinaryHeap(array, comparator) {
  if (!array || !Array.isArray(array)) {
      comparator = array
      array = []
  }
  this._comparator = typeof comparator === 'function'
      ? comparator : BinaryHeap.DEFAULT_COMPARATOR
  this.heapify(array)
}

/**
 * Compares `a` and `b`, when `a > b` it returns a positive number, when
 * it returns 0 and when `a < b` it returns a negative number.
 *
 * @api public
 * @param {String|Number} a - first parameter to compare
 * @param {String|Number} b - second parameter to compare
 * @returns {Number} indicates result of comparison
 */
BinaryHeap.DEFAULT_COMPARATOR = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  } else {
    a = a.toString()
    b = b.toString()

    if (a == b) return 0

    return (a > b) ? 1 : -1
  }
}

var BinaryHeapProto = BinaryHeap.prototype

/**
 * Returns the size of the binary heap.
 *
 * @api public
 * @returns {Number} size of heap
 * @complexity O(1)
 */
BinaryHeapProto.size = function() {
  return this._elements.length
}

/**
 * Returns whether the binary heap is empty or not.
 *
 * @api public
 * @returns {Boolean} indicates if binary heap is empty or not
 * @complexity O(1)
 */
BinaryHeapProto.isEmpty = function() {
  return this.size() === 0
}

/**
 * Peeks at the top element of the binary heap.
 *
 * @api public
 * @throws {Error} when the heap is empty.
 * @returns {*} element of binary heap
 * @complexity O(1)
 */
BinaryHeapProto.top = function() {
  if (this.isEmpty()) throw new Error('BinaryHeap is empty')

  return this._elements[0]
}

/**
 * Gets the top element of the binary heap.
 *
 * @api public
 * @returns {*} element of binary heap
 * @throws {Error} when the queue is empty.
 * @complexity O(log(N)) such that N === this.size()
 */
BinaryHeapProto.pop = function() {
  var first = this.top()
  var last = this._elements.pop()
  var size = this.size()

  if (size === 0) return first

  this._elements[0] = last

  sink.call(this, 0, size)

  return first
}

/**
 * Push the `element` at the binary heap and returns its new size.
 *
 * @api public
 * @param {*} element of binary heap
 * @returns {Number} new size of heap
 * @complexity O(log(N)) such that N === this.size()
 */
BinaryHeapProto.push = function(element) {
  var size = this._elements.push(element)
  var current = size - 1

  while (current > 0) {
    var parent = Math.floor((current - 1) / 2)

    if (_compare.call(this, current, parent) <= 0) break

    _swap.call(this, parent, current)
    current = parent
  }

  return size
}

/**
 *  Creates binary heap elements based on array
 *
 * @api public
 * @param {Array} arr - list of elements to set in binary heap
 * @returns {undefined} - void
 * @complexity O(N) such that N === arr.length
 */
BinaryHeapProto.heapify = function(arr) {
  var size = arr.length
  this._elements = [].concat(arr)

  for (var i = size / 2 - 1; i >= 0; --i) {
    sink.call(this, i, size)
  }
}

/**
 * Compares the values at position `a` and `b` in the binary heap using its
 * comparator function.
 *
 * @api private
 * @param {Number} a - position of first value
 * @param {Number} b - position of second value
 * @returns {Number} - number such that sign indicates the status of comparison
 */
function _compare(a, b) {
  return this._comparator(this._elements[a], this._elements[b])
}

/**
 * Swaps the values at position `a` and `b` in the binary heap.
 *
 * @api private
 * @param {Number} a - position of first value
 * @param {Number} b - position of second value
 * @returns {undefined}
 */
function _swap (a, b) {
  var aux = this._elements[a]
  this._elements[a] = this._elements[b]
  this._elements[b] = aux
}

function sink(current, size) {
  while (current < size) {
    var largest = current
    var left = (2 * current) + 1
    var right = left + 1

    if (left < size && _compare.call(this, left, largest) >= 0) {
      largest = left
    }

    if (right < size && _compare.call(this, right, largest) >= 0) {
      largest = right
    }

    if (largest === current) break

    _swap.call(this, largest, current)
    current = largest
  }
}
