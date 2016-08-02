import { GET, apiExecutor } from 'support';

export const LOAD_OBJECT_SUCCESS = 'LOAD_OBJECT_SUCCESS';
export const LOAD_OBJECT_FAILURE = 'LOAD_OBJECT_FAILURE';

export const loadObject = (object, id) =>
  apiExecutor({
    verb: GET,
    url: `${object.toLowerCase()}/${id}`,

    successType: LOAD_OBJECT_SUCCESS,
    failureType: LOAD_OBJECT_FAILURE,
  });
