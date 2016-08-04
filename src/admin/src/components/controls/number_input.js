import React, { PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Field } from 'redux-form';

// inner control
const renderControl = ({ input }) =>
(
  <FormGroup>
    <ControlLabel>{input.label}</ControlLabel>
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
