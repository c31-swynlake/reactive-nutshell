// Authors: Billy Mathison
// Page renders

import React, { Component } from "react"
import { Button, Input } from "reactstrap"



export default class MessageIndividual extends Component {

    render() {

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
        else if (this.props.message.userId === this.props.activeUser) {
            return (
                <React.Fragment>
                    <div key={this.props.message.id}>
                        {this.props.message.message} {this.props.users.find(user => user.id === this.props.message.userId).userName}
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