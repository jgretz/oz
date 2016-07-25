import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray } from 'redux-form';
import { Row, Col, Button, FormGroup } from 'react-bootstrap';

import { TextInput, SelectInput, CheckboxInput } from 'controls';
import { saveObject } from 'actions';
import { bind } from 'support';
import constants from 'constants';

class EditSchema extends Component {
  constructor(props) {
    super(props);

    bind(this, [
      this.submit,
      this.renderFields, this.renderField,
    ]);
  }

  // click handling
  addField(fields) {
    fields.push({
      name: '',
      type: 'string',
      required: false,
    });
  }

  submit(form) {
    console.log(form);
  }

  // render
  renderFields({ fields }) {
    return (
      <div>
        <h4>
          Fields
          <Button
            bsStyle="primary"
            className="btn-circle"
            onClick={this.addField.bind(this, fields)}
          >
            <i className="fa fa-plus" />
          </Button>
        </h4>
        <hr />
         {fields.map((field, index) => this.renderField(field, index))}
      </div>
    );
  }

  renderField(field, index) {
    return (
      <FormGroup key={index} className="inline-group">
        <TextInput name={`${field}.name`} label="Name" />
        <SelectInput name={`${field}.type`} label="Type" map={constants.typeMap} />
        <CheckboxInput name={`${field}.required`} label="Required" />
      </FormGroup>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="edit-schema">
        <Row>
          <Col xs={12}>
            <form onSubmit={handleSubmit(this.submit)}>
              <Button
                type="submit"
                bsStyle="success"
                className="pull-right save"
              >
                Save
              </Button>
              <h4>General</h4>
              <hr />
              <TextInput name="name" label="Name" />
              <TextInput name="icon" label="Icon" />
              <br /><br />
              <FieldArray name="fields" component={this.renderFields} />
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

EditSchema.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  saveObject: PropTypes.func.isRequired,
};

const connectedForm = connect(null, { saveObject })(EditSchema);
export default reduxForm({
  form: 'edit_schema',
})(connectedForm);
