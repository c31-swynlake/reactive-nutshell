import React, { Component } from "react";
import "./home.css";
import {
  Container
} from "reactstrap";
// import API from "../../modules/APIManager"



export default class Home extends Component {

  componentDidMount() {
    
  }
  render() {
    return <Container>
    <h1>Hello {this.props.currentUser}</h1>
    </Container>;
  }
}