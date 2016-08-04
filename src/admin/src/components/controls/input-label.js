import React, { PropTypes } from 'react';
import { ControlLabel } from 'react-bootstrap';
import humanizePlus from 'humanize-plus';

// ReduxForm control
export const InputLabel = ({ text }) =>
(
  <ControlLabel>
    {humanizePlus.capitalize(text)}
  </ControlLabel>
);

InputLabel.propTypes = {
  text: PropTypes.string.isRequired,
};
