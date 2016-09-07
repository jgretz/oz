import React from 'react';
import { SelectInput } from '../inputs';

export const formList = (field) => {
  const list = [
    { key: null, value: '' },
    ...field.list.split(',').map(i => ({ key: i, value: i })),
  ];

  return (
    <SelectInput
      key={field.name}
      name={field.name}
      label={field.name}
      array={list}
    />
  );
};
