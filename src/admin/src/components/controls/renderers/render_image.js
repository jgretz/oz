import React from 'react';
import { rootUrl } from 'support';

export const renderImage = (data, field) =>
(
  <img src={rootUrl(data)} alt={field.name} />
);
