import React, { PropTypes } from 'react';
import { FormGroup, Checkbox } from 'react-bootstrap';
import { Field } from 'redux-form';

import { InputLabel } from './input-label';

// inner control
const renderControl = ({ input }) =>
(
  <FormGroup>
    <Checkbox {...input}>
      <InputLabel text={input.label} />
    </Checkbox>
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
    type="checkbox"
    component={renderControl}
  />
);

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
