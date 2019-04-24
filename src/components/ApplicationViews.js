import { Route, Redirect } from "react-router-dom";
import { withRouter } from 'react-router'
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import Load from "./authentication/Load"
import FriendManager from '../modules/FriendManager'
import UserManager from '../modules/UserManager'
import ChatManager from '../modules/ChatManager'
import ArticlesList from '../components/articles/ArticlesList'
import MessageList from "./messages/MessageList"
import ArticleForm from './articles/ArticlesForm'
import ArticleManager from "../modules/ArticleManager";

class ApplicationViews extends Component {
  state = {
    users: [],
    messages: [],
    friends: [],
    articles: [],
    activeUser: ""
  }

  componentDidMount() {
    const newState = {}

    UserManager.all()
      .then(users => newState.users = users)
      .then(() => ChatManager.all())
      .then(messages => newState.messages = messages)
      .then(() => FriendManager.all())
      .then(friends => newState.friends = friends)
      .then(() => newState.activeUser = sessionStorage.getItem("userId"))
      .then(() => ArticleManager.all())
      .then(articles => newState.articles = articles)
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

  addArticle = (articleObj) =>  {
    ArticleManager.post(articleObj)
    .then(() => ArticleManager.all())
    .then(articles => {
      this.props.history.push("/news")
      this.setState({articles: articles})
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
        <Route path="/news/new" render={(props) => {
            return <ArticleForm  {...props} addArticle={this.addArticle} activeUser={this.state.activeUser}/>
          }}
        />
        <Route path="/news/:articleId(d+)/edit" />
        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }} />

        < Route
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
export default withRouter(ApplicationViews)