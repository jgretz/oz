import express from 'express';
import path from 'path';

export default (app, router, config) => {
  if (!config.spa) {
    return;
  }

  // map to the spa app
  app.use(express.static(`${config.spa.path}`));
  app.get('*', function(req, res) {
    res.status(200).sendFile(path.join(`${config.spa.path}/${config.spa.index}`));
  });
};
