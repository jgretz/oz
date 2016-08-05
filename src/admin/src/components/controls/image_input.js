import React, { PropTypes } from 'react';
import { FormGroup } from 'react-bootstrap';
import { Field } from 'redux-form';
import Dropzone from 'react-dropzone';

import { rootUrl } from 'support';
import { InputLabel } from './input-label';

// inner control
const renderControl = ({ input }) => {
  const onDrop = (files) => {
    input.onChange(files[0]);
  };

  const renderDropzone = () => {
    const empty = input.value ? 'full' : 'empty';
    return (
      <Dropzone onDrop={onDrop} multiple={false} className={`dropzone ${empty}`}>
        <div>Drop image file here or click to select file to upload.</div>
      </Dropzone>
    );
  };

  const renderImage = () => {
    if (!input.value) {
      return null;
    }

    let src = null;
    if (input.value instanceof File) {
      src = input.value.preview;
    } else {
      src = rootUrl(input.value);
    }

    return (
      <img
        src={src}
        className="image-preview"
        alt="preview"
      />
    );
  };

  return (
    <FormGroup>
      <InputLabel text={input.label} />
      <br />
      {renderDropzone()}
      {renderImage()}
    </FormGroup>
  );
};

renderControl.propTypes = {
  input: PropTypes.object.isRequired,
};

// ReduxForm control
export const ImageInput = ({ name, label }) =>
(
  <Field
    name={name}
    label={label}
    component={renderControl}
  />
);

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
