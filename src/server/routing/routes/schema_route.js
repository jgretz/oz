import urljoin from 'url-join';
import ObjectRoute from './object_route';
import Schema from 'models/schema';
import { schemaObjFromDef, ROUTES, API_URL } from 'util';

const getModel = (route, id) =>
  new Promise((resolve, reject) => {
    route.db.findById(route.object, id)
      .then((model) => { resolve(schemaObjFromDef(model)); })
      .catch((e) => { reject(e); });
  });

export default class SchemaRoute extends ObjectRoute {
  constructor(db) {
    super(Schema, db);
  }

  put(req, res) {
    super.put(req, res);

    const routes = req.app.get(ROUTES);
    const route = routes[urljoin(API_URL, req.body.url)];

    // it may not be because that route hasnt loaded yet
    // in that case we don't need to update
    if (route) {
      route.object = this.db.updateDefinition(
        schemaObjFromDef(req.body)
      );
    }
  }

  delete(req, res) {
    super.delete(req, res);

    getModel(this, req.params.id)
      .then((schema) => { this.db.deleteDefinition(schema); });
  }
}
