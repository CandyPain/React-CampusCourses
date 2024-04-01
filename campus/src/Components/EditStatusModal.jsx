import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditStatusModal = ({ show, handleClose, handleEditStatus, courseId, initialCourseData }) => {
    const [courseData, setCourseData] = useState({
        status: initialCourseData ? initialCourseData.status : '',
      });
      useEffect(() => {
        if (initialCourseData) {
          setCourseData({
            status: initialCourseData.status || '',
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
    handleEditStatus(courseId,courseData);
    handleClose();
  };


  return (
    <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Изменить статус курса</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Check
                type="checkbox"
                label="OpenForAssigning"
                name="status"
                id="OpenForAssigning"
                value="OpenForAssigning"
                checked={courseData.status === 'OpenForAssigning'}
                onChange={handleCheckboxChange}
              />
        <Form.Check
                type="checkbox"
                label="Started"
                name="status"
                id="Started"
                value="Started"
                checked={courseData.status === 'Started'}
                onChange={handleCheckboxChange}
              />
        <Form.Check
                type="checkbox"
                label="Finished"
                name="status"
                id="Finished"
                value="Finished"
                checked={courseData.status === 'Finished'}
                onChange={handleCheckboxChange}
              />
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

export default EditStatusModal;
