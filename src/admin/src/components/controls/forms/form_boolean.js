import React from 'react';
import { CheckboxInput } from '../inputs';

export const formBoolean = (field) =>
  <CheckboxInput
    key={field.name}
    name={field.name}
    label={field.name}
  />;
