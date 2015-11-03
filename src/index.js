
export const DEFAULT_PROPERTY = 'default';

export default class Seq {

  constructor() {
    this.sequences = {};
    this.funcs = {};
  }

  evalute(value, property = DEFAULT_PROPERTY) {
    const func = this.currentFunc(property);
    if (func) {
      return func(value);
    }
    if (typeof property === 'function') {
      return property(value);
    }
    return value;
  }

  currentFunc(property = DEFAULT_PROPERTY) {
    let value = this.funcs[property];
    if (typeof value === 'function') {
      return value;
    }
  }

  current(property = DEFAULT_PROPERTY) {
    let value = this.sequences[property];
    if (typeof value === 'undefined') {
      value = 0;
    }
    return value;
  }

  currentValue(property = DEFAULT_PROPERTY) {
    const value = this.current(property);
    return this.evalute(value, property);
  }

  next(property = DEFAULT_PROPERTY) {
    return this.sequences[property] = this.current(property) + 1;
  }

  nextValue(property = DEFAULT_PROPERTY) {
    const value = this.next(property);
    return this.evalute(value, property);
  }

  reset(property = DEFAULT_PROPERTY) {
    this.sequences[property] = 0;
  }

  resetAll() {
    this.sequences = {};
  }

  define(property, func) {
    if (typeof func !== 'function') {
      return;
    }
    this.funcs[property] = func;
  }
}
