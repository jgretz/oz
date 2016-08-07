import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadObjects } from 'actions';
import { filterById, logError } from 'support';
import { TypeAheadInput } from '../typeahead_input';

class Peer extends Component {
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
    const { field } = this.props;

    return (
      <TypeAheadInput
        name={field.name}
        label={field.name}
        data={this.state.data}
      />
    );
  }
}

Peer.propTypes = {
  schema: PropTypes.array.isRequired,
  field: PropTypes.object.isRequired,

  loadObjects: PropTypes.func.isRequired,
};

const ConnectedPeer = connect(({ schema }) => ({ schema }), { loadObjects })(Peer);

export const renderPeer = (field) => <ConnectedPeer key={field.name} field={field} />;
