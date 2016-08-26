import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'class-autobind';

import { loadObject } from 'actions';
import { filterById, logError } from 'support';

class Peer extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      label: null,
      peer: null,
    };

    this.loadData(props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData({ ...this.props, ...nextProps });
  }

  loadData(props) {
    const { schema, field, data } = props;

    const model = filterById(schema, field.peer);
    if (!model) {
      return;
    }

    const label = _.find(model.fields, f => f.identity);
    if (!label) {
      logError(`You must supply an identity field for type '${model}'`);
      return;
    }

    this.props.loadObject(model, data).then((response) => {
      this.setState({
        label,
        peer: response.data,
      });
    }).catch(logError);
  }

  render() {
    if (!this.state.label || !this.state.peer) {
      return null;
    }

    const { label, peer } = this.state;

    return <span>{peer[label.name]}</span>;
  }
}

Peer.propTypes = {
  data: PropTypes.string,
  field: PropTypes.object.isRequired,

  schema: PropTypes.array.isRequired,
  loadObject: PropTypes.func.isRequired,
};

const ConnectedPeer = connect(({ schema }) => ({ schema }), { loadObject })(Peer);
export const renderPeer = (data, field) => <ConnectedPeer data={data} field={field} />;
