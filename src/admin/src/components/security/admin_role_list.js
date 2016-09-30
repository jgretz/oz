import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Table } from 'react-bootstrap';
import autobind from 'class-autobind';

import { loadAdminRoles } from 'actions';
import { goto } from 'support';

class AdminRoleList extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  // load
  componentWillMount() {
    this.props.loadAdminRoles();
  }

  // click handlers
  newRole() {
    goto('adminroles/new');
  }

  editRole(user) {
    goto(`adminroles/${user._id}`);
  }

  // render
  renderHeader() {
    return (
      <div>
        <Button bsStyle="success" className="pull-right new" onClick={this.newRole}>
          New
        </Button>
        <h4>
          Admin Roles
        </h4>
      </div>
    );
  }

  renderTableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Can Edit Schema</th>
          <th>Can Edit Security</th>
          <th />
        </tr>
      </thead>
    );
  }

  renderRoles() {
    return (
      <tbody>
        {
          this.props.adminRoles.map(role =>
            <tr key={role._id}>
              <td>{role.name}</td>
              <td>{role.canEditSchema ? 'X' : ''}</td>
              <td>{role.canEditSecurity ? 'X' : ''}</td>
              <td className="edit" onClick={this.editRole.bind(this, role)}>
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
              {this.renderRoles()}
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

AdminRoleList.propTypes = {
  adminRoles: PropTypes.array.isRequired,

  loadAdminRoles: PropTypes.func.isRequired,
};

const mapStateToProps = ({ adminRoles }) => ({ adminRoles });

export default connect(mapStateToProps, { loadAdminRoles })(AdminRoleList);
