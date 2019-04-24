import { Route, Redirect } from "react-router-dom";
import { withRouter } from 'react-router'
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register"
import Load from "./authentication/Load"
// import FriendManager from '../modules/FriendManager'
import UserManager from '../modules/UserManager'
import ChatManager from '../modules/ChatManager'
// import ArticlesList from '../components/articles/ArticlesList'
import API from "../modules/APICalls"
import MessageList from "./messages/MessageList"
import ArticleForm from './articles/ArticlesForm'
import ArticleManager from "../modules/ArticleManager";
import ArticleEdit from './articles/ArticlesEdit'


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
    if (this.state.activeUser === "") {
      let key = sessionStorage.getItem("userId")
      API.getAll(`connections?userId=${key}`)
      .then(friendsList => {
        let friendsId = friendsList.map(friend => friend.friendId)
        this.setState({friends: friendsId, activeUser: parseInt(key)})
        UserManager.all()

        .then(users => newState.users = users)
        .then(() => ChatManager.all())
        .then(messages => newState.messages = messages)
        .then(() => this.setState(newState))
    })} else {
      UserManager.all()
      .then(users => newState.users = users)
      .then(() => ArticleManager.all())
      .then(articles => newState.articles = articles)
      .then(() => this.setState(newState))
  }
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

  postNewMessage = message => {
    ChatManager.post(message)
      .then(() => ChatManager.all())
      .then(messages => {
        this.setState({
          messages: messages
        })
      })
  }

  updateStorage = (key) => {
    API.getAll(`connections?userId=${key}`)
      .then(friendsList => {
        let friendsId = friendsList.map(friend => friend.friendId)
        this.setState({friends: friendsId, activeUser: key})
      })
    
  }

  //this function will make a fetch call the articles manager to add and this function will be pass
  // as a prop to Articles Form
  addArticle = (articleObj) =>  {
    ArticleManager.post(articleObj)
    .then(() => ArticleManager.all())
    .then(articles => {
      this.props.history.push("/news")
      this.setState({articles: articles})
    })
  }

  // this function will make a fetch call the article manager to make a put request and this function will 
  // be passed as a prop to Article Edit
  updateArticle = (updatedArticleObj, id) => {
    ArticleManager.put(updatedArticleObj, id)
    .then(() => ArticleManager.all())
    .then(articles => {
      this.setState({articles: articles})
      this.props.history.push("/news")
    })
  }

  // this function will make a fetch call for the article manager to make a delete request and this function 
  // will be passed as a prop to article delete
  deleteArticle = (id) => {
    ArticleManager.delete(id)
    .then(() => ArticleManager.all())
    .then(articles => {
      console.log(articles)
      this.setState({articles: articles})
      this.props.history.push("/news")
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
            return <ArticlesList {...props} activeUser={this.state.activeUser} deleteArticle={this.deleteArticle}/>
          }}
        />
        <Route path="/news/new" render={(props) => {
            return <ArticleForm  {...props} addArticle={this.addArticle} activeUser={this.state.activeUser}/>
          }}
        />
        <Route path="/news/:articleId(\d+)/edit" render={(props) => {
            return <ArticleEdit {...props} articles={this.state.articles} activeUser={this.state.activeUser} updateArticle={this.updateArticle} />
        }}/>
        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }} />

        <Route
          path="/messages" render={props => {
            if (this.isAuthenticated()) {
              return <MessageList {...props} messages={this.state.messages} activeUser={this.state.activeUser} users={this.state.users} postNewMessage={this.postNewMessage} />
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