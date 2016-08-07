import _ from 'lodash';
import React, { PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Field } from 'redux-form';

import { InputLabel } from './input-label';

// inner control
const renderSource = (map, array) => {
  if (map) {
    return _.map(map, (value, key) => <option key={key} value={key}>{value}</option>);
  }

  if (array) {
    return _.map(array, (obj) => <option key={obj.key} value={obj.key}>{obj.value}</option>);
  }

  return null;
};

const renderControl = ({ input }) =>
(
  <FormGroup>
    <InputLabel text={input.label} />
    <FormControl componentClass="select" {..._.omit(input, ['map', 'array', 'label'])}>
      {renderSource(input.map, input.array)}
    </FormControl>
  </FormGroup>
);

renderControl.propTypes = {
  input: PropTypes.object.isRequired,
};

// ReduxForm control
export const SelectInput = ({ name, label, map, array }) =>
(
  <Field
    name={name}
    label={label}
    map={map}
    array={array}
    component={renderControl}
  />
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  map: PropTypes.object,
  array: PropTypes.array,
};
