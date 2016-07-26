import React, { PropTypes, Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Menu from './menu';
import { loadObjects, loadSchemaTypes } from 'actions';

class App extends Component {
  componentWillMount() {
    this.props.loadObjects();
    this.props.loadSchemaTypes();
  }

  render() {
    return (
      <Row>
        <Col xs={2}>
          <Menu />
        </Col>
        <Col xs={10}>
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

  loadObjects: PropTypes.func.isRequired,
  loadSchemaTypes: PropTypes.func.isRequired,
};

export default connect(null, { loadObjects, loadSchemaTypes })(App);
