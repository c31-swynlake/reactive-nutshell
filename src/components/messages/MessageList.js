// Authors: Billy Mathison
// Page renders

import React, { Component } from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardHeader, CardFooter, Input
} from "reactstrap"
import MessageIndividual from "./MessageIndividual"

export default class MessageList extends Component {

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>Chat Room</CardHeader>
                    <CardBody>
                        {
                            this.props.messages.map(message =>
                                <MessageIndividual key={message.id} message={message} {...this.props} users={this.props.users} />
                            )
                        }
                    </CardBody>
                    <CardFooter>
                        <Input
                            placeholder="Enter chat message" />
                        <Button
                            color="info">
                            Save Message
                        </Button>
                    </CardFooter>
                </Card>
            </React.Fragment>
        )
    }
}