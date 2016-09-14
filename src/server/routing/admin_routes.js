import path from 'path';

import mapSpa from '../util/map_spa';
import { ADMIN_URL } from '../util/constants';

export default (app, router, config) => {
  if (!config.admin) {
    return;
  }

  mapSpa(ADMIN_URL, path.join(__dirname, '../../admin/'), router);
};
