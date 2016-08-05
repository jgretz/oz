import React from 'react';
import { ImageInput } from '../image_input';

export const renderImage = (field) =>
  <ImageInput
    key={field.name}
    name={field.name}
    label={field.name}
  />;
