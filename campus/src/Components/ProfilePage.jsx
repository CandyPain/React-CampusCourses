import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { loadProfileData } from './Actions/GetProfile';
import { updateProfileData } from './Actions/PutProfile'

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { fullName, email, birthDate } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', birthDate: '' });

  useEffect(() => {
    dispatch(loadProfileData());
  }, [dispatch]);

  useEffect(() => {
    setFormData({ fullName, birthDate });
  }, [fullName, birthDate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    dispatch(updateProfileData(formData));
    setIsEditing(false);
  };

  return (
    <Container className="mt-4">
      <h2>Профиль</h2>
      <Form>
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

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите email"
            value={email}
            readOnly
          />
        </Form.Group>

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

        <Button variant="primary" onClick={isEditing ? handleSaveChanges : handleEditToggle}>
          {isEditing ? 'Сохранить' : 'Изменить'}
        </Button>
      </Form>
    </Container>
  );
};

export default ProfilePage;
