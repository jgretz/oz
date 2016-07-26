import { GET, apiExecutor } from 'support';

export const LOAD_OBJECTS_SUCCESS = 'LOAD_OBJECTS_SUCCESS';
export const LOAD_OBJECTS_FAILURE = 'LOAD_OBJECTS_FAILURE';

export const loadObjects = () =>
  apiExecutor({
    verb: GET,
    url: 'schema',

    successType: LOAD_OBJECTS_SUCCESS,
    failureType: LOAD_OBJECTS_FAILURE,
  });
