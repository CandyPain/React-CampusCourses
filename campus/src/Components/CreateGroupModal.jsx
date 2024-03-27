import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class CreateGroupModal extends Component {
  constructor(props) {
    super(props);
    const { createdGroup } = props;
    const groupName = createdGroup && createdGroup.name ? createdGroup.name : '';

    this.state = {
      groupName,
    };
  }

  handleChange = (e) => {
    this.setState({ groupName: e.target.value });
  };

  render() {
    const { show, handleClose, handleCreate } = this.props;
    const { groupName } = this.state;

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создание группы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupName">
              <Form.Label>Название группы</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название группы"
                value={groupName}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={() => handleCreate(groupName)}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateGroupModal;
