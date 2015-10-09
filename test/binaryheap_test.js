var BinaryHeap = require('../')
var chai = require('chai')
var expect = chai.expect

describe('BinaryHeap()', function() {
    it('returns an new BinaryHeap', function() {
        var heap = new BinaryHeap()
        expect(heap).to.be.an.instanceOf(BinaryHeap)
    })

    it('accepts a comparator function', function() {
        var heap = new BinaryHeap(function(a, b) {
            return a - b
        })

        expect(heap).to.be.an.instanceOf(BinaryHeap)
    })

    describe('.DEFAULT_COMPARATOR()', function() {
        context('given strings', function() {
            it('returns a negative number when a < b', function() {
                console.log(BinaryHeap.DEFAULT_COMPARATOR('jano', 'valentina'))
                expect(BinaryHeap.DEFAULT_COMPARATOR('jano', 'valentina')).to.be.below(0)
            })

            it('returns 0 number when a == b', function() {
                console.log(BinaryHeap.DEFAULT_COMPARATOR('jano', 'jano'))
                expect(BinaryHeap.DEFAULT_COMPARATOR('jano', 'jano')).to.be.equal(0)
            })

            it('returns a positive number when a > b', function() {
                console.log(BinaryHeap.DEFAULT_COMPARATOR('jano', 'fran'))
                expect(BinaryHeap.DEFAULT_COMPARATOR('jano', 'fran')).to.be.above(0)
            })
        })

        context('given numbers', function() {
            it('returns a negative number when a < b', function() {
                expect(BinaryHeap.DEFAULT_COMPARATOR(10, 1000)).to.be.below(0)
            })

            it('returns 0 number when a == b', function() {
                expect(BinaryHeap.DEFAULT_COMPARATOR(10, 10)).to.be.equal(0)
            })

            it('returns a positive number when a > b', function() {
                expect(BinaryHeap.DEFAULT_COMPARATOR(10, 1)).to.be.above(0)
            })

            it('works with `Number` objects', function() {
                var a = Number(10)
                var b = Number(1000)
                expect(BinaryHeap.DEFAULT_COMPARATOR(a, b)).to.be.below(0)
            })
        })
    })

    describe('#top()', function() {
        it('does not fail when the heap is empty', function() {
            var heap = new BinaryHeap()
            expect(function() {
                heap.top()
            }).to.not.Throw('BinaryHeap is empty')
        })

        it('returns undefined when the heap is empty', function() {
            var heap = new BinaryHeap()
            expect(heap.top()).to.equal(undefined)
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
            expect(heap.top()).to.be.equal('zombie')
        })
    })

    describe('#pop()', function() {
        it('does not fail when the heap is empty', function() {
            var heap = new BinaryHeap()
            expect(function() {
                heap.pop()
            }).to.not.Throw('BinaryHeap is empty')
        })

        it('returns undefined when the heap is empty', function() {
            var heap = new BinaryHeap()
            expect(heap.pop()).to.equal(undefined)
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
            expect(sortedList).to.be.deep.equal([
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
            expect(heap.size).to.be.equal(0)
        })

        it('not fails with only one element', function() {
            var heap = new BinaryHeap()
            heap.push('jano')

            expect(heap.pop()).to.be.equal('jano')
            expect(heap.size).to.be.equal(0)
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

            expect(sortedList).to.be.deep.equal([
                { priority: -1 },
                { priority: 0 },
                { priority: 5 },
                { priority: 100 }
            ])
            expect(heap.size).to.be.equal(0)
        })
    })

    describe('#push()', function() {
        it('pushes an element at the end of the heap', function() {
            var heap = new BinaryHeap()
            heap.push('jano')
            heap.push('valentina')
            heap.push('fran')
            expect(heap.top()).to.be.equal('valentina')
            expect(heap.size).to.be.equal(3)
        })

        it('returns the new size of the heap', function() {
            var heap = new BinaryHeap()
            expect(heap.push('jano')).to.be.equal(1)
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

            expect(heap.top()).to.be.deep.equal({ priority: -1 })
            expect(heap.size).to.be.equal(4)
        })
    })

    describe('#size', function() {
        it('returns 0 when the heap is empty', function() {
            var heap = new BinaryHeap()
            expect(heap.size).to.be.equal(0)
        })

        it('returns the size of the heap', function() {
            var heap = new BinaryHeap()
            heap.push('jano')
            heap.push('valentina')
            heap.size = 0
            expect(heap.size).to.be.equal(2)
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

            expect(heap.pop()).to.be.equal(a)
            expect(heap.pop()).to.be.equal(b)
            expect(heap.pop()).to.be.equal(c)
        })
    })

    describe('#heapify()', function() {
        it('sets binary heap based on array', function () {
            var heap = new BinaryHeap()
            heap.heapify([1,8,4,3,7,2])

            expect(heap.pop()).to.be.equal(8)
            expect(heap.pop()).to.be.equal(7)
            expect(heap.pop()).to.be.equal(4)
            expect(heap.pop()).to.be.equal(3)
            expect(heap.pop()).to.be.equal(2)
            expect(heap.pop()).to.be.equal(1)
        })

        it('sets binary heap based on array with odd elements', function () {
            var heap = new BinaryHeap()
            heap.heapify([3,1,2])
            
        })
    })
})
