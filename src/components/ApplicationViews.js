import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import Load from "./authentication/Load"

export default class ApplicationViews extends Component {

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
            return <Login />
          }}
        />
        <Route path="/register" render={props => {
          return <Register />
        }} />
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
