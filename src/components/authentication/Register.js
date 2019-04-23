// Authors: Billy Mathison
// Page renders register form and posts new user to API when submitted

import React, { Component } from "react"
import { Button, Label, Form, FormGroup, Input } from "reactstrap"
import UserManager from "./../../modules/UserManager"

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
        } else if (this.props.users.some(user => {
            return user.userName.toLowerCase() === this.state.userName.toLowerCase()
        })) {
            window.alert("User name is already taken")
        } else if (this.props.users.some(user => {
            return user.email.toLowerCase() === this.state.email.toLowerCase()
        })) {
            window.alert("Email address already exists")
        } else {
            UserManager.post({
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password
            })
            this.props.history.push("/login")
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
                        required=""
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
                    type="submit"
                    onClick={this.handleRegister}
                >
                    Register
                </Button>
            </Form>
        )
    }
}