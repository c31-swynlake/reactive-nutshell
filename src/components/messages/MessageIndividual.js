// Authors: Billy Mathison
// Page build card components for MessageList.js based on message criteria

import React, { Component } from "react"
import { Button, Input } from "reactstrap"
import { Link } from "react-router-dom"


export default class MessageIndividual extends Component {

    render() {

        // If messageId from state matches current message id then return input field to edit message along with save button
        if (this.props.messageId === this.props.message.id) {
            return <React.Fragment>
                <div key={this.props.message.id}>
                    <Input
                        type="text"
                        id="editedMessage"
                        value={this.props.editedMessage}
                        placeholder={this.props.message.message}
                        onChange={this.props.handleFieldChange}
                    />
                    <Button
                        id={this.props.message.id}
                        onClick={this.props.handleSaveEditMessage}
                    >
                        Save
                    </Button>
                </div>
            </React.Fragment>
        }
        // If current message user id mathced activeUser from session storage then return message along with edit button
        else if (this.props.message.userId === this.props.activeUser) {
            return (
                <React.Fragment>
                    <div key={this.props.message.id}>
                        {this.props.message.message} {" "} {this.props.users.find(user => user.id === this.props.message.userId).userName}
                        {" "}
                        <Button
                            id={this.props.message.id}
                            value={this.props.message.message}
                            onClick={this.props.handleEditMessage}
                        >
                            Edit
                        </Button>
                    </div>
                </React.Fragment>
            )
        } else {
            // Else return just the message
            return (
                <React.Fragment>
                    <div key={this.props.message.id}>
                        {this.props.message.message} {" "}
                        <Link to="/messages"
                            onClick={() => {
                                window.confirm(`Would you like to add ${this.props.users.find(user => user.id === this.props.message.userId).userName} as a friend?`)
                            }}
                        >
                            {this.props.users.find(user => user.id === this.props.message.userId).userName}
                        </Link>
                    </div>
                </React.Fragment>
            )
        }

    }
}