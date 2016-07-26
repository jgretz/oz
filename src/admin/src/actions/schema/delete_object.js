import { DELETE, apiExecutor } from 'support';

export const DELETE_OBJECT_SUCCESS = 'DELETE_OBJECT_SUCCESS';
export const DELETE_OBJECT_FAILURE = 'DELETE_OBJECT_FAILURE';

export const deleteObject = (id) =>
  apiExecutor({
    verb: DELETE,
    url: `schema/${id}`,

    successType: DELETE_OBJECT_SUCCESS,
    failureType: DELETE_OBJECT_FAILURE,
  });
