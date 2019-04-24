// Authors: Billy Mathison
// Page renders

import React, { Component } from "react"
import {
    Card, CardBody, Form, Label,
    Button, CardHeader, CardFooter, Input
} from "reactstrap"
import MessageIndividual from "./MessageIndividual"

export default class MessageList extends Component {
    state = {
        message: "",
        recentMessage: ""
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleSaveMessage = event => {
        event.preventDefault()

        if (this.state.message === "") {
            window.alert("Please enter a message")
        } else {
            this.props.postNewMessage({
                userId: this.props.activeUser,
                message: this.state.message
            })
        }
        this.setState({ message: "" })
    }

    handleEditMessage = event => {
        event.preventDefault()

        if (this.state.recentMessage === "") {
            window.alert("Please enter a message in edit form")
        } else {
            this.props.putNewMessage({
                userId: this.props.activeUser,
                message: this.state.message
            })
        }

    }

    render() {
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
                            messageArray.map(message =>
                                <MessageIndividual key={message.id} message={message} {...this.props} users={this.props.users} />
                            )
                        }
                    </CardBody>
                    <CardBody>
                        <Label>Edit most recent message</Label>
                        <Input
                            id="recentMessage"
                            type="text"
                            value={this.state.recentMessage}
                            onChange={this.handleFieldChange}
                        />
                        <Button
                            onClick
                        >
                            Edit
                        </Button>
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