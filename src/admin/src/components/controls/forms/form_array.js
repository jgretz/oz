import React, { Component, PropTypes } from 'react';
import { FieldArray } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';
import autobind from 'class-autobind';

import { InputLabel, SchemaInput } from '../inputs';

class ArrayWrapper extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  addItem(fields) {
    fields.push(null);
  }

  deleteItem(fields, index) {
    fields.remove(index);
  }

  renderArray({ fields }) {
    const { field } = this.props;
    return (
      <div>
        <InputLabel text={field.name} />
        <Button
          bsStyle="primary"
          className="btn-circle"
          onClick={this.addItem.bind(this, fields)}
        >
          <i className="fa fa-plus" />
        </Button>
        <br /><br />
        {fields.map((f, i) => this.renderItem(fields, f, i))}
      </div>
    );
  }

  renderItem(fields, reduxField, index) {
    const { field } = this.props;

    return (
      <Row key={index}>
        <Col xs={10}>
          <SchemaInput
            field={field}
            reduxField={reduxField}
          />
        </Col>
        <Col xs={2}>
          <Button
            bsStyle="danger"
            className="pull-right delete"
            onClick={this.deleteItem.bind(this, fields, index)}
          >
            Delete
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    const { field } = this.props;
    return (
      <FieldArray name={field.name} component={this.renderArray} />
    );
  }
}

ArrayWrapper.propTypes = {
  field: PropTypes.object.isRequired,
};

export const formArray = (field) =>
  <ArrayWrapper key={field.name} field={field} />;
