import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class DeleteGroupModal extends Component {
    constructor(props) {
        super(props);
        const { deletedGroup } = props;
        console.log(deletedGroup);
        const groupId = deletedGroup && deletedGroup.id ? deletedGroup.id : '';
    
        this.state = {
          groupId,
        };
      }

      componentDidUpdate(prevProps) {
        console.log('componentDidUpdate');
        console.log(prevProps);
        console.log(this.props);
        if (prevProps.deletedGroup !== this.props.deletedGroup) {
            console.log('in if');
          const { id } = this.props.deletedGroup;
          this.setState({ groupId: id});
        }
      }
      

  render() {
    const { show, handleClose, handleDelete } = this.props;
    const {groupId}  = this.state;

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удаление группы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupName">
              <Form.Label>Подтвердить удаление?</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="danger" onClick={() => handleDelete(groupId)}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteGroupModal;
