// Authors: Billy Mathison
// Page renders chat messages with save and edit functions to messages. Chat limited to maximum of 10 messages.

import React, { Component } from "react"
import {
    Card, CardBody, Form,
    Button, CardHeader, CardFooter, Input
} from "reactstrap"
import MessageIndividual from "./MessageIndividual"

export default class MessageList extends Component {
    state = {
        message: "",
        messageId: "",
        editedMessage: ""
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to call postNewMessage from ApplicationViews and POST new message
    handleSaveMessage = event => {
        event.preventDefault()

        if (this.state.message === "") {
            window.alert("Please enter a message")
        } else {
            this.props.postNewMessage({
                userId: parseInt(this.props.activeUser),
                message: this.state.message
            })
        }
        this.setState({ message: "" })
    }

    // Function to load input form to edit user message and save button to save changes
    handleEditMessage = event => {
        event.preventDefault()
        this.setState({ editedMessage: event.target.value })
        this.setState({ messageId: parseInt(event.target.id) })
    }

    // Function to call putNewMessage from ApplicationViews and PUT edited message
    handleSaveEditMessage = event => {
        event.preventDefault()

        if (this.state.editedMessage === "") {
            window.alert("Please enter a message")
        } else {
            this.props.putNewMessage({
                userId: this.props.activeUser,
                message: this.state.editedMessage
            }, event.target.id)
            this.setState({ messageId: "" })
        }
    }

    render() {
        // Limiting messageArray to a maximum of 10 messages
        let n = this.props.messages.length
        let messageArray = this.props.messages.slice(0, n)
        if (n >= 10) {
            messageArray = this.props.messages.slice(n - 10, n)
        }
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Chat Room</CardHeader>
                    <CardBody>
                        {
                            // Maps through all messages and builds card body
                            messageArray.map(message =>
                                <MessageIndividual key={message.id} message={message} {...this.props} users={this.props.users} handleEditMessage={this.handleEditMessage} messageId={this.state.messageId} editedMessage={this.state.editedMessage} handleSaveEditMessage={this.handleSaveEditMessage} handleFieldChange={this.handleFieldChange} />
                            )
                        }
                    </CardBody>
                    <CardFooter>
                        <Form>
                            <Input
                                type="text"
                                id="message"
                                value={this.state.message}
                                placeholder="Enter chat message"
                                onChange={this.handleFieldChange}
                            />
                            <Button
                                color="info"
                                onClick={this.handleSaveMessage}
                            >
                                Save Message
                            </Button>
                        </Form>
                    </CardFooter>
                </Card>
            </React.Fragment>
        )
    }
}