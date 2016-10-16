import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';
import autobind from 'class-autobind';

import { TextInput } from 'controls/inputs';
import { login } from 'actions';

// class
class Login extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  // actions
  onLogin(form) {
    this.props.login(form.username, form.password);
  }

  // render
  renderForm() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onLogin)}>
        <TextInput name="username" label="Username" />
        <TextInput name="password" label="Password" type="password" />

        <Button bsStyle="success" type="submit" className="pull-right">Login</Button>
      </form>
    );
  }

  render() {
    return (
      <div className="login">
        <Row>
          <Col xs={6} xsOffset={2}>
            { this.renderForm() }
          </Col>
        </Row>
      </div>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const form = reduxForm({ form: 'login' })(Login);
export default connect(null, { login })(form);
