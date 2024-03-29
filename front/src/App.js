import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalState from './context/GlobalState';
// import LandingPage from './components/LandingPage';
// import SharedPage from './components/SharedPage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
const LaziedLanding = React.lazy(() => import('./components/LandingPage'));

const LaziedSuspenced = () => {
  return (
    <>
      <React.Suspense
        fallback={
          <div
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              height: '100%',
              width: '100%',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <CircularProgress size={100} thickness={5} />
          </div>
        }
      >
        <LaziedLanding></LaziedLanding>
      </React.Suspense>
    </>
  );
};
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5c6bc0',
    },
    secondary: {
      main: '#26a69a',
    },
    text: {
      primary: '#030303',
      secondary: '#545454',
    },
  },
});
theme.typography.h1 = {
  fontSize: '3.2rem',
  '@media (min-width:600px)': {
    fontSize: '4.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '5rem',
  },
};
theme.typography.h2 = {
  fontSize: '1.6rem',
  '@media (min-width:600px)': {
    fontSize: '2.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.3rem',
  },
};

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalState>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LaziedSuspenced} exact />
            <Route path="/:key" component={LaziedSuspenced} exact />
          </Switch>
        </BrowserRouter>
      </GlobalState>
    </ThemeProvider>
  );
};

export default App;
