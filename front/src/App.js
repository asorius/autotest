import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalState from './context/GlobalState';
import LandingPage from './components/LandingPage';

const App = props => {
  return (
    <GlobalState>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/:key" component={LandingPage} exact />
        </Switch>
      </BrowserRouter>
    </GlobalState>
  );
};

export default App;
