import _ from 'lodash';

export const updateItemInArray = (state, obj) => {
  const index = _.findIndex(state, o => o._id === obj._id);

  const array = _.clone(state);
  if (index >= 0) {
    array.splice(index, 1, obj);
  } else {
    array.push(obj);
  }

  return array;
};
