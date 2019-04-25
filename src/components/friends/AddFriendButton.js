import React, { Component } from "react";
import "./friends.css";
import { Button } from "reactstrap";
import API from "../../modules/APICaller";

export default class AddFriendButton extends Component {


handleAddFriend = () => {
  let friendId = event.target.id
  let friendObject = {
    "userId": this.props.activeUser,
    "friendId": parseInt(friendId)}
  API.postOne("connections", friendObject)
}


render() {
    return (
       <Button onClick={this.handleAddFriend}>
         Add Friend
       </Button>)
  }
}

