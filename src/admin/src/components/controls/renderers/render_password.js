import React from 'react';
import { PasswordInput } from '../password_input';

export const renderPassword = (field) =>
  <PasswordInput key={field.name} name={field.name} label={field.name} />;
