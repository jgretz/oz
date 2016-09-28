require('shelljs/global');

echo('Building Admin ...');

// clean
rm('-rf', 'lib/admin');

cd('./src/admin');
exec('npm run build');
mv('lib/', '../../lib/admin');

echo('Admin Build Complete');
