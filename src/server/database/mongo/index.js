import _ from 'lodash';
import mongoose from 'mongoose';
import promise from 'promise';
import moment from 'moment';

import { typeMap } from '../../util/data_types';

const schemaIndex = {};

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
    let model = schemaIndex[modelDef.name];
    if (model) {
      return model;
    }

    model = mongoose.model(modelDef.name, objectFromModel(modelDef.definition));
    schemaIndex[modelDef.name] = model;

    return model;
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
}
