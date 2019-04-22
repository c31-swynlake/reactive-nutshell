// Authors: Billy Mathison
// Page renders register form and posts new user to API when submitted

import React, { Component } from "react"
import { Button, Label, Form, FormGroup, Input } from "reactstrap"

export default class Register extends Component {
    state = {
        userName: "",
        email: "",
        password: ""
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleRegister = event => {
        event.preventDefault()

        if (this.state.userName === "") {
            window.alert("Please enter a user name")
        } else if (this.state.email === "") {
            window.alert("Please enter an email address")
        } else if (this.state.password === "") {
            window.alert("Please enter a password")
        }
        this.props.history.push("/login")
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
                <FormGroup>
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input
                        type="password"
                        required
                        id="password"
                        onChange={this.handleFieldChange}
                        placeholder="Password"
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