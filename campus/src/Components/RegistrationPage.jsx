import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col } from 'react-bootstrap';
import { registerUser } from './Actions/PostRegister';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

class RegistrationPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      birthDate: '',
      email: '',
      password: '',
      confirmPassword: ''
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
    const { fullName, birthDate, email, password, confirmPassword } = this.state;
  const currentYear = new Date().getFullYear();
  const birthYear = new Date(birthDate).getFullYear();
  if (birthYear >= currentYear) {
    alert('Пожалуйста, введите корректную дату рождения');
    return;
  }
  const emailRegex = /\S+@\S+\.\S+/;
  console.log("email" + email);
  if (!emailRegex.test(email)) {
    alert('Пожалуйста, введите корректный email');
    return;
  }
  if (password.length < 6 || !/\d/.test(password)) {
    console.log("pass");
    alert('Пароль должен содержать не менее 6 символов и хотя бы одну цифру');
    return;
  }
  if (password !== confirmPassword) {
    alert('Пароли не совпадают');
    return;
  }
    await this.props.registerUser({ fullName, birthDate, email, password, confirmPassword });
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
        <h2 className="mb-4">Регистрация</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formFullName">
                <Form.Label>ФИО</Form.Label>
                <Form.Control type="text" name = "fullName" placeholder="Введите ФИО" onChange={this.handleChange}/>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formBirthday">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control type="date" onChange={this.handleChange} name = "birthDate"/>
              </Form.Group>
            </Col>
          </Row>

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

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formPasswordConfirm">
                <Form.Label>Повторите пароль</Form.Label>
                <Form.Control type="password" placeholder="Повторите пароль" name = "confirmPassword" onChange={this.handleChange}/>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" onClick={() => console.log('Button clicked')}>
            Зарегистрироваться
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.registration.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (userData) => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);

