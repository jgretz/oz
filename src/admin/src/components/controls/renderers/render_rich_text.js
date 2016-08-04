import React from 'react';
import { RichTextInput } from '../rich_text_input';

export const renderRichText = (field) =>
  <RichTextInput key={field.name} name={field.name} label={field.name} />;
