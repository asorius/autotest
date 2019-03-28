import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GlobalState from './context/GlobalState';
import LandingPage from './components/LandingPage';

const App = props => {
  return (
    <GlobalState>
      <BrowserRouter>
        <Route path="/" component={LandingPage} exact />
      </BrowserRouter>
    </GlobalState>
  );
};

export default App;
