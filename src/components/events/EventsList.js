import React, { Component } from "react";
import "./events.css";
import EventCard from "./EventCard";
import API from "../../modules/APICaller";
import { Container, Form, Button } from "reactstrap";
import PostEvent from "./PostEvent";

class EventList extends Component {
  state = {
    userEvents: []
  };

  componentDidMount() {
    API.getAll("events").then(objectList => {
      const userEvents = objectList.filter(object => {
        return (
          parseInt(this.props.activeUser) === object.userId 
        );
      });
      this.setState({ userEvents: userEvents });
    });
  }

  refreshEvent = () => {
    API.getAll("events").then(objectList => {
        const userEvents = objectList.filter(object => {
          return (
            parseInt(this.props.activeUser) === object.userId
          );
        });
        this.setState({ userEvents: userEvents });
  })
}

  render() {
    return (
      <Container>
        <PostEvent {...this.props} refreshEvent={this.refreshEvent} />

        <section className="active Events">
          {this.state.userEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              {...this.props}
              refreshEvent={this.refreshEvent}
            />
          ))}
        </section>
      </Container>
    );
  }
}

export default EventList;