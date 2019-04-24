import React, { Component } from 'react'
import "./task.css"
import TaskCard from "./TaskCard"
import API from "../../modules/APICaller"

class TaskList extends Component {

    state = {
        usertasks: [],
        friendtasks:[]
    }

    componentDidMount() {
        

        API.getAllEntries("tasks")
            .then(objectList => {
               const userTasks = objectList.filter(object => parseInt(this.props.activeUser) === object.userId) 

            const friendTasks = objectList.filter(object => this.props.friends.find(friend => parseInt(friend) === object.userId))        
            this.setState(
              { usertasks: userTasks,
                friendtasks: friendTasks}
        //   )}
          )})
              }


    render() {
        return (
            <React.Fragment>
                {/* <div className="TaskButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/Tasks/new")}
                            }>
                        Create Task
                    </button>
                </div> */}
                <section className="active Tasks">
                {
                    this.state.usertasks.map(task =>
                        <TaskCard key={task.id} task={task} {...this.props} />
                    )
                }
                </section>
                <section className="friend Tasks">
                {
                    this.state.friendtasks.map(task =>
                        <TaskCard key={task.id} task={task} {...this.props} className="friend" />
                    )
                }
                </section>
            </React.Fragment>
            )
    }
}

export default TaskList