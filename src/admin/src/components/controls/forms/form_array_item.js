import React, { Component, PropTypes } from 'react';
import autobind from 'class-autobind';
import { Row, Col, Button } from 'react-bootstrap';

import { goto } from 'support';
import { SchemaInput } from '../inputs';

// Field Render Component
export default class FormArrayItem extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  deleteItem() {
    const { item: { fields, index } } = this.props;
    fields.remove(index);
  }

  newItem() {
    const { item: { field } } = this.props;
    goto(`data/${field.peer}/new`);
  }

  render() {
    const { item: { field, reduxField } } = this.props;

    return (
      <Row>
        <Col xs={1} className="sort">
          <i className="fa fa-bars" />
        </Col>
        <Col xs={9}>
          <SchemaInput
            field={field}
            reduxField={reduxField}
          />
        </Col>
        <Col xs={2}>
          <Button
            bsStyle="primary"
            className="pull-right new-array"
            onClick={this.newItem}
          >
            New
          </Button>
          <Button
            bsStyle="danger"
            className="pull-right delete"
            onClick={this.deleteItem}
          >
            Delete
          </Button>
        </Col>
      </Row>
    );
  }
}

FormArrayItem.propTypes = {
  item: PropTypes.object.isRequired,
};
