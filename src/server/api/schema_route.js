import ObjectRoute from './object_route';
import { Schema } from './schema';

export default class SchemaRoute extends ObjectRoute {
  constructor(dbConfig) {
    super(Schema, dbConfig);
  }
}
