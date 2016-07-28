// import _ from 'lodash';
// import defineRoute from './define_route';
// import Schema from '../models/schema';
// import DynamicRoute from '../api/dynamic_route';
// import { DATABASE } from '../configure/database';

export default (app, router, config) => {
  if (!config.admin || !config.db) {
    return;
  }

  // Schema.find().then((objects) => {
  //   _.forEach(objects, (obj) => {
  //     const route = obj.name.toLowerCase();
  //     defineRoute(router, new DynamicRoute(obj), `/api/${route}`);
  //   });
  // });
};
