import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import Load from "./authentication/Load"
import EventManager from '../modules/EventManager'
import ArticleManager from '../modules/ArticleManager'
import FriendManager from '../modules/FriendManager'
import UserManager from '../modules/UserManager'
import ChatManager from '../modules/ChatManager'
import TaskManager from '../modules/TaskManager'
import ArticlesList from '../components/articles/ArticlesList'

export default class ApplicationViews extends Component {
  state = {
    events: [],
    articles: [],
    users: [],
    messages: [],
    tasks: [],
    friends: []
  }

  componentDidMount() {
    const newState = {}

    EventManager.all()
      .then(events => this.setState(newState.events = events))
      .then(() => ArticleManager.all())
      .then(articles => newState.articles = articles)
      .then(() => UserManager.all())
      .then(users => newState.users = users)
      .then(() => ChatManager.all())
      .then(messages => newState.messages = messages)
      .then(() => TaskManager.all())
      .then(tasks => newState.tasks = tasks)
      .then(() => FriendManager.all())
      .then(friends => newState.friends = friends)
      .then(() => this.setState(newState))
  }

  isAuthenticated = () => {
    if (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <React.Fragment>
        <Route path="/load" render={props => {
          return <Load />
        }} />
        <Route
          exact path="/login" render={props => {
            return <Login {...props} users={this.state.users}/>
          }}
        />
        <Route path="/register" render={props => {
          return <Register {...props} users={this.state.users} />
        }} />
        <Route
          exact path="/" render={props => {
            return null
          }} />

        <Route exact path="/news" render={(props) => {
          return null
        }} />

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
