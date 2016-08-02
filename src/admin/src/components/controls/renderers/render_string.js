import React from 'react';
import { TextInput } from '../text_input';

export const renderString = (field) =>
  <TextInput key={field.name} name={field.name} label={field.name} />;
