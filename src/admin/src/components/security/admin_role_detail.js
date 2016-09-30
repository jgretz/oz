import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';
import autobind from 'class-autobind';
import Notifications, { notify } from 'react-notify-toast';

import { TextInput, CheckboxInput } from 'controls/inputs';
import { loadAdminRole, saveAdminRole, deleteAdminRole } from 'actions';
import { goto } from 'support';

class AdminRoleDetail extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      newRole: {},
    };
  }

  // load
  componentWillMount() {
    this.loadRole(this.props.params.id);

    if (this.props.adminRole) {
      this.props.initialize(this.props.adminRole);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id && nextProps.params.id !== this.props.params.id) {
      this.loadRole(nextProps.params.id);
    }

    if (nextProps.adminRole && nextProps.adminRole !== this.props.adminRole) {
      this.props.initialize(nextProps.adminRole);
    }
  }

  loadRole(id) { // eslint-disable-line
    if (this.isNew(id)) {
      return;
    }

    this.props.loadAdminRole(id);
  }

  // click handlers
  save(form) {
    this.props.saveAdminRole(form)
      .then((response) => {
        goto(`adminroles/${response.data._id}`);

        notify.show('Saved!', 'success', 2000);
      });
  }

  delete() {
    this.props.deleteAdminRole(this.props.params.id)
      .then(() => { goto('adminroles'); });
  }

  // helper
  isNew(id) {
    return id === 'new';
  }

  getRole() {
    return this.isNew(this.props.params.id) ? this.state.newRole : this.props.adminRole;
  }

  // render
  renderHeader() {
    const user = this.getRole();
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

    const name = isNew || !user ? 'New Admin Role' : user.name;

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
              <CheckboxInput name="canEditSchema" label="Can Edit Schema" />
              <CheckboxInput name="canEditSecurity" label="Can Edit Security" />
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

AdminRoleDetail.propTypes = {
  params: PropTypes.object.isRequired,
  adminRole: PropTypes.object,

  loadAdminRole: PropTypes.func.isRequired,
  saveAdminRole: PropTypes.func.isRequired,
  deleteAdminRole: PropTypes.func.isRequired,

  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
};

// redux form
const form = reduxForm({
  form: 'AdminRoleDetail',
})(AdminRoleDetail);

// redux
const mapStateToProps = ({ adminRoles }, props) =>
({
  adminRole: _.find(adminRoles, u => u._id === props.params.id),
});

export default connect(mapStateToProps,
  { loadAdminRole, saveAdminRole, deleteAdminRole }
)(form);
