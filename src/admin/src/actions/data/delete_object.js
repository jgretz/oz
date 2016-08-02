import { DELETE, apiExecutor } from 'support';

export const DELETE_OBJECT_SUCCESS = 'DELETE_OBJECT_SUCCESS';
export const DELETE_OBJECT_FAILURE = 'DELETE_OBJECT_FAILURE';

export const deleteObject = (model, id) =>
  apiExecutor({
    verb: DELETE,
    url: `${model.url}/${id}`,

    successType: DELETE_OBJECT_SUCCESS,
    failureType: DELETE_OBJECT_FAILURE,
  });
