import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray } from 'redux-form';
import { Row, Col, Button, FormGroup } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import { TextInput, SelectInput, CheckboxInput } from 'controls';
import { saveSchema, deleteSchema } from 'actions';
import { bind } from 'support';

class EditSchema extends Component {
  constructor(props) {
    super(props);

    bind(this, [this.submit, this.renderFields]);
  }

  componentWillMount() {
    this.props.initialize(
      this.defineObject(this.props.params.id, this.props.schema),
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.initialize(
        this.defineObject(nextProps.params.id, this.props.schema),
      );
    }

    if (nextProps.schema !== this.props.schema) {
      this.props.initialize(
        this.defineObject(this.props.params.id, nextProps.schema),
      );
    }
  }

  defineObject(id, schema) {
    if (!id) {
      return {};
    }

    return _.find(schema, o => o._id === id);
  }

  // click handling
  addField(fields) {
    fields.push({
      name: '',
      field_type: 'string',
      required: false,
    });
  }

  submit(form) {
    this.props.saveSchema(form).then((obj) => {
      browserHistory.push(`/schema/${obj.data._id}`);
    });
  }

  delete() {
    this.props.deleteSchema(this.props.params.id).then(() => {
      browserHistory.push('/schema');
    });
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
        <SelectInput name={`${field}.field_type`} label="Type" map={this.props.schemaTypes} />
        <CheckboxInput name={`${field}.required`} label="Required" />
      </FormGroup>
    );
  }

  render() {
    const { handleSubmit, params: { id } } = this.props;

    const deleteButton = () => {
      if (id) {
        return (
          <Button bsStyle="danger" className="pull-right delete" onClick={this.delete.bind(this)}>
            Delete
          </Button>
        );
      }

      return null;
    };

    return (
      <div className="edit-schema">
        <Row>
          <Col xs={12}>
            <form onSubmit={handleSubmit(this.submit)}>
              <Button type="submit" bsStyle="success" className="pull-right save">
                Save
              </Button>
              {deleteButton()}
              <h4>General</h4>
              <hr />
              <TextInput name="name" label="Name" />
              <TextInput name="url" label="Url" />
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
  params: PropTypes.object.isRequired,
  schema: PropTypes.array.isRequired,
  schemaTypes: PropTypes.object.isRequired,

  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,

  saveSchema: PropTypes.func.isRequired,
  deleteSchema: PropTypes.func.isRequired,
};

const mapStateToProps = ({ schema, schemaTypes }) => ({ schema, schemaTypes });
const connectedForm = connect(mapStateToProps, { saveSchema, deleteSchema })(EditSchema);

export default reduxForm({
  form: 'edit_schema',
})(connectedForm);
