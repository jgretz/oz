import React, { Component, PropTypes } from 'react';

import { logError } from 'support';
import { TypeAheadInput } from './typeahead_input';

export class TypeAheadInputRemote extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  componentWillMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.field.peer !== this.props.field.peer) {
      this.loadData(nextProps);
    }
  }

  loadData({ field }) {
    this.props.loadData(field).then((data) => {
      this.setState({ data });
    }).catch(logError);
  }

  render() {
    const { field, reduxField } = this.props;

    return (
      <TypeAheadInput
        name={reduxField || field.name}
        label={field.name}
        hideLabel={reduxField != null}
        data={this.state.data}
      />
    );
  }
}

TypeAheadInputRemote.propTypes = {
  field: PropTypes.object.isRequired,
  reduxField: PropTypes.string,

  loadData: PropTypes.func.isRequired,
};
