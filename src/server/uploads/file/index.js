import fs from 'fs';
import join from 'join-path-js';

const getFileName = (file) => {
  return file.originalname;
};

export default class FileUploads {
  constructor(config) {
    this.path = config.path;
    this.route = config.route;
  }

  configure(app, multer) {
    var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(this.path)) {
          fs.mkdirSync(this.path);
        }

        cb(null, this.path);
      },

      filename: (req, file, cb) => {
        cb(null, getFileName(file));
      }
    });

    this.upload = multer({ storage: storage });

    app.get(join('*', join(this.route, '/:filename')), (req, res) => {
      const file = join(this.path, req.params.filename);
      res.status(200).sendFile(file);
    });
  }

  addRoute(router, verb, url, handler) {
    router[verb](url, this.upload.any(), handler);
    router[verb](join(url, '/:id'), this.upload.any(), handler);
  }

  pointerToFile(file) {
    return join(this.route, getFileName(file));
  }
}
