import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap";


export default class TaskCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                    {this.props.task.taskName}
                    </h5>
                    <p>{this.props.task.targetDate}</p>
                    
                    <Button>Edit</Button>
                    <Button>Complete</Button>
                </div>
            </div>
        )
    }
}