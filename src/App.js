import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';

import Home from "./components/Home"
import Navbar from "./components/Navbar"
import NominationList from "./components/NominationList"
import Login from "./components/Login"
import SignUp from "./components/SignUp"

import { config } from "./Constants";

const API_Users = config.url.API_Users
const API_Nominations = config.url.API_Nominations

class App extends Component {
  constructor() {
    super()
    this.state = {
      nominations: [],
      movies: [],
      user: {},
      myMovies: [],
      noUserModal: false,
      nominationNumberModal: false
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.userFetch(token)
    } else {
      this.nominationFetch()
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
          movies: data.movies,
          myMovies: data.my_movies
        })
      })
      .catch(err => console.log(err))
  }

  nominationFetch = () => {
    fetch(API_Nominations)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          nominations: data.nominations,
          movies: data.movies
        })
      })
  }

  loginUser = (userObj, movies) => {
    console.log(this.props)
    this.setState({
      user: userObj,
      myMovies: movies,
    })
  }

  nominateMovie = movie => {
    if (this.state.user.id) {
      if (this.state.myMovies.length < 5) {
        const newNomination = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: movie.Title,
            year: movie.Year,
            user_id: this.state.user.id
          })
        }
        fetch(API_Nominations, newNomination)
          .then(resp => resp.json())
          .then(data => {
            this.setState({
              nominations: data.nominations,
              movies: data.movies,
              myMovies: data.my_movies
            })
          })
          .catch(err => console.log(err))
      } else {
        this.setState({
          nominationNumberModal: true
        })
      }
    } else {
      this.setState({
        noUserModal: true
      })
    }
  }

  removeNomination = (movie) => {
    const movieNoms = this.state.nominations.filter(nomination => {
      return nomination.movie_id === movie.id
    })
    const nom = movieNoms.filter(nomination => {
      return nomination.user_id === this.state.user.id
    })
    const deleteNomination = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: nom[0].id,
        user_id: this.state.user.id
      })
    }
    fetch(`${API_Nominations}/${nom[0].id}`, deleteNomination)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          nominations: data.nominations,
          myMovies: data.my_movies
        })
      })
      .catch(err => console.log(err))
  }

  handleLogout = () => {
    if (this.state.user.id) {
      this.setState({
        user: '',
        myMovies: []
      })
      localStorage.clear()
    }
  }

  closeUserModal = () => {
    this.setState({
      noUserModal: false
    })
  }

  closeNumberModal = () => {
    this.setState({
      nominationNumberModal: false
    })
  }

  render() {
    return (
      <div>
        <Navbar
          handleLogout={this.handleLogout}
          user={this.state.user} />
        <Switch>
          <Route exact path='/' render={routerProps => <Home {...routerProps}
            nominateMovie={this.nominateMovie}
            user={this.state.user}
            nominations={this.state.nominations}
            movies={this.state.movies}
            myMovies={this.state.myMovies}
            removeNomination={this.removeNomination}
            noUserModal={this.state.noUserModal}
            closeUserModal={this.closeUserModal}
            nominationNumberModal={this.state.nominationNumberModal}
            closeNumberModal={this.closeNumberModal} />} />
          <Route path='/list' render={routerProps => <NominationList {...routerProps}
            movies={this.state.movies}
            nominations={this.state.nominations} />} />
          <Route path='/login' render={routerProps => <Login {...routerProps}
            loginUser={this.loginUser} />} />
          <Route path='/signup' render={routerProps => <SignUp {...routerProps}
            loginUser={this.loginUser} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
