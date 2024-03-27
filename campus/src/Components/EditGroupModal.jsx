import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class EditGroupModal extends Component {
    constructor(props) {
        super(props);
        const { editedGroup } = props;
        console.log('editedGroup');
        console.log(editedGroup);
        const groupId = editedGroup && editedGroup.id ? editedGroup.id : '';
        const groupName = editedGroup && editedGroup.name ? editedGroup.name : '';
        const currentName = editedGroup && editedGroup.currentName ? editedGroup.currentName : '';
    
        this.state = {
          groupId,
          groupName,
          currentName
        };
      }

      componentDidUpdate(prevProps) {
        if (prevProps.editedGroup !== this.props.editedGroup) {
          const { id, name, currentName } = this.props.editedGroup;
          this.setState({ groupId: id || '', groupName: name || '', currentName: currentName || '' });
        }
      }
      
  handleChange = (e) => {
    this.setState({ groupName: e.target.value });
  };

  render() {
    const { show, handleClose, handleSave } = this.props;
    const { groupName } = this.state;
    const {groupId}  = this.state;

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование группы</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSave(groupId,groupName)}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditGroupModal;
