import { logError } from 'support';

import {
  renderString, renderPassword,
} from './renderers';

// map from type
const map = {
  string: renderString,
  password: renderPassword,
};

// bring it together
export const renderField = (field) => {
  const render = map[field.field_type];
  if (!render) {
    logError(`Unable to map ${field.field_type} on field ${field.name}`);
    return null;
  }

  return render(field);
};
