import { mapSpa } from '../util';

export default (app, router, config) => {
  if (!config.spa) {
    return;
  }

  mapSpa('/', config.spa.path, router);
};
