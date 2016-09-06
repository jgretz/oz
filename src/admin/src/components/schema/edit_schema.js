// import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';
import autobind from 'class-autobind';
import Reorder from 'react-reorder';

import { TextInput, CheckboxInput } from 'controls/inputs';
import { saveSchema, deleteSchema } from 'actions';
import { filterById, goto } from 'support';

import EditSchemaField from './edit_schema_field';

// Page Component
const formName = 'edit_schema';

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

  fieldSorted(event, moved, prevIndex, newIndex) {
    if (prevIndex === newIndex) {
      return;
    }

    const { formFields } = moved;
    formFields.swap(prevIndex, newIndex);
  }

  // render
  renderFields({ fields }) {
    const map = fields.map((field, index) => ({
      formFields: fields,
      schemaId: this.props.params.id,
      field,
      index,
    }));

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
        <Reorder
          itemKey="index"
          lock="horizontal"
          holdTime="100"
          list={map}
          template={EditSchemaField}
          callback={this.fieldSorted}
        />
      </div>
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
              <CheckboxInput name="hideInData" label="Hide In Data" />
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

  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,

  saveSchema: PropTypes.func.isRequired,
  deleteSchema: PropTypes.func.isRequired,
};

const form = reduxForm({
  form: formName,
})(EditSchema);

const mapStateToProps = ({ schema }) => ({ schema });
export default connect(mapStateToProps, { saveSchema, deleteSchema })(form);
