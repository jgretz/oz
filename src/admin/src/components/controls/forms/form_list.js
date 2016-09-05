import React from 'react';
import { SelectInput } from '../inputs';

export const formList = (field) =>
  <SelectInput
    key={field.name}
    name={field.name}
    label={field.name}
    array={field.list.split(',').map(i => ({ key: i, value: i }))}
  />;
