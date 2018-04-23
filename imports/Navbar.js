import React from 'react';
import Child from './CreateContract.js';
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

  onClick = () => {
    this.child.method() // do stuff
  }
  render() {
    return (
      <div>
        <Navbar style={navbar} color="light" light expand="md">
          <NavbarBrand href="/">DDA</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Exchange</NavLink>
              </NavItem>
              <NavItem>
                <Child onRef={ref => (this.child = ref)} />
               <button onClick={this.onClick}>Child.method()</button>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/DecentralizedDerivatives">My Portfolio</NavLink>
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