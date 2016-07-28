import Mongo from './mongo';

export default class Database {
  constructor(config) {
    switch (config.type) {
      case 'mongo':
        this.db = new Mongo(config);
        break;
    }
  }

  connect() {
    this.db.connect();
  }

  buildFromModel(model) {
    return this.db.buildFromModel(model);
  }

  findById(model, id) {
    return this.db.findById(model, id);
  }

  find(model, query) {
    return this.db.find(model, query);
  }

  create(model, data) {
    return this.db.create(model, data);
  }

  update(model, id, data) {
    return this.db.update(model, id, data);
  }

  delete(model, id) {
    return this.db.delete(model, id);
  }
}
