import React from 'react';
import { ImageInput } from '../inputs';

export const formImage = (field) =>
  <ImageInput
    key={field.name}
    name={field.name}
    label={field.name}
  />;
