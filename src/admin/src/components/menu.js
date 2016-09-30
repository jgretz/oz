import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { goto } from 'support';

class Menu extends Component {
  onSelection(page, object) {
    goto(`${page}/${object._id}`);
  }

  newSchema() {
    goto('schema');
  }

  adminUsers() {
    goto('adminusers');
  }

  adminRoles() {
    goto('adminroles');
  }

  buildNavigation(page, objects) {
    return objects.map(obj =>
    (
      <li key={obj._id} onClick={this.onSelection.bind(this, page, obj)}>
        {obj.name} <i className={`fa ${obj.icon}`} />
      </li>
    ));
  }

  render() {
    const sorted = _.sortBy(this.props.schema, 'name');
    const data = _.filter(sorted, s => !s.hideInData);

    return (
      <div className="menu">
        <div>
          <h2>Data</h2>
          <ul>
            {this.buildNavigation('data', data)}
          </ul>
        </div>
        <div>
          <h2>Schema</h2>
          <ul>
            <li onClick={this.newSchema}>
              New<i className="fa fa-plus" />
            </li>
            {this.buildNavigation('schema', sorted)}
          </ul>
        </div>
        <div>
          <h2>Security</h2>
          <ul>
            <li onClick={this.adminUsers}>
              Users <i className="fa fa-users" />
            </li>
            <li onClick={this.adminRoles}>
              Roles <i className="fa fa-wrench" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  schema: PropTypes.array.isRequired,
};

const mapStateToProps = ({ schema }) => ({ schema });

export default connect(mapStateToProps)(Menu);
