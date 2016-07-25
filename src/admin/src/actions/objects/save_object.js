export const saveObject = (object) => {
  console.log(object);

  return {
    type: 'Save',
    payload: object,
  };
};
