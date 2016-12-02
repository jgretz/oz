import { defineRoute } from 'util';

import LoginRoute from '../routes/login_route';

export const securityRoutes = (app, router) => {
  defineRoute(app, router, new LoginRoute(), '/api/login');
};
