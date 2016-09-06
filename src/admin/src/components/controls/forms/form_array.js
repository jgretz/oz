import React, { Component, PropTypes } from 'react';
import { FieldArray } from 'redux-form';
import { Button } from 'react-bootstrap';
import autobind from 'class-autobind';
import Reorder from 'react-reorder';

import { InputLabel } from '../inputs';
import FormArrayItem from './form_array_item';

class ArrayWrapper extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  addItem(fields) {
    fields.push(null);
  }

  itemsSorted(event, moved, prevIndex, newIndex) {
    if (prevIndex === newIndex) {
      return;
    }

    const { fields } = moved;
    fields.swap(prevIndex, newIndex);
  }

  renderArray({ fields }) {
    const { field } = this.props;
    const list = fields.map((reduxField, index) => ({ fields, field, reduxField, index }));

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
        <br className="btn-break" />
        <Reorder
          itemKey="index"
          lock="horizontal"
          holdTime="100"
          list={list}
          template={FormArrayItem}
          callback={this.itemsSorted}
        />
      </div>
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
