import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from './Main/Home';

// import style from './Style';

const Main = () => (
  <main>
    <Switch>
      <Route
        exact
        path='/'
        render={(props) => <Home {...props}  />}
      />
    </Switch>
  </main>
);

export default Main;
