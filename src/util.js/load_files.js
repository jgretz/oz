import _ from 'lodash';
import glob from 'glob';

const isClass = (t) => {
  return typeof t === 'function'
    && (/^\s*class\s+/.test(t.toString()) || /_class\S+/i.test(t.toString()));
};

export default (paths) => {
  const rawFiles = paths.map(path => glob.sync(`${path}/**/*.js`));
  const files = _.uniq(_.flatten(rawFiles));

  return files.map((file) => {
    let relativePath = file;
    _.forEach(paths, path => relativePath = relativePath.replace(path, ''));

    const requirePath = file.startsWith(__dirname) ? file : `../../${file}`;


    // handle different ways this may come back depending on if its
    // and ES5 function, ES6 object or ES6 class
    var instance = require(requirePath);
    if (instance.default) {
      instance = instance.default;
    }

    if (isClass(instance)) {
      instance = new instance();
    }

    return {
      absolutePath: file,
      relativePath: relativePath,

      instance: instance
    };
  });
};
