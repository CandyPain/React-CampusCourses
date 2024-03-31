import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateCourseModal = ({ show, handleClose, handleСreateCourse }) => {
  const [courseData, setCourseData] = useState({
    name: '',
    startYear: '',
    totalSeats: '',
    semester: '',
    requirements: '',
    annotation: '',
    mainTeacher: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    handleСreateCourse(courseData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Создание курса</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCourseName">
            <Form.Label>Название курса</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название курса"
              name="name"
              value={courseData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formStartYear">
            <Form.Label>Год начала курса</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите год начала курса"
              name="startYear"
              value={courseData.startYear}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTotalSeats">
            <Form.Label>Общее количество мест</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите общее количество мест"
              name="totalSeats"
              value={courseData.totalSeats}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSemester">
            <Form.Label>Семестр</Form.Label>
            <Form.Control
              as="select"
              name="semester"
              value={courseData.semester}
              onChange={handleChange}
            >
              <option value="autumn">Осенний</option>
              <option value="spring">Весенний</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formRequirements">
            <Form.Label>Требования</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Введите требования курса"
              name="requirements"
              value={courseData.requirements}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAnnotation">
            <Form.Label>Аннотация</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Введите аннотацию курса"
              name="annotation"
              value={courseData.annotation}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMainTeacher">
            <Form.Label>Основной преподаватель</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя основного преподавателя"
              name="mainTeacher"
              value={courseData.mainTeacher}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCourseModal;
