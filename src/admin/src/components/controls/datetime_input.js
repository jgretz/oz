import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import { Field } from 'redux-form';
import DateTimeField from 'react-bootstrap-datetimepicker';

// inner control
const renderControl = ({ input }) =>
(
  <FormGroup>
    <ControlLabel>{input.label}</ControlLabel>
    <DateTimeField {...input} />
  </FormGroup>
);

renderControl.propTypes = {
  input: PropTypes.object.isRequired,
};

// ReduxForm control
export const DateTimeInput = ({ name, label, mode }) =>
(
  <Field
    name={name}
    label={label}
    mode={mode}
    component={renderControl}
  />
);

DateTimeInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mode: PropTypes.string,
};
