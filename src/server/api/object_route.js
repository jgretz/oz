import _ from 'lodash';

import { UPLOADS } from '../configure/uploads';
import { logError } from '../util/log';


// util
const verifyId = (req, res) => {
  // technically they caller should put the id in the url, but we
  // can be a little forgiving
  const id = req.params.id || req.body.id || req.body._id;
  if (!id) {
    res.status(500).send('PUT & DELETE require an id of the document to update');
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

const updateBodyWithFiles = (req) => {
  if (!req.files || req.files.length === 0) {
    return;
  }

  const upload = req.app.get(UPLOADS);
  _.forEach(req.files, (file) => {
    req.body[file.fieldname] = upload.pointerToFile(file);
  });
};

// class
export default class ObjectRoute {
  constructor(objectDef, db) {
    this.db = db;
    this.object = db.buildFromModel(objectDef);
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
      this.db.findById(this.object, req.params.id), res
    );
  }

  getByQuery(req, res) {
    respond(
      this.db.find(this.object, req.query), res
    );
  }

  getAll(req, res) {
    respond(
      this.db.find(this.object), res
    );
  }

  // CUD operations
  post(req, res) {
    // allow this to happen (you can't put files so we have to support it)
    if (req.params.id) {
      this.put(req, res);
      return;
    }

    updateBodyWithFiles(req);

    respond(
      this.db.create(this.object, req.body), res
    );
  }

  put(req, res) {
    const id = verifyId(req, res);
    if (!id) {
      return;
    }

    updateBodyWithFiles(req);

    respond(
      this.db.update(this.object, id, req.body, { new: true }), res
    );
  }

  delete(req, res) {
    const id = verifyId(req, res);
    if (!id) {
      return;
    }

    respond(
      this.db.delete(this.object, id), res
    );
  }
}
