import { Route } from "react-router-dom";
import React, { Component } from "react";
import API from "../modules/APIManager"


export default class ApplicationViews extends Component {

  state = {
    events: [],
    articles: [],
    messages: [],
    tasks: [],
    users: [],
    friends: []
};

componentDidMount() {

    const paths = Object.keys(this.state)
  
    const fetchPages = (pages) => {
    API.getAllEntries(pages)
    .then(page => {
      this.setState({
        [pages]: page}
      )}
      )}
  
    paths.forEach(path => fetchPages(path)) 
  }

delete = (items, id) => {
    return API.removeAndList(items, id)
.then(data => this.setState({
        [items]: data
    })
  )
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
