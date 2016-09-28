import { mapSpa } from 'util';

export const spaRoutes = (app, router, config) => {
  if (!config.spa) {
    return;
  }

  mapSpa('/', config.spa.path, router);
};
