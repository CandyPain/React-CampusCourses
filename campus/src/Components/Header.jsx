import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from "./LogOutButton";
import {logOut} from "./Actions/PostLogout";

class Header extends Component {
  handleLogout = () => {
    console.log("handleLogout");
    this.props.dispatch(logOut());
    <Link to ="/login"></Link>
  };
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
                  <span style={{ color: 'blue', cursor: 'pointer' }} onClick={this.handleLogout}>Выход</span>
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
