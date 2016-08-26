import React from 'react';

export const renderNumber = (data) =>
(
  <span>{data ? data.toLocaleString() : ''}</span>
);
