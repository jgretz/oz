import _ from 'lodash';
import path from 'path';

export default (app, router, config) => {
  if (!config.admin) {
    return;
  }

  // maps to the files for the app
  const files = ['bundle.js', 'bundle.js.map', 'styles.css', 'styles.css.map'];
  _.forEach(files, (file) => {
    app.get(`*/admin/${file}`, function(req, res) {
      res.status(200).sendFile(path.join(__dirname, `../../admin/${file}`));
    });
  });

  app.get('*/admin', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '../../admin/index.html'));
  });
};
