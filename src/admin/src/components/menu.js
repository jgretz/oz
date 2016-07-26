import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Menu extends Component {
  onSelection(page, object) {
    browserHistory.push(`/${page}/${object._id}`);
  }

  newSchema() {
    browserHistory.push('/schema');
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
    const sorted = _.sortBy(this.props.objects, 'name');
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
  objects: PropTypes.array.isRequired,
};

const mapStateToProps = ({ objects }) => ({ objects });

export default connect(mapStateToProps)(Menu);
