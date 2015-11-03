
var assert = require('assert');
import Seq from '../src/index.js';

describe('Seq', () => {
  let subject;

  beforeEach(() => {
    subject = new Seq();
  });

  describe('#evalute(value, property)', () => {
    it('should be evaluted with DEFAULT_PROPERTY', () => {
      assert.equal(subject.evalute(1), 1);
    });

    it('should be evaluted with "other" property', () => {
      assert.equal(subject.evalute(1, 'other'), 1);
    });

    it('should be evaluted by a function', () => {
      assert.equal(subject.evalute(1, (v)=> `[${v}]`), '[1]');
    });

    it('should be evaluted by defined function', () => {
      const property = 'prop';
      subject.define(property, (v)=> `[${v}]`);
      assert.equal(subject.evalute(1, property), '[1]');
    });
  });

  describe('#current(property)', () => {
    it('should be get current pointer at DEFAULT_PROPERTY', () => {
      assert.equal(subject.current(), 0);
      assert.equal(subject.next(), 1);
      assert.equal(subject.current(), 1);
    });

    it('should be count up at other property', () => {
      const property = 'unknown';
      assert.equal(subject.current(property), 0);
      assert.equal(subject.next(property), 1);
      assert.equal(subject.current(property), 1);
    });

    it('should be count up at function', () => {
      const property = (v) => `[${v}]`;
      assert.equal(subject.current(property), 0);
      assert.equal(subject.next(property), 1);
      assert.equal(subject.current(property), 1);
    });
  });

  describe('#currentValue(property)', () => {
    it('should be get current pointer at DEFAULT_PROPERTY', () => {
      assert.equal(subject.currentValue(), 0);
      assert.equal(subject.next(), 1);
      assert.equal(subject.currentValue(), 1);
    });

    it('should be count up at other property', () => {
      const property = 'unknown';
      assert.equal(subject.currentValue(property), 0);
      assert.equal(subject.next(property), 1);
      assert.equal(subject.currentValue(property), 1);
    });

    it('should be count up at function', () => {
      const property = (v) => `[${v}]`;
      assert.equal(subject.currentValue(property), '[0]');
      assert.equal(subject.next(property), 1);
      assert.equal(subject.currentValue(property), '[1]');
    });
  });

  describe('#next(property)', () => {
    it('should be count up at DEFAULT_PROPERTY', () => {
      assert.equal(subject.next(), 1);
      assert.equal(subject.next(), 2);
      assert.equal(subject.next('default'), 3);
    });

    it('should be count up at other property', () => {
      const property = 'unknown';
      assert.equal(subject.next(property), 1);
      assert.equal(subject.next(property), 2);
    });

    it('should be count up at function', () => {
      const property = (v) => `[${v}]`;
      assert.equal(subject.next(property), 1);
      assert.equal(subject.next(property), 2);
    });
  });

  describe('#nextValue(property)', () => {
    it('should be count up at DEFAULT_PROPERTY', () => {
      assert.equal(subject.nextValue(), 1);
      assert.equal(subject.nextValue(), 2);
      assert.equal(subject.nextValue('default'), 3);
    });

    it('should be count up at other property', () => {
      const property = 'unknown';
      assert.equal(subject.nextValue(property), 1);
      assert.equal(subject.nextValue(property), 2);
    });

    it('should be count up at function', () => {
      const property = (v) => `[${v}]`;
      assert.equal(subject.nextValue(property), '[1]');
      assert.equal(subject.nextValue(property), '[2]');
    });
  });

  describe('#reset(property)', () => {
    it('should be reset at DEFAULT_PROPERTY', () => {
      subject.next();
      subject.reset();
      assert.equal(subject.current(), 0);
    });
  });

  describe('#resetAll()', () => {
    it('should be reset at all', () => {
      subject.next();
      subject.resetAll();
      assert.equal(subject.current(), 0);
    });
  });

  describe('#define(property, func)', () => {
    it('should', () => {
      const property = 'default';
      subject.define(property, (v) => `[${v}]`);
      assert.equal(subject.currentValue(property), '[0]');
      assert.equal(subject.nextValue(property), '[1]');
    });
  });
});
