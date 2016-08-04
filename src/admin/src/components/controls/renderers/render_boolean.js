import React from 'react';
import { CheckboxInput } from '../checkbox_input';

export const renderBoolean = (field) =>
  <CheckboxInput
    key={field.name}
    name={field.name}
    label={field.name}
  />;
