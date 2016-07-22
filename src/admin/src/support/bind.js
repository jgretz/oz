// this utility is helpful because you can't use the handly
// f = () => syntax because it doesn't work with HMR (since its run
// only at object initialization). The lets us pass in the methods
// to be bound explicitly, so its less code

import _ from 'lodash';

/* eslint-disable */
export const bind = (t, functions) => {
  _.forEach(functions, (f) => {
    // we cant use the ES6 f.name because babel throws it away
    // so we need to fallback to es5
    try {
      const name = /^function\s+([\w\$]+)\s*\(/.exec(f.toString())[1];
      t[name] = f.bind(t); //eslint-disable-line
    } catch (err) {
      console.log("UNABLE TO BIND FUNCTION PASSED FROM ");
      console.log(t);
      console.log(f.toString());
      console.log(err);
    }
  });
};
/* eslint-enable */
