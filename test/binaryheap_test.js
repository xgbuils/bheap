var BinaryHeap = require('../')
var chai = require('chai')
var expect = chai.expect
chai.should()

describe('BinaryHeap()', function() {
    it('returns an new BinaryHeap', function() {
        var heap = new BinaryHeap()
        heap.should.be.an.instanceOf(BinaryHeap)
    })

    it('accepts a comparator function', function() {
        var heap = new BinaryHeap(function(a, b) {
            return a - b
        })

        heap.should.be.an.instanceOf(BinaryHeap)
    })

    describe('.DEFAULT_COMPARATOR()', function() {
        context('given strings', function() {
            it('returns a negative number when a < b', function() {
                BinaryHeap.DEFAULT_COMPARATOR('jano', 'valentina').should.be.below(0)
            })

            it('returns 0 number when a == b', function() {
                BinaryHeap.DEFAULT_COMPARATOR('jano', 'jano').should.be.equal(0)
            })

            it('returns a positive number when a > b', function() {
                BinaryHeap.DEFAULT_COMPARATOR('jano', 'fran').should.be.above(0)
            })
        })

        context('given numbers', function() {
            it('returns a negative number when a < b', function() {
                BinaryHeap.DEFAULT_COMPARATOR(10, 1000).should.be.below(0)
            })

            it('returns 0 number when a == b', function() {
                BinaryHeap.DEFAULT_COMPARATOR(10, 10).should.be.equal(0)
            })

            it('returns a positive number when a > b', function() {
                BinaryHeap.DEFAULT_COMPARATOR(10, 1).should.be.above(0)
            })

            it('works with `Number` objects', function() {
                var a = Number(10)
                var b = Number(1000)
                BinaryHeap.DEFAULT_COMPARATOR(a, b).should.be.below(0)
            })
        })
    })

    describe('#isEmpty()', function() {
        it('returns true when the heap is empty', function() {
            var heap = new BinaryHeap()
            heap.isEmpty().should.be.equal(true)
        })

        it('returns false when the heap is not empty', function() {
            var heap = new BinaryHeap()
            heap.enq('jano')
            heap.isEmpty().should.be.equal(false)
        })
    })

    describe('#peek()', function() {
        it('fails when the heap is empty', function() {
            var heap = new BinaryHeap()
            expect(function() {
                heap.peek()
            }).to.Throw('BinaryHeap is empty')
        })

        it('returns the top element of the heap', function() {
            var heap = new BinaryHeap()
            heap.enq('jano')
            heap.enq('valentina')
            heap.enq('zombie')
            heap.enq('fran')
            heap.enq('albert')
            heap.enq('albert')
            heap.enq('frank')
            heap.peek().should.be.equal('zombie')
        })
    })

    describe('#deq()', function() {
        it('fails when the heap is empty', function() {
            var heap = new BinaryHeap()
            expect(function() {
                heap.deq()
            }).to.Throw('BinaryHeap is empty')
        })

        it('pops the top element of the heap', function() {
            var unsortedList = [
                'jano',
                'valentina',
                'zombie',
                'fran',
                'albert',
                'albert',
                'frank',
                'jano',
                'valentina',
                'zombie'
            ]
            var heap = unsortedList.reduce(function (heap, item) {
                heap.enq(item)
                return heap
            }, new BinaryHeap())
            var sortedList = []
            unsortedList.forEach(function () {
                sortedList.push(heap.deq())
            })
            sortedList.should.be.deep.equal([
                'zombie',
                'zombie',
                'valentina',
                'valentina',
                'jano',
                'jano',
                'frank',
                'fran',
                'albert',
                'albert'
            ])
            heap.isEmpty().should.be.equal(true)
        })

        it('not fails with only one element', function() {
            var heap = new BinaryHeap()
            heap.enq('jano')

            heap.deq().should.be.equal('jano')
            heap.size().should.be.equal(0)
        })

        it('works with custom comparators', function() {
            var unsortedList = [
                { priority: 100 },
                { priority: -1 },
                { priority: 0 },
                { priority: 5 }
            ]
            var heap = unsortedList.reduce(function (heap, item) {
                heap.enq(item)
                return heap
            }, new BinaryHeap(function(a, b) {
                return b.priority - a.priority
            }))

            var sortedList = []
            unsortedList.forEach(function () {
                sortedList.push(heap.deq())
            })

            sortedList.should.be.deep.equal([
                { priority: -1 },
                { priority: 0 },
                { priority: 5 },
                { priority: 100 }
            ])
            heap.isEmpty().should.be.equal(true)
        })
    })

    describe('#enq()', function() {
        it('pushes an element at the end of the heap', function() {
            var heap = new BinaryHeap()
            heap.enq('jano')
            heap.enq('valentina')
            heap.enq('fran')
            heap.peek().should.be.equal('valentina')
            heap.size().should.be.equal(3)
        })

        it('returns the new size of the heap', function() {
            var heap = new BinaryHeap()
            heap.enq('jano').should.be.equal(1)
        })

        it('works with custom comparators', function() {
            var unsortedList = [
                { priority: 100 },
                { priority: -1 },
                { priority: 0 },
                { priority: 5 }
            ]
            var heap = unsortedList.reduce(function (heap, item) {
                heap.enq(item)
                return heap
            }, new BinaryHeap(function(a, b) {
                return b.priority - a.priority
            }))

            heap.peek().should.be.deep.equal({ priority: -1 })
            heap.size().should.be.equal(4)
        })
    })

    describe('#size()', function() {
        it('returns 0 when the heap is empty', function() {
            var heap = new BinaryHeap()
            heap.size().should.be.equal(0)
        })

        it('returns the size of the heap', function() {
            var heap = new BinaryHeap()
            heap.enq('jano')
            heap.enq('valentina')
            heap.size().should.be.equal(2)
        })
    })

    describe('#forEach()', function() {
        it('iterates over all heap elements', function () {
            var heap = new BinaryHeap()
            heap.enq('a')
            heap.enq('b')
            var iteration = []

            heap.forEach(function(element, index) {
              iteration.push([element, index])
            })

            iteration.length.should.be.equal(2)
            iteration[0][0].should.be.equal('b')
            iteration[0][1].should.be.equal(0)
            iteration[1][0].should.be.equal('a')
            iteration[1][1].should.be.equal(1)
        })
    })

    describe('when there are elements with the same priority', function() {
        it('retains the queue behavior', function () {
            var heap = new BinaryHeap(function (a, b) { return b.pri - a.pri })
            var a = { pri: 1, val: 1 }
            var b = { pri: 1, val: 2 }
            var c = { pri: 1, val: 3 }
            heap.enq(a)
            heap.enq(b)
            heap.enq(c)

            heap.deq().should.be.equal(a)
            heap.deq().should.be.equal(b)
            heap.deq().should.be.equal(c)
        })
    })

    describe('#heapify()', function() {
        it('sets binary heap based on array', function () {
            var heap = new BinaryHeap()
            heap.heapify([1,8,4,3,7,2])

            heap.deq().should.be.equal(8)
            heap.deq().should.be.equal(7)
            heap.deq().should.be.equal(4)
            heap.deq().should.be.equal(3)
            heap.deq().should.be.equal(2)
            heap.deq().should.be.equal(1)
        })
    })
})
