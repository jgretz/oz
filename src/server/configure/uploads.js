import Uploads from '../uploads';

export const UPLOADS = 'UPLOADS';
export default (app, config) => {
  if (!config) {
    return;
  }

  const uploads = new Uploads(app, config.uploads);
  app.set(UPLOADS, uploads);
};
