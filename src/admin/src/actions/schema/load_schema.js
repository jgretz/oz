import { GET, apiExecutor } from 'support';

export const LOAD_SCHEMA_SUCCESS = 'LOAD_SCHEMA_SUCCESS';
export const LOAD_SCHEMA_FAILURE = 'LOAD_SCHEMA_FAILURE';

export const loadSchema = () =>
  apiExecutor({
    verb: GET,
    url: 'schema',

    successType: LOAD_SCHEMA_SUCCESS,
    failureType: LOAD_SCHEMA_FAILURE,
  });
