import _ from 'lodash';

export const filterById = (array, id, defaultValue) => {
  if (!id) {
    return defaultValue;
  }

  return _.find(array, o => o._id === id || o.id === id);
};
