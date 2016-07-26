export default class SchemaTypesRoute {
  get(req, res) {
    res.json({
      string: 'String',
      number: 'Number',
      datetime: 'DateTime',
      image: 'Image',
      array: 'Array',
    });
  }
}
