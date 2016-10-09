import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'class-autobind';

import { loadObjects } from 'actions';
import { filterById, logError } from 'support';

import { TypeAheadInputRemote } from './typeahead_input_remote';

class ObjectInput extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  loadData(field) {
    return new Promise((resolve, reject) => {
      const model = filterById(this.props.schema, field.peer);
      if (!model) {
        reject();
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

        resolve(data);
      });
    });
  }

  render() {
    const { field, reduxField } = this.props;

    return (
      <TypeAheadInputRemote
        field={field}
        reduxField={reduxField}
        loadData={this.loadData}
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
