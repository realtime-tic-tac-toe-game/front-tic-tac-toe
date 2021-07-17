import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar className="Navbar" bg="dark" variant="dark">
          <Navbar.Brand className="name" href="#home">
            Tic-Tac-Toe
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
