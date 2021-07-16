import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Tic Tac Toe</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
