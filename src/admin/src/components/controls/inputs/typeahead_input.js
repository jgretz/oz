import _ from 'lodash';
import React, { PropTypes } from 'react';
import { FormGroup } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';
import { Field } from 'redux-form';

import { InputLabel } from './input_label';

// inner control
const renderControl = ({ input }) => {
  const onChange = (selection) => {
    input.onChange(selection.length > 0 ? selection[0].id : null);
  };

  const selected = _.filter(input.options, o => o.id === input.value);

  const renderLabel = () => {
    if (input.hideLabel) {
      return null;
    }

    return <InputLabel text={input.label} />;
  };

  return (
    <FormGroup>
      {renderLabel()}
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
export const TypeAheadInput = ({ name, label, hideLabel, data }) =>
(
  <Field
    name={name}
    label={label}
    hideLabel={hideLabel}
    options={data || []}
    component={renderControl}
  />
);

TypeAheadInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  data: PropTypes.array,
};
