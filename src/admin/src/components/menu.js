import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { SideNav } from 'react-sidenav';

class Menu extends Component {
  componentWillMount() {}

  onSelection(selection) {
    browserHistory.push(`/${selection.id}`);
  }

  render() {
    const navigation = [{
      id: 'schema', text: 'Schema', icon: 'fa fa-gear',
      navlist: [
        { id: 'editschema', text: 'Add New Object', icon: 'fa fa-plus' },
      ],
    }];

    return (
      <div className="menu">
        <SideNav navs={navigation} onSelection={this.onSelection} />
      </div>
    );
  }
}

export default connect()(Menu);
