import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateNotificationModal = ({ show, handleClose, courseId, handleCreateNotification }) => {
  const [notificationData, setNotificationData] = useState({
    text: '',
    isImportant: false
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setNotificationData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNotificationData((prevData) => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleCreate = () => {
    handleCreateNotification(courseId,notificationData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Создать уведомление</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="notificationText">
          <Form.Label>Текст уведомления</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="text"
            value={notificationData.text}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group controlId="isImportant">
          <Form.Check
            type="checkbox"
            label="Важное"
            name="isImportant"
            checked={notificationData.isImportant}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNotificationModal;
