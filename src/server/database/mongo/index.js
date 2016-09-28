import _ from 'lodash';
import mongoose from 'mongoose';
import promise from 'promise';
import moment from 'moment';

import { typeMap } from 'util';

const objectFromModel = (model) => {
  const object = {};
  _.forOwn(model, (value, key) =>  {
    let type = null;
    if (_.isArray(value)) {
      if (value.length === 0) {
        console.log(`You need to specify a type definition for key ${key}`);
        return;
      }

      type = [objectFromModel(value[0])];
    } else {
      type = typeMap[value];
    }

    if (!type) {
      console.log(`Unable to map type ${value} for key ${key}`);
      return;
    }

    object[key] = type;
  });

  return object;
};

export default class Mongo {
  constructor(config) {
    mongoose.Promise = promise;

    this.config = config;
  }

  connect() {
    mongoose.connect(this.config.connection);
  }

  buildFromModel(modelDef) {
    let model = mongoose.connection.models[modelDef.name];
    if (model) {
      return model;
    }

    return mongoose.model(modelDef.name, objectFromModel(modelDef.definition));
  }

  findById(model, id) {
    return model.findById(id);
  }

  find(model, query) {
    return model.find(query);
  }

  create(model, data) {
    if (model.schema.paths.create_date) {
      data.create_date = moment();
      data.update_date = moment();
    }

    return model.create(data);
  }

  update(model, id, data) {
    if (model.schema.paths.update_date) {
      data.update_date = moment();
    }

    return model.findByIdAndUpdate(id, data, { new: true });
  }

  delete(model, id) {
    return model.findByIdAndRemove(id);
  }

  updateDefinition(definition) {
    this.deleteDefinition(definition);
    return this.buildFromModel(definition);
  }

  deleteDefinition(definition) {
    delete mongoose.connection.models[definition.name];
  }
}
