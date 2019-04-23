// Authors: Billy Mathison
// Page welcomes uesr and renders links to both login and register page

import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Load extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    Welcome to Nutshell
                </div>
                <Link to="/login">Login</Link>
                {" "} or {" "}
                <Link to="/register">Register</Link>
            </React.Fragment>
        )
    }
}