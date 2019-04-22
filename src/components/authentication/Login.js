import React, { Component } from "react"
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap"

export default class Login extends Component {

    state = {
        userId: "",
        userName: "",
        email: "",
        rememberMe: false
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleLogin = event => {
        event.preventDefault()
        if (this.state.userName === "") {
            window.alert("Please enter user name")
        } else if (this.state.email === "") {
            window.alert("Please enter email address")
        } else if (this.state.rememberMe) {
            localStorage.setItem(
                "credentials",
                JSON.stringify({
                    id: parseInt(this.state.userId),
                    userName: this.state.userName,
                    email: this.state.email
                })
            )
        } else {
            sessionStorage.setItem(
                "credentials",
                JSON.stringify({
                    id: parseInt(this.state.userId),
                    userName: this.state.userName,
                    email: this.state.email
                })
            )
        }
        this.props.history.push("/")
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
                    <Label htmlFor="email">
                        Email
                    </Label>
                    <Input
                        type="email"
                        required
                        id="email"
                        placeholder="user@email"
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
                    onClick={this.handleLogin}
                >
                    Sign In</Button>
            </Form>
        )
    }
}