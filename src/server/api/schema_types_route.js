import { types } from '../util/data_types';

export default class SchemaTypesRoute {
  get(req, res) {
    res.json(types);
  }
}
