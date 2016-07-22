import React, { PropTypes, Component } from 'react';

class App extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        Admin Site
      </div>
    );
  }
}

App.propTypes = {
  route: PropTypes.object.isRequired,
};

export default App;
