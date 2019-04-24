// Authors: Billy Mathison
// Page renders

import React, { Component } from "react"
import { Button } from "reactstrap"


export default class MessageIndividual extends Component {
    render() {
        if (this.props.message.userId === this.props.activeUser) {
            return (
                <React.Fragment>
                    <div key={this.props.message.id}>
                        {this.props.message.message} {this.props.users.find(user => user.id === this.props.message.userId).userName}
                        <Button
                        id={this.props.message.id}
                        onClick={this.props.handleEditMessage}
                        >
                        Edit
                        </Button>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div key={this.props.message.id}>
                        {this.props.message.message} {this.props.users.find(user => user.id === this.props.message.userId).userName}
                    </div>
                </React.Fragment>
            )
        }

    }
}