import path from 'path';

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
        cb(null, this.path);
      },

      filename: (req, file, cb) => {
        cb(null, getFileName(file));
      }
    });

    this.upload = multer({ storage: storage });

    app.get(`*${this.route}/:filename`, (req, res) => {
      const file = path.join(this.path, req.params.filename);
      res.status(200).sendFile(file);
    });
  }

  addRoute(router, verb, url, handler) {
    router[verb](url, this.upload.any(), handler);
    router[verb](`${url}/:id`, this.upload.any(), handler);
  }

  pointerToFile(file) {
    return `${this.route}/${getFileName(file)}`;
  }
}
