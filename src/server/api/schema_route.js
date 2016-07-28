import ObjectRoute from './object_route';
import Schema from '../models/schema';

export default class SchemaRoute extends ObjectRoute {
  constructor(db) {
    super(Schema, db);
  }
}
