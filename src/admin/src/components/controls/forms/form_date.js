import React from 'react';
import { DateTimeInput } from '../inputs';

export const formDate = (field) =>
  <DateTimeInput
    key={field.name}
    name={field.name}
    label={field.name}
    mode="date"
  />;
