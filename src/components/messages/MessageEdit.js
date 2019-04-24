// Authors: Billy Mathison
// Page renders

import React, { Component } from "react"
import {
    Card, CardBody, Form, CardHeader, CardFooter, Input
} from "reactstrap"
import MessageEditComponent from "./MessageEditComponent"

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

    handleSaveEditMessage = event => {
        event.preventDefault()

        if (this.state.recentMessage === "") {
            window.alert("Please enter a message in edit form")
        } else {
            this.props.putNewMessage({
                userId: this.props.activeUser,
                message: this.state.message
            }, event.target.id)
        } this.props.history.push("/messages")
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
                                <MessageEditComponent key={message.id} message={message} {...this.props} users={this.props.users} />
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
                        </Form>
                    </CardFooter>
                </Card>
            </React.Fragment>
        )
    }
}