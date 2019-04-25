import React, { Component } from "react";
import { Col, Button } from "reactstrap";

export default class UserCard extends Component {

  handleClick = (event) => {
    this.props.addFriend(event)
  }


  render() {
    return (
      <div className="animated fadeIn flip-card">
        <div className="flip-card-inner" >
          <div className="flip-card-front">
          <h2>{this.props.user.userName}</h2> 
          <img  className= "flip-image" src="images\download.jpg" alt="friend"></img>
          
          </div>
          <div className="flip-card-back">
          <h2>{this.props.user.userName}</h2> 
          <Button id={this.props.user.id} onClick={this.handleClick}>Add Friend</Button>
        </div>
      </div>
    </div>
    );
  }
}