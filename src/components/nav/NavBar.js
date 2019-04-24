import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class NavBar extends Component {
  state = {
    isOpen: false
  }

  handleSubmit = (event) => {
    sessionStorage.clear();
    localStorage.clear();
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    return (
      <div>
        <Navbar color="#464EA3" dark expand="md">
          <NavbarBrand tag={Link} to="/">Nutshell</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/events">Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/friends">Friends</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/news">News</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/messages">Messages</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/tasks">Tasks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.handleSubmit} tag={Link} to="/load">Log Out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavBar
