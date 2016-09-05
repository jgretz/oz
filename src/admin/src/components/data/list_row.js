import React, { PropTypes } from 'react';
import { goto, logError } from 'support';
import {
  renderString, renderRichText, renderPassword, renderNumber,
  renderBoolean, renderDateTime, renderDate, renderTime,
  renderImage, renderPeer, renderArray, renderList,
} from 'controls/renderers';

// support
const map = {
  string: renderString,
  password: renderPassword,
  number: renderNumber,
  richText: renderRichText,
  datetime: renderDateTime,
  date: renderDate,
  time: renderTime,
  bool: renderBoolean,
  image: renderImage,
  peer: renderPeer,
  array: renderArray,
  list: renderList,
};

// component
const listRow = ({ dataTypeId, object, displayProps }) => {
  const renderData = (field) => {
    const render = map[field.field_type];
    if (!render) {
      logError(`Unable to render data for ${field.name} of type ${field.type}`);
      return null;
    }

    return render(object[field.name], field);
  };

  const editObject = () => {
    goto(`data/${dataTypeId}/${object._id}`);
  };

  return (
    <tr className="row">
      {
        displayProps.map(field =>
        (
          <td key={field.name}>
            {renderData(field)}
          </td>
        ))
      }
      <td className="edit" onClick={editObject}>
        Edit
      </td>
    </tr>
  );
};

listRow.propTypes = {
  object: PropTypes.object.isRequired,
  displayProps: PropTypes.array.isRequired,

  dataTypeId: PropTypes.string.isRequired,
};

export default listRow;
