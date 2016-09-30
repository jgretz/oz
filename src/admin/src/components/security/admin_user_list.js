import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table } from 'react-bootstrap';
import autobind from 'class-autobind';

import { loadAdminUsers } from 'actions';
import { goto } from 'support';

class AdminUserList extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  // load
  componentWillMount() {
    this.props.loadAdminUsers();
  }

  // click handlers
  newUser() {
    goto('adminusers/new');
  }

  editUser(user) {
    goto(`adminusers/${user._id}`);
  }

  // render
  renderHeader() {
    return (
      <div>
        <Button bsStyle="success" className="pull-right new" onClick={this.newUser}>
          New
        </Button>
        <h4>
          Admin Users
        </h4>
      </div>
    );
  }

  renderTableHeader() {
    return (
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th />
        </tr>
      </thead>
    );
  }

  renderUsers() {
    return (
      <tbody>
        {
          this.props.adminUsers.map(user =>
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="edit" onClick={this.editUser.bind(this, user)}>
                Edit
              </td>
            </tr>
          )
        }
      </tbody>
    );
  }

  render() {
    return (
      <div className="data-list">
        <Row>
          <Col xs={12}>
            {this.renderHeader()}
            <hr />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Table striped bordered condensed hover>
              {this.renderTableHeader()}
              {this.renderUsers()}
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

AdminUserList.propTypes = {
  adminUsers: PropTypes.array.isRequired,

  loadAdminUsers: PropTypes.func.isRequired,
};

const mapStateToProps = ({ adminUsers }) => ({ adminUsers });

export default connect(mapStateToProps, { loadAdminUsers })(AdminUserList);
