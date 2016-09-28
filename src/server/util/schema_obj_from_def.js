import _ from 'lodash';

export const schemaObjFromDef = (obj) => {
  const def = {
    name: obj.name,
    definition: {}
  };

  _.forEach(obj.fields, (field) => {
    def.definition[field.name] = field.field_type;
  });

  if (obj.trackChangeDates) {
    def.definition.create_date = 'datetime';
    def.definition.update_date = 'datetime';
  }

  return def;
};
