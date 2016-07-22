import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Menu extends Component {
  componentWillMount() {}

  render() {
    return (
      <div>
        Menu
      </div>
    );
  }
}

export default connect()(Menu);
