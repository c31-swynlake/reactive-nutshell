import React, { Component } from 'react'
import "./task.css"
import TaskCard from "./TaskCard"
import API from "../../modules/APICaller"
import { Container, Form, Button } from "reactstrap";

class TaskList extends Component {

    state = {
        usertasks: [],
        friendtasks:[]
    }

    componentDidMount() {
        

        API.getAll("tasks")
            .then(objectList => {
               const userTasks = objectList.filter(object => parseInt(this.props.activeUser) === object.userId) 
            this.setState(
              { usertasks: userTasks})

              })
            }

    postEditedTask = () => {

        API.getAll("tasks")
            .then(objectList => {
               const userTasks = objectList.filter(object => parseInt(this.props.activeUser) === object.userId) 
            this.setState(
              { usertasks: userTasks})

              })
    }





    render() {
        return (
            <Container>

                <section className="active Tasks">
                {
                    this.state.usertasks.map(task =>
                        <TaskCard key={task.id} task={task} {...this.props} postEditedTask={this.postEditedTask} />
                    )
                }
                </section>
            </Container>
            )
    }
}

export default TaskList