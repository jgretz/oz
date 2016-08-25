import { logError } from 'support';

import { formString } from './form_string';
import { formPassword } from './form_password';
import { formNumber } from './form_number';
import { formRichText } from './form_rich_text';
import { formDateTime } from './form_datetime';
import { formDate } from './form_date';
import { formTime } from './form_time';
import { formBoolean } from './form_boolean';
import { formImage } from './form_image';
import { formPeer } from './form_peer';
import { formArray } from './form_array';

// map from type
const map = {
  string: formString,
  password: formPassword,
  number: formNumber,
  richText: formRichText,
  datetime: formDateTime,
  date: formDate,
  time: formTime,
  bool: formBoolean,
  image: formImage,
  peer: formPeer,
  array: formArray,
};

// bring it together
export const formField = (field) => {
  const ff = map[field.field_type];
  if (!ff) {
    logError(`Unable to map ${field.field_type} on field ${field.name}`);
    return null;
  }

  return ff(field);
};
