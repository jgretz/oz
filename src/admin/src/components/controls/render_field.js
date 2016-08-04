import { logError } from 'support';

import {
  renderString, renderPassword, renderNumber, renderRichText, renderDateTime,
  renderDate, renderTime, renderBoolean,
} from './renderers';

// map from type
const map = {
  string: renderString,
  password: renderPassword,
  number: renderNumber,
  richText: renderRichText,
  datetime: renderDateTime,
  date: renderDate,
  time: renderTime,
  bool: renderBoolean, // eslint-disable-line
};

// bring it together
export const renderField = (field) => {
  const render = map[field.field_type];
  if (!render) {
    console.log(map);
    logError(`Unable to map ${field.field_type} on field ${field.name}`);
    return null;
  }

  return render(field);
};
