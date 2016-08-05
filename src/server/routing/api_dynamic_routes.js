import _ from 'lodash';
import registerModel from './util/register_model';
import Schema from '../models/schema';
import { DATABASE } from '../configure/database';
import { UPLOADS } from '../configure/uploads';
import { API_URL } from '../util/constants';

export default (app, router, config) => {
  if (!config.admin || !config.db) {
    return;
  }

  const db = app.get(DATABASE);
  const upload = app.get(UPLOADS);
  const schema = db.buildFromModel(Schema);

  // register routes that are defined at launch
  db.find(schema).then((objects) => {
    _.forEach(objects, (obj) => {
      registerModel(router, db, upload, obj);
    });
  });

  // add handler to catch routes that are defined during launch
  app.use((req, res, next) => {
    // if the route exists, just let it go there
    const routes = _.uniq(
      router.stack.map((layer) => {
        return layer.route.path;
      })
    );
    if (routes.includes(req.url)) {
      next();
      return;
    }

    // try to find the route in the db,
    // if found, register it so we dont hit here again
    const url = req.url.replace(API_URL, '');
    db.find(schema, { url }).then((result) => {
      if (result.length === 0) {
        next();
        return;
      }

      registerModel(router, db, upload, result[0]);
      next();
    });
  });
};
