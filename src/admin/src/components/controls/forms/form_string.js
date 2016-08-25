import React from 'react';
import { TextInput } from '../inputs';

export const formString = (field) =>
  <TextInput key={field.name} name={field.name} label={field.name} />;
