import React, { PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Field } from 'redux-form';

import { InputLabel } from './input-label';

// inner control
const renderControl = ({ input }) =>
(
  <FormGroup>
    <InputLabel text={input.label} />
    <FormControl type={input.type || 'text'} {...input} />
  </FormGroup>
);

renderControl.propTypes = {
  input: PropTypes.object.isRequired,
};

// ReduxForm control
export const TextInput = ({ name, label, type }) =>
(
  <Field
    name={name}
    label={label}
    type={type}
    component={renderControl}
  />
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};
