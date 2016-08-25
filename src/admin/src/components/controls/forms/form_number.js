import React from 'react';
import { NumberInput } from '../inputs';

export const formNumber = (field) =>
  <NumberInput
    key={field.name}
    name={field.name}
    label={field.name}
  />;
