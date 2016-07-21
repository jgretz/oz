require('shelljs/global');

// clean
rm('-rf', 'lib/');

// move over the server
exec('babel -d lib/ src/index.js');
mv('lib/src/index.js', 'lib/index.js');
rm('-rf', 'lib/src/');

exec('babel -d lib/server src/server');

// move over the admin site
cd('./src/admin');
exec('npm run build');
mv('lib/', '../../lib/admin');

// done
echo('build complete');
