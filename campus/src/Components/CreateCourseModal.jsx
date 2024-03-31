import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateCourseModal = ({ show, handleClose, handleСreateCourse,groupId }) => {
  const [courseData, setCourseData] = useState({
    name: '',
    startYear: '',
    maximumStudentsCount: '',
    semester: '',
    requirements: '',
    annotations: '',
    mainTeacherId: '',
  });


  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: checked ? e.target.value : '',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    handleСreateCourse(groupId,courseData);
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
          <Form.Group controlId="formMaximumStudentsCount">
            <Form.Label>Общее количество мест</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите общее количество мест"
              name="maximumStudentsCount"
              value={courseData.maximumStudentsCount}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSemester">
            <Form.Label>Семестр</Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                label="Spring"
                name="semester"
                id="semesterSpring"
                value="Spring"
                checked={courseData.semester === 'Spring'}
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                label="Autumn"
                name="semester"
                id="semesterAutumn"
                value="Autumn"
                checked={courseData.semester === 'Autumn'}
                onChange={handleCheckboxChange}
              />
            </div>
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
              name="annotations"
              value={courseData.annotations}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMainTeacher">
            <Form.Label>Основной преподаватель</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя основного преподавателя"
              name="mainTeacherId"
              value={courseData.mainTeacherId}
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
