import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadObjects } from 'actions';
import { filterById, logError } from 'support';

import { TypeAheadInput } from './typeahead_input';

class ObjectInput extends Component {
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
    const model = filterById(this.props.schema, field.peer);
    if (!model) {
      return;
    }

    this.props.loadObjects(model).then((response) => {
      const labelField = _.find(model.fields, f => f.identity);
      if (!labelField) {
        logError(`You must supply an identity field for type '${model}'`);
        return;
      }

      const data = response.data.map(d => ({
        id: d._id,
        label: d[labelField.name],
      }));

      this.setState({ data });
    });
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

ObjectInput.propTypes = {
  field: PropTypes.object.isRequired,
  reduxField: PropTypes.string,

  schema: PropTypes.array.isRequired,
  loadObjects: PropTypes.func.isRequired,
};

export const SchemaInput = connect(({ schema }) => ({ schema }), { loadObjects })(ObjectInput);
