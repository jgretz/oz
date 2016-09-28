import { types } from 'util';

export default class SchemaTypesRoute {
  get(req, res) {
    res.json(types);
  }
}
