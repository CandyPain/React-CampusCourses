import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfileData } from './Actions/GetProfile';
import { updateProfileData } from './Actions/PutProfile'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { fullName, email, birthDate } = useSelector((state) => state.profile);
  const {isAuthenticated} = useSelector((state) => state.registration)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', birthDate: '', email: '' });

  useEffect(() => {
    dispatch(loadProfileData());
  }, [dispatch]);

  useEffect(() => {
    setFormData({ fullName, birthDate, email });
  }, [fullName, birthDate, email]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    console.log(formData);
    dispatch(updateProfileData(formData));
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('tologin');
      <Navigate to='/login'/>
    }
  }, [isAuthenticated]);

  return (
    <Container className="mt-4">
      <h2>Профиль</h2>
      <Form>
        <Row className="mb-3">
            <Form.Group controlId="formFullName">
              <Form.Label>ФИО</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите ФИО"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
        </Row>
        <Row className='mb-3'>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                readOnly
                disabled
              />
            </Form.Group>
        </Row>
        <Row className='mb-3'>
            <Form.Group controlId="formBirthDate">
              <Form.Label>Дата рождения</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
        </Row>
        <Button variant="primary" onClick={isEditing ? handleSaveChanges : handleEditToggle}>
          {isEditing ? 'Сохранить' : 'Изменить'}
        </Button>
      </Form>
    </Container>
  );
};


export default ProfilePage
