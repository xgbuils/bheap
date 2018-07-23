/**
 * Expose `BinaryHeap`.
 */
module.exports = BinaryHeap

/**
 * Given comparator and array, it creates a BinaryHeap instance determined by the comparator
 * order filled with the array elements.
 *
 * The comparator function must receive two element arguments and return:
 * - a positive number when first argument is greater than second
 * - 0 when first argument is equal to the second
 * - negative number when first argument is lower than the second
 *
 * @api public
 * @param {Function} comparator - function which compares elements.
 * @param {Array} [array=[]] - array of elements to insert in heap.
 * or comparator function if array does not passed.

 * @returns {BinaryHeap} create instance of binary heap class.
 * @complexity O(N) such that N = array.length
 */
function BinaryHeap(comparator, array) {
    this._comparator = comparator
    this.heapify(array || [])
}

const BinaryHeapProto = BinaryHeap.prototype

/**
 * Returns the size of the binary heap.
 *
 * @api public
 * @returns {Number} size of heap
 * @complexity O(1)
 */
Object.defineProperty(BinaryHeapProto, 'size', {
    get() {
        return this._elements.length
    }
})

/**
 * Peeks at the top element of the binary heap.
 *
 * @api public
 * @returns {*} element of binary heap
 * @complexity O(1)
 */
BinaryHeapProto.top = function() {
    return this._elements[0]
}

/**
 * Gets the top element of the binary heap.
 *
 * @api public
 * @returns {*} element of binary heap
 * @complexity O(log(N)) such that N === this.size
 */
BinaryHeapProto.pop = function() {
    const first = this.top()
    const last = this._elements.pop()
    const size = this.size

    if (size > 0) {
        this._elements[0] = last
        sink.call(this, 0, size)
    }
    return first
}

/**
 * Push the `element` at the binary heap and returns its new size.
 *
 * @api public
 * @param {*} element of binary heap
 * @returns {Number} new size of heap
 * @complexity O(log(N)) such that N === this.size
 */
BinaryHeapProto.push = function(element) {
    const size = this._elements.push(element)
    let current = size - 1

    while (current > 0) {
        const parent = Math.floor((current - 1) / 2)

        if (_compare.call(this, current, parent) <= 0) {
            break
        }

        _swap.call(this, parent, current)
        current = parent
    }

    return size
}

/**
 *  Creates binary heap elements based on array
 *
 * @api public
 * @param {Array} array - list of elements to set in binary heap
 * @returns {undefined} - void
 * @complexity O(N) such that N === arr.length
 */
BinaryHeapProto.heapify = function(array) {
    const size = array.length
    this._elements = [].concat(array)

    for (let i = Math.floor(0.5 * size) - 1; i >= 0; --i) {
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
function _swap(a, b) {
    const aux = this._elements[a]
    this._elements[a] = this._elements[b]
    this._elements[b] = aux
}

function sink(current, size) {
    while (current < size) {
        let largest = current
        const left = (2 * current) + 1
        const right = left + 1

        if (left < size && _compare.call(this, left, largest) >= 0) {
            largest = left
        }

        if (right < size && _compare.call(this, right, largest) >= 0) {
            largest = right
        }

        if (largest === current) {
            break
        }

        _swap.call(this, largest, current)
        current = largest
    }
}
