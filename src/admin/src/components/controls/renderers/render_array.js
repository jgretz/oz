import React from 'react';
import { renderPeer } from './render_peer';

export const renderArray = (data, field) => {
  const items = data.map((item) =>
  (
    <div key={item}>
      {renderPeer(item, field)}
    </div>
  ));

  return <div>{items}</div>;
};
