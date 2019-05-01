import React, { Component } from "react";
import API from "../../modules/APICaller"
import { Button } from "reactstrap";
import EventEdit from "./EventEdit";

/* EventCard renders the Event, and uses a toggle function who's current value is held in state, to allow the edit button render an edit form in the card's place. */

export default class EventCard extends Component {
  state = {
    isEditing: false
  };

  toggle = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };


  render() {
    if (!this.state.isEditing) {
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.event.eventName}</h5>
            <p>{this.props.event.eventDate}</p>
            <p>{this.props.event.eventLocation}</p>
            <p>{this.props.event.url}</p>
            <Button onClick={this.toggle}>Edit</Button>

          </div>
        </div>
      );
    } else {
      return <EventEdit {...this.props} toggle={this.toggle} />;
    }
  }
}