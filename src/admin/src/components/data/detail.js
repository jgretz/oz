import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import autobind from 'class-autobind';

import { loadObject, saveObject, deleteObject } from 'actions';
import { renderField } from 'controls';

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

  loadProps(schema, object, id) {
    const model = _.find(schema, m => m._id === object);
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
      browserHistory.push(`/data/${this.state.model._id}/${response.data._id}`);
    });
  }

  delete() {
    this.props.deleteObject(this.state.model, this.props.params.id).then(() => {
      browserHistory.push(`/data/${this.state.model._id}`);
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
        this.state.model.fields.map(field => renderField(field))
      }
      </div>
    );
  }

  renderHeader() {
    if (!this.state.model) {
      return null;
    }

    const { handleSubmit } = this.props;

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
          <Button bsStyle="success" className="pull-right save" onClick={handleSubmit(this.save)}>
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
    return (
      <div className="data-detail">
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
