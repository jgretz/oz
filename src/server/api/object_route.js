import mongoose from 'mongoose';
import promise from 'promise';
import { logError } from '../util/log';

mongoose.Promise = promise;

// util
const verifyId = (req, res) => {
  // technically they caller should put the id in the url, but we
  // can be a little forgiving
  const id = req.params.id || req.body.id || req.body._id;
  if (!id) {
    res.status(500).send('PUT requires an id of the document to update');
    return null;
  }

  return id;
};

const respond = (promise, res) => {
  promise.then((response) => { res.json(response); })
    .catch((err) => {
      res.status(500).send(err);
      logError(err);
    });
};

// class
export default class ObjectRoute {
  constructor(object, dbConfig) {
    this.object = object;

    this.connection = mongoose.connect(dbConfig.connection);
  }

  // gets
  get(req, res) {
    if (req.params && req.params.id) {
      this.getById(req, res);
      return;
    }

    if (req.query) {
      this.getByQuery(req, res);
      return;
    }

    this.getAll(req, res);
  }

  getById(req, res) {
    respond(
      this.object.findById(req.params.id), res
    );
  }

  getByQuery(req, res) {
    respond(
      this.object.find(req.query), res
    );
  }

  getAll(req, res) {
    respond(
      this.object.find(), res
    );
  }

  // CUD operations
  post(req, res) {
    if (req.params.id) {
      res.status(500).send('Use a PUT to update the document');
      return;
    }

    respond(
      this.object.create(req.body), res
    );
  }

  put(req, res) {
    const id = verifyId(req, res);
    if (!id) {
      return;
    }

    respond(
      this.object.findByIdAndUpdate(id, req.body), res
    );
  }

  delete(req, res) {
    const id = verifyId(req, res);
    if (!id) {
      return;
    }

    respond(
      this.object.findByIdAndRemove(id), res
    );
  }
}
