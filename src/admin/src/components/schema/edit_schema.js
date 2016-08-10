import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray } from 'redux-form';
import { Row, Col, Button, FormGroup } from 'react-bootstrap';
import autobind from 'class-autobind';

import { TextInput, SelectInput, CheckboxInput } from 'controls';
import { saveSchema, deleteSchema } from 'actions';
import { filterById, goto } from 'support';

class EditSchema extends Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  componentWillMount() {
    this.props.initialize(
      filterById(this.props.schema, this.props.params.id, {}),
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.initialize(
        filterById(this.props.schema, nextProps.params.id, {}),
      );
    }

    if (nextProps.schema !== this.props.schema) {
      this.props.initialize(
        filterById(nextProps.schema, this.props.params.id, {}),
      );
    }
  }

  // click handling
  addField(fields) {
    fields.push({
      name: '',
      field_type: 'string',
      peer: null,
      required: false,
      identity: false,
      showInList: false,
    });
  }

  submit(form) {
    this.props.saveSchema(form).then((obj) => {
      goto(`schema/${obj.data._id}`);
    });
  }

  delete() {
    this.props.deleteSchema(this.props.params.id).then(() => {
      goto('schema');
    });
  }

  deleteField(fields, index) {
    fields.remove(index);
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
         {fields.map((field, index) => this.renderField(fields, field, index))}
      </div>
    );
  }

  renderField(fields, field, index) {
    const needsPeerSelection = ['peer', 'array'];
    const renderPeerSelection = () => {
      if (!this.props.fields) {
        return null;
      }

      const fieldData = this.props.fields[index];
      if (!_.includes(needsPeerSelection, fieldData.field_type)) {
        return null;
      }

      const objects = _.filter(this.props.schema, obj => obj._id !== this.props.params.id);
      const values = _.map(objects, (schemaObj) => ({ key: schemaObj._id, value: schemaObj.name }));

      return <SelectInput name={`${field}.peer`} label="Relation" array={values} />;
    };

    return (
      <FormGroup key={index} className="field-group">
        <Row>
          <Col xs={4}>
            <TextInput name={`${field}.name`} label="Name" />
          </Col>
          <Col xs={3}>
            <SelectInput name={`${field}.field_type`} label="Type" map={this.props.schemaTypes} />
          </Col>
          <Col xs={3}>
            <SelectInput name={`${field}.permission`} label="Permission" />
          </Col>
          <Col xs={2}>
            <Button
              bsStyle="danger"
              className="pull-right delete"
              onClick={this.deleteField.bind(this, fields, index)}
            >
              Delete
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={4} className="field-group-checkboxes">
            <CheckboxInput name={`${field}.required`} label="Required" />
            <CheckboxInput name={`${field}.identity`} label="Identity" />
            <CheckboxInput name={`${field}.showInList`} label="Show In List" />
          </Col>
          <Col xs={3}>
            {renderPeerSelection()}
          </Col>
        </Row>
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
  fields: PropTypes.array,

  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,

  saveSchema: PropTypes.func.isRequired,
  deleteSchema: PropTypes.func.isRequired,
};

const form = reduxForm({
  form: 'edit_schema',
})(EditSchema);

const mapStateToProps = (state) => {
  const schemaForm = state.form.edit_schema;
  const values = schemaForm ? schemaForm.values : null;

  return {
    schema: state.schema,
    schemaTypes: state.schemaTypes,
    fields: values ? values.fields : null,
  };
};

export default connect(mapStateToProps, { saveSchema, deleteSchema })(form);
