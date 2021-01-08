import React, { useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from "./history"
import './App.css';

import Home from "./components/Home"
import Navbar from "./components/Navbar"
import NominationList from "./components/NominationList"
import Login from "./components/Login"
import SignUp from "./components/SignUp"

function App() {
  return (
    <Router history={history}>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' render={routerProps => <Home />} />
          <Route exact path='/list' render={routerProps => <NominationList />} />
          <Route exact path='/login' render={routerProps => <Login />} />
          <Route exact path='/signup' render={routerProps => <SignUp />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
