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

const createHeap = (list, comparator) => {
    const heap = new BinaryHeap(comparator)
    list.forEach(item => heap.push(item))
    return heap
}

test('BinaryHeap', function(t) {
    t.test('.DEFAULT_COMPARATOR()', function(t) {
        t.test('given strings', function(t) {
            t.equals(
                BinaryHeap.DEFAULT_COMPARATOR('jano', 'valentina'),
                -1,
                'returns a negative number when a < b')

            t.equals(
                BinaryHeap.DEFAULT_COMPARATOR('foobar', 'foobar'),
                0,
                'returns 0 when a == b')

            t.equals(
                BinaryHeap.DEFAULT_COMPARATOR('zzz', 'aaa'),
                1,
                'returns a positive number when a > b')

            t.end()
        })

        t.test('given numbers', function(t) {
            t.ok(
                BinaryHeap.DEFAULT_COMPARATOR(10, 1000) < 0,
                'returns a negative number when a < b')

            t.equals(
                BinaryHeap.DEFAULT_COMPARATOR(10, 10),
                0,
                'returns 0 when a == b')

            t.ok(
                BinaryHeap.DEFAULT_COMPARATOR(10, 1) > 0,
                'returns a positive number when a > b')

            t.end()
        })
    })

    t.test('.top', function(t) {
        t.doesNotThrow(function() {
            const heap = new BinaryHeap(t)
            heap.top()
        }, 'does not fail when the heap is empty')

        t.equals(
            new BinaryHeap().top(),
            undefined,
            'returns undefined when the heap is empty')

        t.equals(
            createHeap(UNSORTED_LIST()).top(),
            'zombie',
            'returns the top element of the heap')

        t.end()
    })

    t.test('.pop', function(t) {
        t.doesNotThrow(function() {
            const heap = new BinaryHeap(t)
            heap.pop()
        }, 'does not fail when the heap is empty')

        t.equals(
            new BinaryHeap().pop(),
            undefined,
            'returns undefined when the heap is empty')

        t.equals(
            createHeap(UNSORTED_LIST()).pop(),
            'zombie',
            'returns the top element of the heap')

        t.equals((() => {
            const heap = createHeap(UNSORTED_LIST())
            heap.pop()
            return heap.size
        })(), UNSORTED_LIST().length - 1, 'the heap size is decreased 1 after popping 1 item')

        t.deepEquals((() => {
            const heap = createHeap(UNSORTED_LIST())
            const size = heap.size
            const sortedItems = []
            for (let index = 0; index < size; ++index) {
                sortedItems.push(heap.pop())
            }
            return sortedItems
        })(), SORTED_LIST(), 'pop returns items starting from the maximum value and decreasing to the minimum value')

        t.equals((() => {
            const heap = createHeap(UNSORTED_LIST())
            const size = heap.size
            const sortedItems = []
            for (let index = 0; index < size; ++index) {
                sortedItems.push(heap.pop())
            }
            return heap.size
        })(), 0, 'the heap size is after popping all the elements')

        t.equals(
            createHeap(['jam']).pop(),
            'jam',
            'when list has just one element, it returns this element')

        t.equals((() => {
            const heap = createHeap(['jam'])
            heap.pop()
            return heap.size
        })(),
        0,
        'when list has just one element, the size is 0 after popping')

        t.deepEquals((() => {
            const heap = createHeap(COMPLEX_UNSORTED_LIST(), (a, b) => b.priority - a.priority)
            const size = heap.size
            const sortedItems = []
            for (let index = 0; index < size; ++index) {
                sortedItems.push(heap.pop())
            }
            return sortedItems
        })(), COMPLEX_SORTED_LIST(), 'it works with custom comparators')

        t.end()
    })

    t.test('.push', function(t) {
        t.equals((() => {
            const heap = new BinaryHeap()
            heap.push('jam')
            heap.push('vision')
            heap.push('feed')
            return heap.top()
        })(), 'vision', 'pushes elements at the end of the heap')

        t.equals((() => {
            const heap = new BinaryHeap()
            heap.push('animal')
            heap.push('zoo')
            return heap.size
        })(), 2, 'increases the size of the heap')

        t.equals((() => {
            const heap = new BinaryHeap()
            return heap.push('jam')
        })(), 1, 'returns the new size of the heap')

        t.deepEquals((() => {
            const heap = new BinaryHeap((a, b) => b.priority - a.priority)
            COMPLEX_SORTED_LIST().forEach(item => heap.push(item))

            return heap.top()
        })(), { priority: -1 }, 'works with custom comparators')

        t.end()
    })

    t.test('.size', function(t) {
        t.equals(
            new BinaryHeap().size,
            0,
            'returns 0 when the heap is empty')

        t.equals((() => {
            const heap = new BinaryHeap()
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
            const size = heap.size

            const sortedItems = []
            for (let index = 0; index < size; ++index) {
                sortedItems.push(heap.pop())
            }

            return sortedItems
        })(), [a(), b(), c()], 'retains the queue behavior')

        t.end()
    })

    t.test('.heapify', function(t) {
        t.deepEquals((() => {
            const heap = new BinaryHeap()
            heap.heapify([1, 8, 4, 3, 7, 2])
            const sortedItems = []
            while (heap.size) {
                sortedItems.push(heap.pop())
            }

            return sortedItems
        })(), [8, 7, 4, 3, 2, 1], 'sets binary heap based on array')

        t.deepEquals((() => {
            const heap = new BinaryHeap()
            heap.heapify([3, 1, 2])
            const sortedItems = []
            while (heap.size) {
                sortedItems.push(heap.pop())
            }

            return sortedItems
        })(), [3, 2, 1], 'sets binary heap based on array with odd elements')

        t.end()
    })
})

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout)
