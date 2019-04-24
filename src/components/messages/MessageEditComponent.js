// Authors: Billy Mathison
// Page renders

import React, { Component } from "react"
import { Button, Input } from "reactstrap"



export default class MessageIndividual extends Component {
    state = {
        message: "",
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    render() {
        if (this.props.message.userId === this.props.activeUser) {
            return <React.Fragment>
                <div key={this.props.message.id}>
                    <Input
                        type="text"
                        id="message"
                        value={this.state.message}
                        placeholder={this.props.message.message}
                        onChange={this.handleFieldChange}
                    />
                    <Button
                        id={this.props.message.id}
                        onClick={this.props.handleEditMessage}
                    >
                        Save
                </Button>
                </div>
            </React.Fragment>

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