import React, { Component } from "react";

import { Button } from "reactstrap";
import TaskEdit from "./TaskEdit";

/* TaskCard renders the task, and uses a toggle function who's current value is held in state, to allow the edit button render an edit form in the card's place. */

export default class TaskCard extends Component {
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
            <h5 className="card-title">{this.props.task.taskName}</h5>
            <p>{this.props.task.targetDate}</p>
            <Button onClick={this.toggle}>Edit</Button>
            <Button>Complete</Button>
          </div>
        </div>
      );
    } else {
      return <TaskEdit {...this.props} toggle={this.toggle} />;
    }
  }
}
