import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import GlobalState from './context/GlobalState'
import LandingPage from './components/LandingPage'
import CompareItem from './components/CompareItem'

const App =props=> {
 return(
   <GlobalState>
     <BrowserRouter>
      <Switch>
        <Route path='/' component={LandingPage} exact />
        </Switch>
     </BrowserRouter>
     </GlobalState> 
 )
  
}

export default App;
