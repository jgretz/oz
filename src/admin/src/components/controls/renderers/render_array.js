import React, { Component, PropTypes } from 'react';
import { FieldArray } from 'redux-form';
import { Button } from 'react-bootstrap';
import autobind from 'class-autobind';

import { InputLabel } from '../input-label';
import { SchemaInput } from '../schema_input';

class ArrayWrapper extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  addItem(fields) {
    fields.push(null);
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
        {fields.map((f, i) => this.renderItem(f, i))}
      </div>
    );
  }

  renderItem(reduxField, index) {
    const { field } = this.props;

    return (
      <SchemaInput
        key={index}
        field={field}
        reduxField={reduxField}
      />
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

export const renderArray = (field) =>
  <ArrayWrapper key={field.name} field={field} />;
