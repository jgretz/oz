import React from 'react';
import { NumberInput } from '../number_input';

export const renderNumber = (field) =>
  <NumberInput
    key={field.name}
    name={field.name}
    label={field.name}
  />;
