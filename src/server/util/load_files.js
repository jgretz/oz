import glob from 'glob';
import path from 'path';

const isClass = (t) => {
  return typeof t === 'function'
    && (/^\s*class\s+/.test(t.toString()) || /_class\S+/i.test(t.toString()));
};

export const loadFiles = (searchPath) => {
  const files = glob.sync(path.join(searchPath, '**/*.js'));

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
      relativePath: file.replace(searchPath, ''),

      instance: instance
    };
  });
};
