import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'class-autobind';

import { loadAdminRoles } from 'actions';
import { TypeAheadInputRemote } from './typeahead_input_remote';

class RoleInput extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.props.loadAdminRoles().then((response) => {
        const data = response.data.map(d => ({
          id: d._id,
          label: d.name,
        }));

        resolve(data);
      }).catch(reject);
    });
  }

  render() {
    const { field, reduxField } = this.props;

    return (
      <TypeAheadInputRemote
        field={field}
        reduxField={reduxField}
        loadData={this.loadData}
      />
    );
  }
}

RoleInput.propTypes = {
  field: PropTypes.object.isRequired,
  reduxField: PropTypes.string,

  adminRoles: PropTypes.array.isRequired,
  loadAdminRoles: PropTypes.func.isRequired,
};

export const AdminRoleInput = connect(({ adminRoles }) => (
  { adminRoles }),
  { loadAdminRoles }
)(RoleInput);
