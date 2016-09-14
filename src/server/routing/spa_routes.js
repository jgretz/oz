import mapSpa from '../util/map_spa';

export default (app, router, config) => {
  if (!config.spa) {
    return;
  }

  mapSpa('/', config.spa.path, router);
};
