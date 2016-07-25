import defineRoute from './define_route';
import Schema from '../api/schema';

export default (app, router, config) => {
  if (!config.admin) {
    return;
  }

  defineRoute(router,  new Schema(), '/api/schema');
};
