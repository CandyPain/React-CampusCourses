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
      username: '',
      email: '',
      password: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    // Вызываем ваш Action для регистрации пользователя
    await this.props.registerUser({ username, email, password });
    // Дополнительные действия после успешной регистрации
    // Например, редирект на другую страницу или отображение сообщения об успешной регистрации
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

          <Button variant="primary" type="submit">
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
