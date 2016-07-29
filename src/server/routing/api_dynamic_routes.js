import _ from 'lodash';
import registerModel from './util/register_model';
import Schema from '../models/schema';
import { DATABASE } from '../configure/database';
import { API_URL } from '../util/constants';

export default (app, router, config) => {
  if (!config.admin || !config.db) {
    return;
  }

  const db = app.get(DATABASE);
  const schema = db.buildFromModel(Schema);

  // register routes that are defined at launch
  db.find(schema).then((objects) => {
    _.forEach(objects, (obj) => {
      registerModel(router, db, obj);
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
    const name = req.url.replace(API_URL, '');
    const search = { $regex: new RegExp('^' + name, 'i') };
    db.find(schema, { name: search }).then((result) => {
      if (result.length === 0) {
        next();
        return;
      }

      registerModel(router, db, result[0]);
      next();
    });
  });
};
