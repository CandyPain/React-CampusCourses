import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './Actions/PostLogin';
import { Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Row, Col } from 'react-bootstrap';


const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.registration.isAuthenticated);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert('Пожалуйста, введите корректный email');
      return;
    }
    await dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to="/groups" />;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Вход</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email адрес</Form.Label>
              <Form.Control type="email" placeholder="Введите email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
