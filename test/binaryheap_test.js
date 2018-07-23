const BinaryHeap = require('../')
const test = require('tape')
const tapSpec = require('tap-spec')

const UNSORTED_LIST = () => ([
    'jam',
    'vision',
    'zombie',
    'fee',
    'animal',
    'animal',
    'feed'
])

const SORTED_LIST = () => ([
    'zombie',
    'vision',
    'jam',
    'feed',
    'fee',
    'animal',
    'animal'
])

const COMPLEX_UNSORTED_LIST = () => ([
    { priority: 100 },
    { priority: -1 },
    { priority: 0 },
    { priority: 5 }
])

const COMPLEX_SORTED_LIST = () => ([
    { priority: -1 },
    { priority: 0 },
    { priority: 5 },
    { priority: 100 }
])

const stringComparator = (a, b) => {
    if (a === b) {
        return 0
    } else if (a > b) {
        return 1
    }
    return -1
}
const numberComparator = (a, b) => a - b

const createHeap = (comparator, list) => {
    const heap = new BinaryHeap(comparator)
    list.forEach((item) => heap.push(item))
    return heap
}

const extractSortedItems = (heap) => {
    const size = heap.size
    const sortedItems = []
    for (let index = 0; index < size; ++index) {
        sortedItems.push(heap.pop())
    }
    return sortedItems
}

test('BinaryHeap', function(t) {
    t.test('.top', function(t) {
        t.doesNotThrow(function() {
            const heap = new BinaryHeap()
            heap.top()
        }, 'does not fail when the heap is empty')

        t.equals(
            new BinaryHeap().top(),
            undefined,
            'returns undefined when the heap is empty')

        t.equals(
            createHeap(stringComparator, UNSORTED_LIST()).top(),
            'zombie',
            'returns the top element of the heap')

        t.end()
    })

    t.test('.pop', function(t) {
        t.doesNotThrow(function() {
            const heap = new BinaryHeap()
            heap.pop()
        }, 'does not fail when the heap is empty')

        t.equals(
            new BinaryHeap().pop(),
            undefined,
            'returns undefined when the heap is empty')

        t.equals(
            createHeap(stringComparator, UNSORTED_LIST()).pop(),
            'zombie',
            'returns the top element of the heap')

        t.equals((() => {
            const heap = createHeap(stringComparator, UNSORTED_LIST())
            heap.pop()
            return heap.size
        })(), UNSORTED_LIST().length - 1, 'the heap size is decreased 1 after popping 1 item')

        t.deepEquals((() => {
            const heap = createHeap(stringComparator, UNSORTED_LIST())
            return extractSortedItems(heap)
        })(), SORTED_LIST(), 'pop returns items starting from the maximum value and decreasing to the minimum value')

        t.equals((() => {
            const heap = createHeap(stringComparator, UNSORTED_LIST())
            extractSortedItems(heap)
            return heap.size
        })(), 0, 'the heap size is 0 after popping all the elements')

        t.equals(
            createHeap(stringComparator, ['jam']).pop(),
            'jam',
            'when list has just one element, it returns this element')

        t.equals((() => {
            const heap = createHeap(stringComparator, ['jam'])
            heap.pop()
            return heap.size
        })(),
        0,
        'when list has just one element, the size is 0 after popping')

        t.deepEquals((() => {
            const heap = createHeap((a, b) => b.priority - a.priority, COMPLEX_UNSORTED_LIST())
            return extractSortedItems(heap)
        })(), COMPLEX_SORTED_LIST(), 'it works with custom comparators')

        t.end()
    })

    t.test('.push', function(t) {
        t.equals((() => {
            const heap = new BinaryHeap(stringComparator)
            heap.push('jam')
            heap.push('vision')
            heap.push('feed')
            return heap.top()
        })(), 'vision', 'pushes elements at the end of the heap')

        t.equals((() => {
            const heap = new BinaryHeap(stringComparator)
            heap.push('animal')
            heap.push('zoo')
            return heap.size
        })(), 2, 'increases the size of the heap')

        t.equals((() => {
            const heap = new BinaryHeap(stringComparator)
            return heap.push('jam')
        })(), 1, 'returns the new size of the heap')

        t.deepEquals((() => {
            const heap = new BinaryHeap((a, b) => b.priority - a.priority)
            COMPLEX_SORTED_LIST().forEach((item) => heap.push(item))
            return heap.top()
        })(), { priority: -1 }, 'works with complex comparators')

        t.end()
    })

    t.test('.size', function(t) {
        t.equals(
            new BinaryHeap().size,
            0,
            'returns 0 when the heap is empty')

        t.equals((() => {
            const heap = new BinaryHeap(stringComparator)
            heap.push('jam')
            heap.push('vision')
            heap.size = 0
            return heap.size
        })(), 2, 'the size of the heap is read-only')

        t.end()
    })

    t.test('when there are elements with the same priority', function(t) {
        const a = () => ({ pri: 1,
            val: 1 })
        const b = () => ({ pri: 1,
            val: 2 })
        const c = () => ({ pri: 1,
            val: 3 })

        t.deepEquals((() => {
            const heap = new BinaryHeap((a, b) => b.pri - a.pri)
            heap.push(a())
            heap.push(b())
            heap.push(c())
            return extractSortedItems(heap)
        })(), [a(), b(), c()], 'retains the queue behavior')

        t.end()
    })

    t.test('.heapify', function(t) {
        t.deepEquals((() => {
            const heap = new BinaryHeap(numberComparator)
            heap.heapify([1, 8, 4, 3, 7, 2])
            return extractSortedItems(heap)
        })(), [8, 7, 4, 3, 2, 1], 'sets binary heap based on array')

        t.deepEquals((() => {
            const heap = new BinaryHeap(numberComparator)
            heap.heapify([1, 2, 3])
            return extractSortedItems(heap)
        })(), [3, 2, 1], 'sets binary heap based on array with 3 elements (permutation 1)')

        t.deepEquals((() => {
            const heap = new BinaryHeap(numberComparator)
            heap.heapify([1, 3, 2])
            return extractSortedItems(heap)
        })(), [3, 2, 1], 'sets binary heap based on array with 3 elements (permutation 2)')

        t.deepEquals((() => {
            const heap = new BinaryHeap(numberComparator)
            heap.heapify([2, 1, 3])
            return extractSortedItems(heap)
        })(), [3, 2, 1], 'sets binary heap based on array with 3 elements (permutation 3)')

        t.deepEquals((() => {
            const heap = new BinaryHeap(numberComparator)
            heap.heapify([2, 3, 1])
            return extractSortedItems(heap)
        })(), [3, 2, 1], 'sets binary heap based on array with 3 elements (permutation 4)')

        t.deepEquals((() => {
            const heap = new BinaryHeap(numberComparator)
            heap.heapify([3, 1, 2])
            return extractSortedItems(heap)
        })(), [3, 2, 1], 'sets binary heap based on array with 3 elements (permutation 5)')

        t.deepEquals((() => {
            const heap = new BinaryHeap(numberComparator)
            heap.heapify([3, 2, 1])
            return extractSortedItems(heap)
        })(), [3, 2, 1], 'sets binary heap based on array with 3 elements (permutation 6)')

        t.end()
    })
})

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout)
