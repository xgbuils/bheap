var PriorityQueue = require('../')
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('PriorityQueue()', function() {
    it('returns an new PriorityQueue', function() {
        var queue = new PriorityQueue()
        queue.should.be.an.instanceOf(PriorityQueue);
    });

    it('accepts a comparator function', function() {
        var queue = new PriorityQueue(function(a, b) {
            return a - b;
        });

        queue.should.be.an.instanceOf(PriorityQueue);
    });

    describe('.DEFAULT_COMPARATOR()', function() {
        context('given strings', function() {
            it('returns a negative number when a < b', function() {
                PriorityQueue.DEFAULT_COMPARATOR('jano', 'valentina').should.be.below(0);
            });

            it('returns 0 number when a == b', function() {
                PriorityQueue.DEFAULT_COMPARATOR('jano', 'jano').should.be.equal(0);
            });

            it('returns a positive number when a > b', function() {
                PriorityQueue.DEFAULT_COMPARATOR('jano', 'fran').should.be.above(0);
            });
        });

        context('given numbers', function() {
            it('returns a negative number when a < b', function() {
                PriorityQueue.DEFAULT_COMPARATOR(10, 1000).should.be.below(0);
            });

            it('returns 0 number when a == b', function() {
                PriorityQueue.DEFAULT_COMPARATOR(10, 10).should.be.equal(0);
            });

            it('returns a positive number when a > b', function() {
                PriorityQueue.DEFAULT_COMPARATOR(10, 1).should.be.above(0);
            });

            it('works with `Number` objects', function() {
                var a = Number(10)
                var b = Number(1000)
                PriorityQueue.DEFAULT_COMPARATOR(a, b).should.be.below(0);
            });
        });
    });

    describe('#isEmpty()', function() {
        it('returns true when the queue is empty', function() {
            var queue = new PriorityQueue();
            queue.isEmpty().should.be.equal(true);
        });

        it('returns false when the queue is not empty', function() {
            var queue = new PriorityQueue();
            queue.enq('jano');
            queue.isEmpty().should.be.equal(false);
        });
    });

    describe('#peek()', function() {
        it('fails when the queue is empty', function() {
            var queue = new PriorityQueue();
            expect(function() {
                queue.peek();
            }).to.Throw('PriorityQueue is empty');
        });

        it('returns the top element of the queue', function() {
            var queue = new PriorityQueue();
            queue.enq('jano');
            queue.enq('valentina');
            queue.enq('zombie');
            queue.enq('fran');
            queue.enq('albert');
            queue.enq('albert');
            queue.enq('frank');
            queue.peek().should.be.equal('zombie');
        });
    });

    describe('#deq()', function() {
        it('fails when the queue is empty', function() {
            var queue = new PriorityQueue();
            expect(function() {
                queue.deq();
            }).to.Throw('PriorityQueue is empty');
        });

        it('dequeues the top element of the queue', function() {
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
            ];
            var queue = unsortedList.reduce(function (queue, item) {
                queue.enq(item);
                return queue;
            }, new PriorityQueue());
            var sortedList = []
            unsortedList.forEach(function () {
                sortedList.push(queue.deq());
            });
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
            queue.isEmpty().should.be.equal(true);
        });

        it('not fails with only one element', function() {
            var queue = new PriorityQueue();
            queue.enq('jano');

            queue.deq().should.be.equal('jano');
            queue.size().should.be.equal(0);
        });

        it('works with custom comparators', function() {
            var unsortedList = [
                { priority: 100 },
                { priority: -1 },
                { priority: 0 },
                { priority: 5 }
            ];
            var queue = unsortedList.reduce(function (queue, item) {
                queue.enq(item);
                return queue;
            }, new PriorityQueue(function(a, b) {
                return b.priority - a.priority;
            }));

            var sortedList = []
            unsortedList.forEach(function () {
                sortedList.push(queue.deq());
            });

            sortedList.should.be.deep.equal([
                { priority: -1 },
                { priority: 0 },
                { priority: 5 },
                { priority: 100 }
            ]);
            queue.isEmpty().should.be.equal(true);
        });
    });

    describe('#enq()', function() {
        it('enqueues an element at the end of the queue', function() {
            var queue = new PriorityQueue();
            queue.enq('jano');
            queue.enq('valentina');
            queue.enq('fran');
            queue.peek().should.be.equal('valentina');
            queue.size().should.be.equal(3);
        });

        it('returns the new size of the queue', function() {
            var queue = new PriorityQueue();
            queue.enq('jano').should.be.equal(1);
        });

        it('works with custom comparators', function() {
            var unsortedList = [
                { priority: 100 },
                { priority: -1 },
                { priority: 0 },
                { priority: 5 }
            ];
            var queue = unsortedList.reduce(function (queue, item) {
                queue.enq(item);
                return queue;
            }, new PriorityQueue(function(a, b) {
                return b.priority - a.priority;
            }));

            queue.peek().should.be.deep.equal({ priority: -1 });
            queue.size().should.be.equal(4);
        });
    });

    describe('#size()', function() {
        it('returns 0 when the queue is empty', function() {
            var queue = new PriorityQueue();
            queue.size().should.be.equal(0);
        });

        it('returns the size of the queue', function() {
            var queue = new PriorityQueue();
            queue.enq('jano');
            queue.enq('valentina');
            queue.size().should.be.equal(2);
        });
    });

    describe('#forEach()', function() {
        it('iterates over all queue elements', function () {
            var queue = new PriorityQueue();
            queue.enq('a');
            queue.enq('b');
            var iteration = [];

            queue.forEach(function(element, index) {
              iteration.push([element, index]);
            });

            iteration.length.should.be.equal(2);
            iteration[0][0].should.be.equal('b');
            iteration[0][1].should.be.equal(0);
            iteration[1][0].should.be.equal('a');
            iteration[1][1].should.be.equal(1);
        });
    });

    describe('when there are elements with the same priority', function() {
        it('retains the queue behavior', function () {
            var queue = new PriorityQueue(function (a, b) { return b.pri - a.pri; });
            var a = { pri: 1, val: 1 }
            var b = { pri: 1, val: 2 }
            var c = { pri: 1, val: 3 }
            queue.enq(a);
            queue.enq(b);
            queue.enq(c);

            queue.deq().should.be.equal(a);
            queue.deq().should.be.equal(b);
            queue.deq().should.be.equal(c);
        });
    });

    describe('#heapify()', function() {
        it('sets priority queue based on array', function () {
            var queue = new PriorityQueue();
            queue.heapify([1,8,4,3,7,2]);

            queue.deq().should.be.equal(8);
            queue.deq().should.be.equal(7);
            queue.deq().should.be.equal(4);
            queue.deq().should.be.equal(3);
            queue.deq().should.be.equal(2);
            queue.deq().should.be.equal(1);
        });
    });
});
