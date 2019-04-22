import React, { Component } from "react"
import "./NavBar.css"
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
               <NavbarBrand href="/">Nutshell</NavbarBrand>
               <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
          <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/events">Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/articles">Friends</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/news">News</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/messages">Messages</NavLink>
              </NavItem>
              <NavItem>
                   <NavLink onClick={this.handleSubmit} href="/load">Log Out</NavLink>
              </NavItem>
               </Nav>
               </Collapse>
           </Navbar>
           </div>
       )
   }
}

export default NavBar
