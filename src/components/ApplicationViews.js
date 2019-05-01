import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Load from "./authentication/Load";
import UserManager from "../modules/UserManager";
import ChatManager from "../modules/ChatManager";
import ArticlesList from '../components/articles/ArticlesList'
import API from "../modules/APICaller";
import EventList from "./events/EventsList"
import MessageList from "./messages/MessageList";
import FriendsList from "./friends/FriendsList";
import Home from "./home/Home";

export default class ApplicationViews extends Component {
  state = {
    users: [],
    messages: [],
    friends: [],
    activeUser: ""
  }

  componentDidMount() {
    const newState = {};
    if (this.state.activeUser === "") {
      let key = sessionStorage.getItem("userId");
      API.getAll(`connections?userId=${key}`).then(friendsList => {
        let friendsId = friendsList.map(friend => friend.friendId);
        this.setState({ friends: friendsId, activeUser: parseInt(key) });
        UserManager.all()
          .then(users => (newState.users = users))
          .then(() => ChatManager.all())
          .then(messages => (newState.messages = messages))
          .then(() => this.setState(newState));
      });
    } else {
      UserManager.all()
        .then(users => (newState.users = users))
        .then(() => ChatManager.all())
        .then(messages => (newState.messages = messages))
        .then(() => this.setState(newState));
    }
  }
  isAuthenticated = () => {
    if (sessionStorage.getItem("userId") !== null) {
      return true;
    } else if (localStorage.getItem("userId") !== null) {
      sessionStorage.setItem("userId", localStorage.getItem("userId"));
      sessionStorage.setItem("userName", localStorage.getItem("userName"));
      return true;
    } else {
      return false;
    }
  };

  removeFriend = (target) => {
    API.deleteEntry("connections", target).then(() => {
      API.getAll(`connections?userId=${this.state.activeUser}`).then(friendsList => {
        let friendsId = friendsList.map(friend => friend.friendId);
        this.setState({ friends: friendsId })
      }
      )
    })
  }

  addFriend = (friendId) => {
    let friendObject = {
      "userId": parseInt(this.state.activeUser),
      "friendId": parseInt(friendId)
    }
    API.postOne("connections", friendObject).then(() => {
      API.getAll(`connections?userId=${this.state.activeUser}`).then(friendsList => {
        let friendsId = friendsList.map(friend => friend.friendId);
        this.setState({ friends: friendsId })
      })
    })
  }


  postRegisteredUser = object => {
    UserManager.post(object)
      .then(() => UserManager.all())
      .then(users => {
        this.setState({
          users: users
        });
      });
  };

  postNewMessage = message => {
    ChatManager.post(message)
      .then(() => ChatManager.all())
      .then(messages => {
        this.setState({
          messages: messages
        });
      });
  };

  updateStorage = key => {
    API.getAll(`connections?userId=${key}`).then(friendsList => {
      let friendsId = friendsList.map(friend => friend.friendId);
      this.setState({ friends: friendsId, activeUser: parseInt(key) });
    });
  };

  componentWillUpdate() {
    if (this.state.activeUser === "") {
      let key = sessionStorage.getItem("userId");
      this.setState({ activeUser: parseInt(key) })
    }
  }
  putNewMessage = (message, id) => {
    ChatManager.put(message, id)
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
        this.setState({ friends: friendsId, activeUser: key })
      })

  }


  render() {
    return (
      <React.Fragment>
        <Route
          path="/load"
          render={props => {
            return <Load />;
          }}
        />
        <Route
          exact
          path="/login"
          render={props => {
            return (
              <Login
                {...props}
                users={this.state.users}
                updateStorage={this.updateStorage}
              />
            );
          }}
        />
        <Route
          path="/register"
          render={props => {
            return (
              <Register
                {...props}
                users={this.state.users}
                postRegisteredUser={this.postRegisteredUser}
              />
            );
          }}
        />
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return <Redirect to="/home" />;

            } else {
              return <Redirect to="/load" />;
            }
          }} />

        <Route exact path="/news" render={(props) => {
          return <ArticlesList {...props} friends={this.state.friends} activeUser={this.state.activeUser} />
        }}
        />
        <Route
          path="/home"
          render={props => {
            if (this.isAuthenticated()) {
              return <Home {...props} activeUser={this.state.activeUser} />;
            } else {
              return <Redirect to="/load" />;
            }
          }}
        />

        <Route
          exact path="/messages" render={props => {
            if (this.isAuthenticated()) {
              return <MessageList {...props} messages={this.state.messages} activeUser={this.state.activeUser} users={this.state.users} postNewMessage={this.postNewMessage} putNewMessage={this.putNewMessage} friends={this.state.friends}
              />
            } else {
              return <Redirect to="/load" />;
            }
          }}
        />

        <Route
          path="/friends"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <FriendsList {...props} activeUser={this.state.activeUser} removeFriend={this.removeFriend} addFriend={this.addFriend} friends={this.state.friends} />
              );
            } else {
              return <Redirect to="/load" />;
            }
          }}
        />

        <Route
          path="/events"
          render={props => {
            if (this.isAuthenticated()) {
              return <EventList {...props} activeUser={this.state.activeUser} />;
            } else {
              return <Redirect to="/load" />;
            }
          }}
        />

      </React.Fragment>
    );
  }
}