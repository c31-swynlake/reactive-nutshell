import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import Load from "./authentication/Load"
import FriendManager from '../modules/FriendManager'
import UserManager from '../modules/UserManager'
import ChatManager from '../modules/ChatManager'
import ArticlesList from '../components/articles/ArticlesList'

export default class ApplicationViews extends Component {
  state = {
    users: [],
    messages: [],
    friends: [],
    activeUser: ""
  }

  componentDidMount() {
      const newState = {}
      // newState.activeUser = sessionStorage.getItem("userId")
      UserManager.all()
      .then(users => newState.users = users)
      .then(() => ChatManager.all())
      .then(messages => newState.messages = messages)
      .then(() => FriendManager.all())
      .then(friends => newState.friends = friends)
      .then(() => newState.activeUser = sessionStorage.getItem("userId"))
      .then(() => this.setState(newState))
  }

  isAuthenticated = () => {
    if (sessionStorage.getItem("userId") !== null) {
      return true
    } else if (localStorage.getItem("userId") !== null) {
      sessionStorage.setItem("userId", localStorage.getItem("userId"))
      sessionStorage.setItem("userName", localStorage.getItem("userName"))
      return true
    }
    else {
      return false
    }
  }

  postRegisteredUser = (object) => {
    UserManager.post(object)
      .then(() => UserManager.all())
      .then(users => {
        this.setState({
          "users": users
        })
      })
  }

  updateStorage = (key) => {
    this.setState({
      "activeUser": key
    })
  }

  render() {
    return (
      <React.Fragment>
        <Route path="/load" render={props => {
          return <Load />
        }} />
        <Route
          exact path="/login" render={props => {
            return <Login {...props} users={this.state.users} updateStorage={this.updateStorage} />
          }}
        />
        <Route path="/register" render={props => {
          return <Register {...props} users={this.state.users} postRegisteredUser={this.postRegisteredUser} />
        }} />
        <Route
          exact path="/" render={props => {
            return null
          }} />

        <Route exact path="/news" render={(props) => {
            return <ArticlesList {...props} activeUser={this.state.activeUser}/>
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }} />

        < Route
          path="/messages" render={props => {
            if (this.isAuthenticated()) {
              return null
              // Remove null and return the component which will show list of friends
            } else {
              return <Redirect to="/load" />
            }
          }} />

        <Route
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show the user's events
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
