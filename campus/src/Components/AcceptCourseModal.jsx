import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AcceptCourseModal = ({ show, handleClose, handleAcceptCourse, courseId }) => {



  const handleSave = () => {
    handleAcceptCourse(courseId);
    handleClose();
  };


  return (
    <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Подтвердить запись?</Modal.Title>
  </Modal.Header>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Отмена
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Подтвердить
    </Button>
  </Modal.Footer>
</Modal>

  );
};

export default AcceptCourseModal;
