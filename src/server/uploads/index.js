import multer from 'multer';
import FileUploads from './file';

export default class Uploads {
  constructor(app, config) {
    switch (config.type) {
      case 'file':
        this.uploader = new FileUploads(config);
        break;
    }

    this.uploader.configure(app, multer);
  }

  addRoute(router, verb, url, handler) {
    this.uploader.addRoute(router, verb, url, handler);
  }

  pointerToFile(file) {
    return this.uploader.pointerToFile(file);
  }
}
