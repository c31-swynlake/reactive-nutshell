import React, { Component } from "react"
import { Button, Label, Form, FormGroup, Input } from "reactstrap"

export default class Register extends Component {
    state = {
        userName: "",
        email: ""
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleRegister = event => {
        event.preventDefault()
        
        if(this.state.userName === "") {
            window.alert("Please enter a user name")
        } else if(this.state.email === "") {
            window.alert("Please enter an email address")
        }
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label htmlFor="userName">
                    User Name
                    </Label>
                    <Input
                    type="text"
                    required
                    id="userName"
                    onChange={this.handleFieldChange}
                    placeholder="User Name"
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">
                    Email Address
                    </Label>
                    <Input
                    type="email"
                    required
                    id="email"
                    onChange={this.handleFieldChange}
                    placeholder="user@email"
                    />
                </FormGroup>
                <Button
                onClick={this.handleRegister}
                >
                    Register
                </Button>
            </Form>
        )
    }
}