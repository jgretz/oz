import { GET, apiExecutor } from 'support';

export const LOAD_SCHEMA_TYPES_SUCCESS = 'LOAD_SCHEMA_TYPES_SUCCESS';
export const LOAD_SCHEMA_TYPES_FAILURE = 'LOAD_SCHEMA_TYPES_FAILURE';

export const loadSchemaTypes = () =>
  apiExecutor({
    verb: GET,
    url: 'schematypes',

    successType: LOAD_SCHEMA_TYPES_SUCCESS,
    failureType: LOAD_SCHEMA_TYPES_FAILURE,
  });
