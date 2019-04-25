import React, { Component } from "react";
import API from "../../modules/APICaller"
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

  handleComplete = () => {
    API.patchEntry("tasks", this.props.task.id, {isComplete: true}).then(() => {
    this.props.refreshTask()
    })
  }


  render() {
    if (!this.state.isEditing) {
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.task.taskName}</h5>
            <p>{this.props.task.targetDate}</p>
            <Button onClick={this.toggle}>Edit</Button>
            <Button onClick={this.handleComplete}>Complete</Button>
          </div>
        </div>
      );
    } else {
      return <TaskEdit {...this.props} toggle={this.toggle} />;
    }
  }
}
