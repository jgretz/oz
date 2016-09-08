import glob from 'glob';
import join from 'join-path-js';

const isClass = (t) => {
  return typeof t === 'function'
    && (/^\s*class\s+/.test(t.toString()) || /_class\S+/i.test(t.toString()));
};

export default (path) => {
  const files = glob.sync(join(path, '**/*.js'));

  return files.map((file) => {
    var instance = require(file);

    // handle different ways this may come back depending on if its
    // and ES5 function, ES6 object or ES6 class
    if (instance.default) {
      instance = instance.default;
    }

    if (isClass(instance)) {
      instance = new instance();
    }

    return {
      absolutePath: file,
      relativePath: file.replace(path, ''),

      instance: instance
    };
  });
};
