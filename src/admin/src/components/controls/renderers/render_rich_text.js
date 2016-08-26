import React from 'react';

export const renderRichText = (data) => {
  const createMarkup = () => ({ __html: data });
  return <div dangerouslySetInnerHTML={createMarkup()} />;
};
