import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

const navbar = {backgroundColor: 'rgba(6, 69, 115, 1)'};

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
<<<<<<< HEAD
        <Navbar style={navbar} color="rgba(6, 69, 115, 1)" light expand="md">
=======
        <Navbar style={navbar} color="light" light expand="md">
>>>>>>> 6b308d768f7c08c74b3be3a2fb27c9a986c9b022
          <NavbarBrand href="/">DDA</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Exchange</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/DecentralizedDerivatives">Create Contract</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/DecentralizedDerivatives">My Portfolio</NavLink>
              </NavItem>
              <NavItem>
              </NavItem>
              <NavItem>  
                <NavLink href="https://github.com/DecentralizedDerivatives">Connected</NavLink>                
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
