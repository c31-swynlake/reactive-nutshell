import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import Load from "./authentication/Load"
import FriendManager from '../modules/FriendManager'
import UserManager from '../modules/UserManager'
import ChatManager from '../modules/ChatManager'
import ArticlesList from '../components/articles/ArticlesList'
import API from "../modules/APICalls"
import MessageList from "./messages/MessageList"


export default class ApplicationViews extends Component {
  state = {
    users: [],
    messages: [],
    friends: [],
    activeUser: ""
  }

  componentDidMount() {
    const newState = {}


    UserManager.all()

      .then(users => newState.users = users)
      .then(() => ChatManager.all())
      .then(messages => newState.messages = messages)
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
//this function sets state for active user by putting his user ID and his friends into state. 
  updateStorage = (key) => {
    API.getAll(`users/${key}/?_embed=friends`)
      .then(friendList => {
        let friendArray = friendList.friends
        let friendsId = friendArray.map(friend => friend.currentUserId)
        this.setState({friends: friendsId, activeUser: key})
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
            if (this.isAuthenticated()) {
              return <Redirect to="/home" />
              // Remove null and return the component which will show list of friends
            } else {
              return <Redirect to="/load" />
            }
          }} />

        <Route exact path="/news" render={(props) => {
          return null
        }} />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }} />

        <Route
          path="/messages" render={props => {
            if (this.isAuthenticated()) {
              return <MessageList {...props} messages={this.messages} activeUser={this.activeUser} />
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
