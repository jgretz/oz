import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';
import autobind from 'class-autobind';
import Notifications, { notify } from 'react-notify-toast';

import { TextInput } from 'controls/inputs';
import { loadAdminUser, saveAdminUser, deleteAdminUser } from 'actions';
import { goto } from 'support';

class AdminUserDetail extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      newUser: {},
    };
  }

  // load
  componentWillMount() {
    this.loadUser(this.props.params.id);

    if (this.props.adminUser) {
      this.props.initialize(this.props.adminUser);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id && nextProps.params.id !== this.props.params.id) {
      this.loadUser(nextProps.params.id);
    }

    if (nextProps.adminUser && nextProps.adminUser !== this.props.adminUser) {
      this.props.initialize(nextProps.adminUser);
    }
  }

  loadUser(id) { // eslint-disable-line
    if (this.isNew(id)) {
      return;
    }

    this.props.loadAdminUser(id);
  }

  // click handlers
  save(form) {
    this.props.saveAdminUser(form)
      .then((response) => {
        goto(`adminusers/${response.data._id}`);

        notify.show('Saved!', 'success', 2000);
      });
  }

  delete() {
    this.props.deleteAdminUser(this.props.params.id)
      .then(() => { goto('adminusers'); });
  }

  // helper
  isNew(id) {
    return id === 'new';
  }

  getUser() {
    return this.isNew(this.props.params.id) ? this.state.newUser : this.props.adminUser;
  }

  // render
  renderHeader() {
    const user = this.getUser();
    const isNew = this.isNew(this.props.params.id);

    const deleteButton = () => {
      if (!isNew) {
        return (
          <Button bsStyle="danger" className="pull-right delete" onClick={this.delete.bind(this)}>
            Delete
          </Button>
        );
      }

      return null;
    };

    const name = isNew || !user ? 'New Admin User' : user.name;

    return (
      <div>
        <h4>
          <Button bsStyle="success" type="submit" className="pull-right save">
            Save
          </Button>
          {deleteButton()}

          {name}
        </h4>
        <hr />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="edit-user">
        <Notifications />
        <Row>
          <Col xs={12}>
            <form onSubmit={handleSubmit(this.save)}>
              {this.renderHeader()}

              <TextInput name="name" label="Name" />
              <TextInput name="email" label="Email" />
              <TextInput name="password" label="Password" type="password" />
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

AdminUserDetail.propTypes = {
  params: PropTypes.object.isRequired,
  adminUser: PropTypes.object,

  loadAdminUser: PropTypes.func.isRequired,
  saveAdminUser: PropTypes.func.isRequired,
  deleteAdminUser: PropTypes.func.isRequired,

  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
};

// redux form
const form = reduxForm({
  form: 'AdminUserDetail',
})(AdminUserDetail);

// redux
const mapStateToProps = ({ adminUsers }, props) =>
({
  adminUser: _.find(adminUsers, u => u._id === props.params.id),
});

export default connect(mapStateToProps,
  { loadAdminUser, saveAdminUser, deleteAdminUser }
)(form);
