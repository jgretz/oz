import React, { PropTypes, Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Menu from './menu';

class App extends Component { // eslint-disable-line
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
};

export default App;
