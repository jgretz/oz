import { POST, PUT, apiExecutor } from 'support';

export const SAVE_OBJECT_SUCCESS = 'SAVE_OBJECT_SUCCESS';
export const SAVE_OBJECT_FAILURE = 'SAVE_OBJECT_FAILURE';

export const saveObject = (object) => {
  const id = object.id || object._id; // eslint-disable-line
  const verb = id ? PUT : POST;
  const url = id ? `schema/${id}` : 'schema';

  return apiExecutor({
    verb, url,

    data: object,

    successType: SAVE_OBJECT_SUCCESS,
    failureType: SAVE_OBJECT_FAILURE,
  });
};
