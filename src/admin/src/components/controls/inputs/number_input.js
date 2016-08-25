import React, { PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Field } from 'redux-form';

import { InputLabel } from './input_label';

// inner control
const renderControl = ({ input }) =>
(
  <FormGroup>
    <InputLabel text={input.label} />
    <FormControl type="number" pattern="[0-9]*" inputMode="numeric" {...input} />
  </FormGroup>
);

renderControl.propTypes = {
  input: PropTypes.object.isRequired,
};

// ReduxForm control
export const NumberInput = ({ name, label }) =>
(
  <Field
    name={name}
    label={label}
    component={renderControl}
  />
);

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
