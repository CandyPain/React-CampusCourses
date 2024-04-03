import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { getUsers } from './Actions/GetAllUsers';

const AddTeacherModal = ({ show, handleClose, handleAddTeacher,courseId }) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const allUsers = useSelector(state => state.users.allUsers)

  const handleSave = () => {
    console.log('selectedTeacher', selectedTeacher);
    handleAddTeacher(courseId,selectedTeacher.value);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить преподавателя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMainTeacher">
            <Form.Label>Выберите преподавателя</Form.Label>
            <Select
              options={allUsers.map((user) => ({ value: user.id, label: user.fullName }))}
              onChange={(selectedOption) => setSelectedTeacher(selectedOption)}
              value={selectedTeacher}
              isSearchable={true}
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

export default AddTeacherModal;
