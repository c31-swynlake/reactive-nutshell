// Authors: Billy Mathison
// Page renders

import React, { Component } from "react"


export default class MessageIndividual extends Component {
    render() {
        return(
            <React.Fragment>
                <div key={this.props.message.id}>
                    {this.props.message.message} {this.props.users.find(user => user.id === this.props.message.userId).userName}
                </div>
            </React.Fragment>
        )
    }
}