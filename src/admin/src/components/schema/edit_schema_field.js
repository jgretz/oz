import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, FormGroup } from 'react-bootstrap';
import autobind from 'class-autobind';

import { TextInput, SelectInput, CheckboxInput } from 'controls/inputs';

// Field Render Component
class EditSchemaField extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  deleteField() {
    const { item: { formFields, index } } = this.props;
    formFields.remove(index);
  }

  renderPeerSelection() {
    const { item: { formFields, field, schemaId, index }, schema, fieldData } = this.props;

    const needsPeerSelection = ['peer', 'array'];
    if (!formFields) {
      return null;
    }

    const data = fieldData[index];
    if (!_.includes(needsPeerSelection, data.field_type)) {
      return null;
    }

    const objects = _.filter(schema, obj => obj._id !== schemaId);
    const values = _.map(objects, (schemaObj) => ({ key: schemaObj._id, value: schemaObj.name }));

    return <SelectInput name={`${field}.peer`} label="Relation" array={values} />;
  }

  render() {
    const { item: { field }, schemaTypes } = this.props;

    return (
      <FormGroup className="field-group">
        <Row>
          <Col xs={1} className="sort">
            <i className="fa fa-bars" />
          </Col>
          <Col xs={3}>
            <TextInput name={`${field}.name`} label="Name" />
          </Col>
          <Col xs={3}>
            <SelectInput name={`${field}.field_type`} label="Type" map={schemaTypes} />
          </Col>
          <Col xs={3}>
            <SelectInput name={`${field}.permission`} label="Permission" />
          </Col>
          <Col xs={2}>
            <Button
              bsStyle="danger"
              className="pull-right delete"
              onClick={this.deleteField}
            >
              Delete
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={3} xsOffset={1} className="field-group-checkboxes">
            <CheckboxInput name={`${field}.required`} label="Required" />
            <CheckboxInput name={`${field}.identity`} label="Identity" />
            <CheckboxInput name={`${field}.showInList`} label="Show In List" />
          </Col>
          <Col xs={3}>
            {this.renderPeerSelection()}
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

EditSchemaField.propTypes = {
  item: PropTypes.object.isRequired,

  schema: PropTypes.array.isRequired,
  schemaTypes: PropTypes.object.isRequired,
  fieldData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const schemaForm = state.form.edit_schema;
  const values = schemaForm ? schemaForm.values : null;

  return {
    schema: state.schema,
    schemaTypes: state.schemaTypes,
    fieldData: values ? values.fields : null,
  };
};

export default connect(mapStateToProps)(EditSchemaField);
