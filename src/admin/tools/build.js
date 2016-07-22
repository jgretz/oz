// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable */
import webpack from 'webpack';
import config from '../webpack.config.prod';
import colors from 'colors';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.
}

console.log('Generating minified production bundle. This will take a moment...'.blue);

webpack(config).run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    console.log(err);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log('Your app is compiled in production mode. It\'s ready to roll!'.green);

  return 0;
});
