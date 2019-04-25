import React, { Component } from "react";
import { Col, Button } from "reactstrap";

export default class FriendCard extends Component {

  handleClick = (event) => {
    this.props.removeFriend(event)
  }


  render() {
    return (
      <div className="animated fadeIn flip-card">
        <div className="flip-card-inner" >
          <div className="flip-card-front">
          <h2>{this.props.friend.friend.userName}</h2> 
          <img  className= "flip-image" src="images\download.jpg" alt="friend"></img>
          </div>
          <div className="flip-card-back">
          <h2>{this.props.friend.friend.userName}</h2> 
          <Button id={this.props.friend.id} onClick={this.handleClick}>Remove Friend</Button>
        </div>
      </div>
    </div>
    );
  }
}