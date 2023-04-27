import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import './style/App.css'
import NavbarSide from './NavbarSide';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Redirect exact from='/' to='/login' />
            <Route exact path='/login'> <Login /> </Route>
            <Route component={NavbarSide} />
        </Switch>
    </BrowserRouter>

  );
}

export default App;