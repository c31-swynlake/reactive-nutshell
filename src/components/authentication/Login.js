// Authors: Billy Mathison
// Page renders login form and when submitted verifies user's information before loading home page

import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"

export default class Login extends Component {

    state = {
        userName: "",
        password: "",
        rememberMe: false
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    // Function to verify user has filled in all fields and that userName and password match the databse before logging them in and saving to either session storage or local storage if selected
    handleLogin = event => {
        event.preventDefault()
        let user = this.props.users.find(user => {
            return user.userName === this.state.userName && user.password === this.state.password
        })

        if (this.state.userName === "") {
            window.alert("Please enter user name")
        } else if (this.state.password === "") {
            window.alert("Please enter password")
        } else if (user !== undefined) {
            if (this.state.rememberMe) {
                localStorage.setItem("userId", user.id)
                localStorage.setItem("userName", this.state.userName)
                this.props.updateStorage(user.id)
            } else {
                sessionStorage.setItem("userId", user.id)
                sessionStorage.setItem("userName", this.state.userName)
                this.props.updateStorage(user.id)
            }
            this.props.history.push("/")
        } else {
            window.alert("User name and password do not match")
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
                        placeholder="User Name"
                        onChange={this.handleFieldChange}
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
                        placeholder="Password"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="rememberMe">
                        Remember Me
                    </Label>
                    <Input
                        type="checkbox"
                        id="rememberMe"
                        onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <Button
                    type="submit"
                    onClick={this.handleLogin}
                >
                    Sign In</Button>
            </Form>
        )
    }
}