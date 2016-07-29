import { DELETE, apiExecutor } from 'support';

export const DELETE_SCHEMA_SUCCESS = 'DELETE_SCHEMA_SUCCESS';
export const DELETE_SCHEMA_FAILURE = 'DELETE_SCHEMA_FAILURE';

export const deleteSchema = (id) =>
  apiExecutor({
    verb: DELETE,
    url: `schema/${id}`,

    successType: DELETE_SCHEMA_SUCCESS,
    failureType: DELETE_SCHEMA_FAILURE,
  });
