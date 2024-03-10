import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col } from 'react-bootstrap';
import { registerUser } from './Actions/PostRegister';
import { connect } from 'react-redux';

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
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    const { fullName, birthDate, email, password, confirmPassword } = this.state;
    await this.props.registerUser({ fullName, birthDate, email, password, confirmPassword });
  };

  render() {
    return (
      <Container className="mt-4">
        <h2 className="mb-4">Регистрация</h2>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formFullName">
                <Form.Label>ФИО</Form.Label>
                <Form.Control type="text" placeholder="Введите ФИО" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formBirthday">
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control type="email" placeholder="Введите email" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formPasswordConfirm">
                <Form.Label>Повторите пароль</Form.Label>
                <Form.Control type="password" placeholder="Повторите пароль" />
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

const mapDispatchToProps = (dispatch) => ({
  registerUser: (userData) => dispatch(registerUser(userData))
});

export default connect(null, mapDispatchToProps)(RegistrationPage);

