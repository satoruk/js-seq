# JS-Seq

[![Circle CI](https://circleci.com/gh/satoruk/js-seq.svg?style=svg)](https://circleci.com/gh/satoruk/js-seq)


```
import Seq from 'js-seq';
const seq = new Seq();

seq.next();    // => 1
seq.next();    // => 2
seq.current(); // => 2

const prop1 = 'prop1';
seq.next(prop1); // => 1
seq.next();      // => 3

const prop2 = (v) => `sec[${v}]`;
seq.nextValue(prop2); // => seq[1]
seq.next(prop2);      // => 2

const prop2 = 'prop2';
seq.define(prop2, (v) => `[${v}]`);
seq.nextValue(prop2); // => [1]
seq.next(prop2);      // => 2
```

