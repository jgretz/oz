import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import { loadObjects } from 'actions';
import { bind } from 'support';

class DataList extends Component {
  constructor(props) {
    super(props);

    this.state = { model: null };

    bind(this, [this.loadProps, this.newObject]);
  }

  // load
  componentWillMount() {
    this.loadProps(this.props.schema, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id && nextProps.params.id !== this.props.params.id) {
      this.loadProps(this.props.schema, nextProps.params.id);
    }

    if (nextProps.schema && nextProps.schema !== this.props.schema) {
      this.loadProps(nextProps.schema, this.props.params.id);
    }
  }

  loadProps(schema, id) {
    const model = _.find(schema, m => m._id === id);
    if (!model) {
      return;
    }

    this.setState({ model });
    this.props.loadObjects(model.name);
  }

  // click handlers
  newObject() {
    browserHistory.push(`/data/${this.props.params.id}/new`);
  }

  // render
  renderHeader() {
    if (!this.state.model) {
      return null;
    }

    return (
      <h4>
        {this.state.model.name}
      </h4>
    );
  }

  renderObjects() {
    if (!this.state.model) {
      return null;
    }

    const data = this.props.data[this.state.model.name.toLowerCase()];
    if (!data) {
      return null;
    }

    return data.map((obj) => (
      <li>
        {obj.name}
      </li>
    ));
  }

  render() {
    return (
      <div className="data-list">
        <Row>
          <Col xs={12}>
            <Button bsStyle="success" className="pull-right" onClick={this.newObject}>
              New
            </Button>
            {this.renderHeader()}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ul>
              {this.renderObjects()}
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}

DataList.propTypes = {
  params: PropTypes.object.isRequired,
  schema: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,

  loadObjects: PropTypes.func.isRequired,
};

const mapStateToProps = ({ schema, data }) => ({ schema, data });

export default connect(mapStateToProps, { loadObjects })(DataList);
