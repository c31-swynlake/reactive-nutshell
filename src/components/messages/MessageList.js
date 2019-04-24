// Authors: Billy Mathison
// Page renders

import React, { Component } from "react"
import {
    Card, CardBody, Form,
    Button, CardHeader, CardFooter, Input
} from "reactstrap"
import MessageIndividual from "./MessageIndividual"

export default class MessageList extends Component {
    state = {
        message: ""
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
    }

    render() {
        let n = this.props.messages.length

        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Chat Room</CardHeader>
                    <CardBody>
                        {
                            this.props.messages.slice(n - 10, n).map(message =>
                                <MessageIndividual key={message.id} message={message} {...this.props} users={this.props.users} />
                            )
                        }
                    </CardBody>
                    <CardFooter>
                        <Form>
                            <Input
                                id="message"
                                placeholder="Enter chat message"
                                onChange={this.handleFieldChange} />
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