export default {
  name: 'schema',
  definition: {
    name: 'string',
    url: 'string',
    icon: 'string',
    fields: [{
      name: 'string',
      field_type: 'string',
      peer: 'string',
      required: 'bool',
      identity: 'bool',
      showInList: 'bool',
    }],
  },
};
