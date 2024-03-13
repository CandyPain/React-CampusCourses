import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col } from 'react-bootstrap';
import { loginUser } from './Actions/PostLogin';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    console.log("change");
    console.log(e.target.name)
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    const {email, password} = this.state;
  const emailRegex = /\S+@\S+\.\S+/;
  console.log("email" + email);
  if (!emailRegex.test(email)) {
    alert('Пожалуйста, введите корректный email');
    return;
  }
    await this.props.loginUser({ email, password});
  };

  render() {
    const { isAuthenticated } = this.props;
    console.log(isAuthenticated);
    if (isAuthenticated) {
      console.log('navigate');
      return <Navigate to="/Main" />;
    }
    return (
      <Container className="mt-4">
        <h2 className="mb-4">Вход</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control type="email" placeholder="Введите email" name = "email" onChange={this.handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль" name = "password" onChange={this.handleChange}/>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Войти
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userData) => dispatch(loginUser(userData))
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
