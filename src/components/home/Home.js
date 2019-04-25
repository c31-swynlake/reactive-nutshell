import React, { Component } from "react";
import "./home.css";
import {
  Container
} from "reactstrap";
import API from "../../modules/APICaller";
import TaskList from "../tasks/TaskList"



export default class Home extends Component {

  state = {
    user: []
  }

  componentDidMount() {
    if (this.props.activeUser !== "")
    API.getAll(`users/${this.props.activeUser}/?_embed=tasks&_embed=articles&_embed=events&_embed=connections`).then(userInfo => this.setState({user:userInfo}))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeUser !== this.props.activeUser) {
    API.getAll(`users/${this.props.activeUser}/?_embed=tasks&_embed=articles&_embed=events&_embed=connections`).then(userInfo => this.setState({user:userInfo}))
    }}

  render() {
    return (
    <Container>
    <h1>Hello {this.state.user.userName}</h1>
    <TaskList {...this.props} activeUser={this.props.activeUser} />;
    </Container>
    )
  }
}