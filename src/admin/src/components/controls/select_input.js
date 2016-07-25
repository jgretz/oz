import _ from 'lodash';
import React, { PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Field } from 'redux-form';

// inner control
const renderControl = ({ input }) =>
(
  <FormGroup>
    <ControlLabel>{input.label}</ControlLabel>
    <FormControl componentClass="select" {..._.omit(input, ['map', 'label'])}>
    {
      _.map(input.map, (value, key) => <option key={key} value={key}>{value}</option>)
    }
    </FormControl>
  </FormGroup>
);

renderControl.propTypes = {
  input: PropTypes.object.isRequired,
};

// ReduxForm control
export const SelectInput = ({ name, label, map }) =>
(
  <Field
    name={name}
    label={label}
    map={map}
    component={renderControl}
  />
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  map: PropTypes.object.isRequired,
};
