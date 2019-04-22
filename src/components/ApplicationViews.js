import { Route } from "react-router-dom";
import React, { Component } from "react";
import EventManager from './modules/EventManager'
import ArticleManager from './modules/ArticleManager'
import FriendManager from './modules/FriendManager'
import UserManager from './modules/UserManager'
import ChatManager from './modules/ChatManager'
import TaskManager from './modules/TaskManager'

export default class ApplicationViews extends Component {
  state = {
    events: [],
    articles: [],
    users: [],
    messages: [],
    tasks: []
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
    .then(() => this.setState(newState)) 
  }









  
  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/login" render={props => {
            return null
            // Remove null and return the component which will handle authentication
          }}
        />

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

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
