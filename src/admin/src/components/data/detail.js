import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';
import autobind from 'class-autobind';

import { loadObject, saveObject, deleteObject } from 'actions';
import { formField } from 'controls/forms';
import { filterById, goto } from 'support';

class DataDetail extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = { model: null, object: {} };
  }

  // load
  componentWillMount() {
    this.loadProps(this.props.schema, this.props.params.object, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id && nextProps.params.id !== this.props.params.id) {
      this.loadProps(this.props.schema, nextProps.params.object, nextProps.params.id);
    }

    if (nextProps.schema && nextProps.schema !== this.props.schema) {
      this.loadProps(nextProps.schema, this.props.params.object, this.props.params.id);
    }
  }

  loadProps(schema, objectId, id) {
    const model = filterById(schema, objectId);
    if (!model) {
      return;
    }

    this.setState({ model });

    if (!this.isNew()) {
      this.props.loadObject(model, id).then((response) => {
        this.props.initialize(response.data);
      });
    }
  }

  isNew() {
    return this.props.params.id === 'new';
  }

  // click handlers
  save(form) {
    this.props.saveObject(this.state.model, form).then((response) => {
      goto(`data/${this.state.model._id}/${response.data._id}`);
    });
  }

  delete() {
    this.props.deleteObject(this.state.model, this.props.params.id).then(() => {
      goto(`data/${this.state.model._id}`);
    });
  }

  // render
  renderFields() {
    if (!this.state.model) {
      return null;
    }

    return (
      <div>
      {
        this.state.model.fields.map(field => formField(field))
      }
      </div>
    );
  }

  renderHeader() {
    if (!this.state.model) {
      return null;
    }

    const deleteButton = () => {
      if (!this.isNew()) {
        return (
          <Button bsStyle="danger" className="pull-right delete" onClick={this.delete.bind(this)}>
            Delete
          </Button>
        );
      }

      return null;
    };

    return (
      <div>
        <h4>
          <Button bsStyle="success" type="submit" className="pull-right save">
            Save
          </Button>
          {deleteButton()}

          {this.state.model.name}
        </h4>
        <hr />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="data-detail">
        <form onSubmit={handleSubmit(this.save)}>
          <Row>
            <Col xs={12}>
              {this.renderHeader()}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {this.renderFields()}
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

DataDetail.propTypes = {
  params: PropTypes.object.isRequired,
  schema: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,

  loadObject: PropTypes.func.isRequired,
  saveObject: PropTypes.func.isRequired,
  deleteObject: PropTypes.func.isRequired,

  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
};

const mapStateToProps = ({ schema, data }) => ({ schema, data });
const mapFuncToProps = { loadObject, saveObject, deleteObject };
const connectedForm = connect(mapStateToProps, mapFuncToProps)(DataDetail);

export default reduxForm({
  form: 'edit_schema',
})(connectedForm);
