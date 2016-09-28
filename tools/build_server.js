require('shelljs/global');


echo('Building Server ...');

// clean
rm('-rf', 'lib/server');
rm('lib/index.js');

// move over the server
exec('babel -d lib/ src/index.js');
mv('lib/src/index.js', 'lib/index.js');
rm('-rf', 'lib/src/');

exec('babel -d lib/server src/server');

echo('Server Build Complete');
