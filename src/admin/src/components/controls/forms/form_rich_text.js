import React from 'react';
import { RichTextInput } from '../inputs';

export const formRichText = (field) =>
  <RichTextInput key={field.name} name={field.name} label={field.name} />;
