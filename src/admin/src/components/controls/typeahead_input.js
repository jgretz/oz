import _ from 'lodash';
import React, { PropTypes } from 'react';
import { FormGroup } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';
import { Field } from 'redux-form';

import { InputLabel } from './input-label';

// inner control
const renderControl = ({ input }) => {
  const onChange = (selection) => {
    input.onChange(selection.length > 0 ? selection[0].id : null);
  };

  const selected = _.filter(input.options, o => o.id === input.value);

  return (
    <FormGroup>
      <InputLabel text={input.label} />
      <Typeahead
        selected={selected}
        options={input.options}
        onChange={onChange}
        allowNew={false}
      />
    </FormGroup>
  );
};

renderControl.propTypes = {
  input: PropTypes.object.isRequired,
};

// ReduxForm control
export const TypeAheadInput = ({ name, label, data }) =>
(
  <Field
    name={name}
    label={label}
    options={data || []}
    component={renderControl}
  />
);

TypeAheadInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.array,
};
