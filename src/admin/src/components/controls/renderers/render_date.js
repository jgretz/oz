import React from 'react';
import { DateTimeInput } from '../datetime_input';

export const renderDate = (field) =>
  <DateTimeInput
    key={field.name}
    name={field.name}
    label={field.name}
    mode="date"
  />;
