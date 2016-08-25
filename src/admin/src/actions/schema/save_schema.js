import { POST, PUT, apiExecutor } from 'support';

export const SAVE_SCHEMA_SUCCESS = 'SAVE_SCHEMA_SUCCESS';
export const SAVE_SCHEMA_FAILURE = 'SAVE_SCHEMA_FAILURE';

export const saveSchema = (model) => {
  const id = model.id || model._id; // eslint-disable-line
  const verb = id ? PUT : POST;
  const url = id ? `schema/${id}` : 'schema';

  return apiExecutor({
    verb,
    url,

    data: model,

    successType: SAVE_SCHEMA_SUCCESS,
    failureType: SAVE_SCHEMA_FAILURE,
  });
};
