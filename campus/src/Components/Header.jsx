import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { isAuthenticated, userEmail } = this.props;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Кампусные курсы</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              {isAuthenticated ? (
                <>
                {console.log("UE", userEmail)}
                  <Link to="/profile">{userEmail.userEmail}</Link>
                  <Link to="/logout">Выход</Link>
                </>
              ) : (
                <>
                  <Link to="/login">Вход</Link>
                  <Link to="/register">Регистрация</Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.registration.isAuthenticated,
  userEmail: state.registration.userEmail 
});

export default connect(mapStateToProps)(Header);
