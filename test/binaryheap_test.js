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
            heap.push('jano')
            heap.isEmpty().should.be.equal(false)
        })
    })

    describe('#top()', function() {
        it('fails when the heap is empty', function() {
            var heap = new BinaryHeap()
            expect(function() {
                heap.top()
            }).to.Throw('BinaryHeap is empty')
        })

        it('returns the top element of the heap', function() {
            var heap = new BinaryHeap()
            heap.push('jano')
            heap.push('valentina')
            heap.push('zombie')
            heap.push('fran')
            heap.push('albert')
            heap.push('albert')
            heap.push('frank')
            heap.top().should.be.equal('zombie')
        })
    })

    describe('#pop()', function() {
        it('fails when the heap is empty', function() {
            var heap = new BinaryHeap()
            expect(function() {
                heap.pop()
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
                heap.push(item)
                return heap
            }, new BinaryHeap())
            var sortedList = []
            unsortedList.forEach(function () {
                sortedList.push(heap.pop())
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
            heap.push('jano')

            heap.pop().should.be.equal('jano')
            heap.size.should.be.equal(0)
        })

        it('works with custom comparators', function() {
            var unsortedList = [
                { priority: 100 },
                { priority: -1 },
                { priority: 0 },
                { priority: 5 }
            ]
            var heap = unsortedList.reduce(function (heap, item) {
                heap.push(item)
                return heap
            }, new BinaryHeap(function(a, b) {
                return b.priority - a.priority
            }))

            var sortedList = []
            unsortedList.forEach(function () {
                sortedList.push(heap.pop())
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

    describe('#push()', function() {
        it('pushes an element at the end of the heap', function() {
            var heap = new BinaryHeap()
            heap.push('jano')
            heap.push('valentina')
            heap.push('fran')
            heap.top().should.be.equal('valentina')
            heap.size.should.be.equal(3)
        })

        it('returns the new size of the heap', function() {
            var heap = new BinaryHeap()
            heap.push('jano').should.be.equal(1)
        })

        it('works with custom comparators', function() {
            var unsortedList = [
                { priority: 100 },
                { priority: -1 },
                { priority: 0 },
                { priority: 5 }
            ]
            var heap = unsortedList.reduce(function (heap, item) {
                heap.push(item)
                return heap
            }, new BinaryHeap(function(a, b) {
                return b.priority - a.priority
            }))

            heap.top().should.be.deep.equal({ priority: -1 })
            heap.size.should.be.equal(4)
        })
    })

    describe('#size', function() {
        it('returns 0 when the heap is empty', function() {
            var heap = new BinaryHeap()
            heap.size.should.be.equal(0)
        })

        it('returns the size of the heap', function() {
            var heap = new BinaryHeap()
            heap.push('jano')
            heap.push('valentina')
            heap.size = 0
            heap.size.should.be.equal(2)
        })
    })

    describe('when there are elements with the same priority', function() {
        it('retains the queue behavior', function () {
            var heap = new BinaryHeap(function (a, b) { return b.pri - a.pri })
            var a = { pri: 1, val: 1 }
            var b = { pri: 1, val: 2 }
            var c = { pri: 1, val: 3 }
            heap.push(a)
            heap.push(b)
            heap.push(c)

            heap.pop().should.be.equal(a)
            heap.pop().should.be.equal(b)
            heap.pop().should.be.equal(c)
        })
    })

    describe('#heapify()', function() {
        it('sets binary heap based on array', function () {
            var heap = new BinaryHeap()
            heap.heapify([1,8,4,3,7,2])

            heap.pop().should.be.equal(8)
            heap.pop().should.be.equal(7)
            heap.pop().should.be.equal(4)
            heap.pop().should.be.equal(3)
            heap.pop().should.be.equal(2)
            heap.pop().should.be.equal(1)
        })
    })
})
