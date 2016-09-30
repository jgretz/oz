import _ from 'lodash';

export const removeItemFromArray = (state, obj) => {
  const index = _.findIndex(state, o => o._id === obj._id);

  const array = _.clone(state);
  _.pullAt(array, index);

  return array;
};
