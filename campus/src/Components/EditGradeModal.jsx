import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditGradeModal = ({ show, handleClose, studentName, handleSubmitEditMark, courseId, studentId }) => {
  const [GradeModal, setGradeModal] = useState({
    markType: '',
    mark: ''
  });

  const handleSave = () => {
    handleSubmitEditMark(courseId, studentId, GradeModal);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGradeModal({
      ...GradeModal,
      [name]: value
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Изменить оценку для {studentName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMarkType">
            <Form.Label>Тип оценки</Form.Label>
            <Form.Control
              as="select"
              name="markType"
              value={GradeModal.markType}
              onChange={handleChange}
            >
              <option value="">Выберите тип</option>
              <option value="Midterm">Midterm</option>
              <option value="Final">Final</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMark">
            <Form.Label>Оценка</Form.Label>
            <Form.Control
              as="select"
              name="mark"
              value={GradeModal.mark}
              onChange={handleChange}
            >
              <option value="">Выберите оценку</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditGradeModal;
