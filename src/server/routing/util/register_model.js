import _ from 'lodash';
import urljoin from 'url-join';

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

  if (obj.trackChangeDates) {
    def.definition.create_date = 'datetime';
    def.definition.update_date = 'datetime';
  }

  return def;
};

export default (router, db, upload, model) => {
  const modelDef = buildDynamicDef(model);

  defineRoute(router, new DynamicRoute(modelDef, db), urljoin(API_URL, model.url), upload);
};
