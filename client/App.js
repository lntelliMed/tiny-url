import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainPage from './containers/MainPage';

class App extends Component {
  render() {
    let routes = (
      <Switch >
        <Route path="/" component={MainPage} />
        <Redirect to="/" />
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
