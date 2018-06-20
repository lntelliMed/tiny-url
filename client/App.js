import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainPage from './containers/MainPage';

class App extends Component {
  render() {
    let routes = (
      <Switch >
        <Route path="/tiny-url" component={MainPage} />
        <Redirect to="/tiny-url" />
      </Switch >
    );

    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default App;
