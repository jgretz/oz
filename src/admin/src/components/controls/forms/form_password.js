import React from 'react';
import { TextInput } from '../inputs';

export const formPassword = (field) =>
  <TextInput key={field.name} name={field.name} label={field.name} type="password" />;
