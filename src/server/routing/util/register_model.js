import _ from 'lodash';
import defineRoute from './define_route';
import DynamicRoute from '../../api/dynamic_route';
import { API_URL } from '../../util/constants';

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

export default (router, db, upload, model) => {
  const modelDef = buildDynamicDef(model);

  defineRoute(router, new DynamicRoute(modelDef, db), `${API_URL}${model.url}`, upload);
};
