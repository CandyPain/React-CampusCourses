import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col } from 'react-bootstrap';

class LoginPage extends Component {
  render() {
    return (
      <Container className="mt-4">
        <h2 className="mb-4">Вход</h2>
        <Form>
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

          <Button variant="primary" type="submit">
            Войти
          </Button>
        </Form>
      </Container>
    );
  }
}

export default LoginPage;
