import React from 'react';
import moment from 'moment';

const render = (data, format) => {
  const m = moment(data);
  return (
    <span>{m.format(format)}</span>
  );
};

export const renderDateTime = (data) => render(data, 'MMMM Do YYYY, h:mm:ss a');
export const renderDate = (data) => render(data, 'MMMM Do YYYY');
export const renderTime = (data) => render(data, 'h:mm:ss a');
