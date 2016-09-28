import ObjectRoute from './object_route';
import Schema from '../models/schema';

export default class SchemaRoute extends ObjectRoute {
  constructor(db) {
    super(Schema, db);
  }

  post(req, res) {
    super.post(req, res);

    console.log('POST');
  }

  put(req, res) {
    super.put(req, res);

    console.log('PUT');
  }

  delete(req, res) {
    super.delete(req, res);

    console.log('DELETE');
  }
}
