import _ from 'lodash';
import urljoin from 'url-join';

import DynamicRoute from '../routes/dynamic_route';
import Schema from 'models/schema';
import { DATABASE } from 'configure/database';
import { UPLOADS } from 'configure/uploads';
import { API_URL, routeExists, schemaObjFromDef, defineRoute } from 'util';

// local methods
const registerModel = (router, db, upload, model) => {
  const modelDef = schemaObjFromDef(model);

  defineRoute(router, new DynamicRoute(modelDef, db), urljoin(API_URL, model.url), upload);
};

// export
export const apiDynamicRoutes = (app, router, config) => {
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
    if (routeExists(router, req).length > 0) {
      next();
      return;
    }

    // try to find the route in the db,
    // if found, register it so we dont hit here again
    const url = req.url.replace(`${API_URL}/`, '');
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
