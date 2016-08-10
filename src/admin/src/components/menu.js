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
    return (
      <div className="menu">
        <div>
          <h2>Data</h2>
          <ul>
            {this.buildNavigation('data', sorted)}
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
      </div>
    );
  }
}

Menu.propTypes = {
  schema: PropTypes.array.isRequired,
};

const mapStateToProps = ({ schema }) => ({ schema });

export default connect(mapStateToProps)(Menu);
