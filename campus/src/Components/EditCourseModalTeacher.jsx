import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditCourseModalTeacher = ({ show, handleClose, handleEditCourse, courseId, initialCourseData }) => {
    const [courseData, setCourseData] = useState({
        requirements: initialCourseData ? initialCourseData.requirements : '',
        annotations: initialCourseData ? initialCourseData.annotations : '',
      });
      useEffect(() => {
        if (initialCourseData) {
          setCourseData({
            requirements: initialCourseData.requirements || '',
            annotations: initialCourseData.annotations || '',
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

export default EditCourseModalTeacher;
