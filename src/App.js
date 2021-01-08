import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from "./history"
import './App.css';

import Home from "./components/Home"
import Navbar from "./components/Navbar"
import NominationList from "./components/NominationList"
import Login from "./components/Login"
import SignUp from "./components/SignUp"

import { config } from "./Constants";

const API_Users = config.url.API_Users

class App extends Component {
  constructor() {
    super()
    this.state = {
      nominations: [],
      movies: [],
      user: {}
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.userFetch(token)
    } else {
      this.breweryFetch()
    }
  }

  userFetch = (token) => {
    const reqObj = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    fetch(API_Users, reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          user: data.user,
          nominations: data.nominations,
          movies: data.movies
        })
      })
      .catch(err => console.log(err))
  }

  nominationFetch = () => {
    console.log('-------------------------')
  }

  loginUser = (userObj) => {
    this.setState({
      user: userObj
    })
  }

  render() {
    console.log(this.state.user)
    return (
      <Router history={history}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/' render={routerProps => <Home {...routerProps} />} />
            <Route exact path='/list' render={routerProps => <NominationList {...routerProps} />} />
            <Route exact path='/login' render={routerProps => <Login {...routerProps}
              loginUser={this.loginUser} />} />
            <Route exact path='/signup' render={routerProps => <SignUp {...routerProps}
              loginUser={this.loginUser} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
