import React, { PropTypes, Component } from 'react';

class App extends Component {
  render() {
    return (
        <div>
          Admin Site
        </div>
    );
  }
}

App.propTypes = {
  route: PropTypes.object.isRequired
};

export default App;
