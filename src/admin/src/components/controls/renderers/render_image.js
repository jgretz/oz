import React from 'react';

export const renderImage = (data, field) =>
(
  <img src={data} alt={field.name} />
);
