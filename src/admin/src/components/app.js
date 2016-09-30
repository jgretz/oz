import React, { PropTypes, Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { loadSchema, loadSchemaTypes } from 'actions';

import Menu from './menu';

class App extends Component {
  componentWillMount() {
    this.props.loadSchema();
    this.props.loadSchemaTypes();
  }

  render() {
    return (
      <Row className="menu-container">
        <Col xs={4} sm={3} md={2}>
          <Menu />
        </Col>
        <Col xs={8} sm={9} md={10}>
          <div className="content">
            {this.props.children}
          </div>
        </Col>
      </Row>
    );
  }
}

App.propTypes = {
  route: PropTypes.object.isRequired,
  children: PropTypes.object,

  loadSchema: PropTypes.func.isRequired,
  loadSchemaTypes: PropTypes.func.isRequired,
};

export default connect(null, { loadSchema, loadSchemaTypes })(App);
