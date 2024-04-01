import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditCourseModal = ({ show, handleClose, handleEditCourse, courseId, initialCourseData }) => {
    const [courseData, setCourseData] = useState({
        name: initialCourseData ? initialCourseData.name : '',
        startYear: initialCourseData ? initialCourseData.startYear : '',
        maximumStudentsCount: initialCourseData ? initialCourseData.maximumStudentsCount : '',
        semester: initialCourseData ? initialCourseData.semester : '',
        requirements: initialCourseData ? initialCourseData.requirements : '',
        annotations: initialCourseData ? initialCourseData.annotations : '',
        mainTeacherId: initialCourseData ? initialCourseData.mainTeacherId : '',
      });
      useEffect(() => {
        if (initialCourseData) {
          setCourseData({
            name: initialCourseData.name || '',
            startYear: initialCourseData.startYear || '',
            maximumStudentsCount: initialCourseData.maximumStudentsCount || '',
            semester: initialCourseData.semester || '',
            requirements: initialCourseData.requirements || '',
            annotations: initialCourseData.annotations || '',
            mainTeacherId: initialCourseData.mainTeacherId || '',
          });
        }
      }, [initialCourseData]);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

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
    handleEditCourse(courseId,courseData);
    handleClose();
  };

  const handleChangeRequirements = (content) => {
    setCourseData((prevData) => ({
      ...prevData,
      requirements: content,
    }));
  };

  const handleChangeAnnotations = (content) => {
    setCourseData((prevData) => ({
      ...prevData,
      annotations: content,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование курса</Modal.Title>
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
            <ReactQuill
              value={courseData.requirements}
              onChange={handleChangeRequirements}
              modules={quillModules} 
              formats={[
                'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image', 'video'
              ]}
            />
          </Form.Group>
          <Form.Group controlId="formAnnotation">
            <Form.Label>Аннотация</Form.Label>
            <ReactQuill
              value={courseData.annotations}
              onChange={handleChangeAnnotations}
              modules={quillModules} 
              formats={[
                'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image', 'video'
              ]}
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

export default EditCourseModal;
