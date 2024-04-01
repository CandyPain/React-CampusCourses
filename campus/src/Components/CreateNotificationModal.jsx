import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateNotificationModal = ({ show, handleClose, handleCreateNotification }) => {
  const [notificationText, setNotificationText] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const handleTextChange = (e) => {
    setNotificationText(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsImportant(e.target.checked);
  };

  const handleCreate = () => {
    handleCreateNotification({ text: notificationText, isImportant: isImportant });
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
          <Form.Control as="textarea" rows={3} value={notificationText} onChange={handleTextChange} />
        </Form.Group>
        <Form.Group controlId="isImportant">
          <Form.Check type="checkbox" label="Важное" checked={isImportant} onChange={handleCheckboxChange} />
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
