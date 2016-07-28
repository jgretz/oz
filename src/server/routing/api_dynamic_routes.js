import _ from 'lodash';
import defineRoute from './define_route';
import Schema from '../models/schema';
import DynamicRoute from '../api/dynamic_route';
import { DATABASE } from '../configure/database';

const buildDynamicDef = (obj) => {
  const def = {
    name: obj.name,
    definition: {}
  };

  _.forEach(obj.fields, (field) => {
    def.definition[field.name] = field.field_type;
  });

  return def;
};

export default (app, router, config) => {
  if (!config.admin || !config.db) {
    return;
  }

  const db = app.get(DATABASE);
  const model = db.buildFromModel(Schema);

  db.find(model).then((objects) => {
    _.forEach(objects, (obj) => {
      const route = obj.name.toLowerCase();
      const modelDef = buildDynamicDef(obj);

      defineRoute(router, new DynamicRoute(modelDef, db), `/api/${route}`);
    });
  });
};
