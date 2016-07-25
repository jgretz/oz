import React, { PropTypes } from 'react';
import { FormGroup, Checkbox } from 'react-bootstrap';
import { Field } from 'redux-form';

// inner control
const renderControl = ({ input }) =>
(
  <FormGroup>
    <Checkbox {...input}>{input.label}</Checkbox>
  </FormGroup>
);

renderControl.propTypes = {
  input: PropTypes.object.isRequired,
};

// ReduxForm control
export const CheckboxInput = ({ name, label }) =>
(
  <Field
    name={name}
    label={label}
    component={renderControl}
  />
);

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
