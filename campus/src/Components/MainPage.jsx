import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from './Actions/GetGroups';
import { fetchRole } from './Actions/GetRole';
import {editGroup} from './Actions/PutGroupName'
import {createGroup} from './Actions/PostCreateGroup'
import {deleteGroup} from './Actions/DeleteGroup'
import { Container, ListGroup, Button } from 'react-bootstrap';
import EditGroupModal from './EditGroupModal';
import CreateGroupModal from './CreateGroupModal';
import DeleteGroupModal from './DeleteGroupModal';

class MainPage extends Component {
  state = {
    showEditModal: false,
    editedGroup: { id: '', name: '' , currentName: ''},
    showCreateModal: false,
    createdGroup: {name: ''},
    showDeleteModal: false,
    deletedGroup: {id: ''}
  };

  componentDidMount() {
    this.props.fetchRole();
    this.props.fetchGroups();
  }

  handleCreateGroup = () => {
    this.setState({
      showCreateModal:true
    })
  };

  handleEditGroup = (groupId, groupName, currentName) => {
    console.log('handleEditGroup');
    console.log(groupId);
    this.setState({
      showEditModal: true,
      editedGroup: { id: groupId, name: groupName, currentName: currentName},
    });
  };

  handleSaveEdit = (groupId,groupName) => {
    this.props.editGroup(groupId,groupName);
    console.log('Сохранение изменений', groupName);
    this.setState({ showEditModal: false });
  };

  handleCreate = (groupName) => {
    this.props.createGroup(groupName);
    console.log('Создание группы', groupName);
    this.setState({ showCreateModal: false });
  };



  handleCloseEdit = () => {
    this.setState({ showEditModal: false });
  };

  handleCloseCreate = () => {
    this.setState({ showCreateModal: false });
  };

  handleCloseDelete = () => {
    this.setState({ showDeleteModal: false });
  };

  handleDeleteGroup = (groupId) => {
    console.log('handleDeleteGroup');
    console.log(groupId);
    this.setState({ showDeleteModal: true, deletedGroup:{id:groupId}});
  };

  handleConfirmDeleteGroup = (groupId) => {
    this.props.deleteGroup(groupId);
    this.setState({ showDeleteModal: false });
  };

  renderButtons = () => {
    console.log('renderButtons');
    const { userRole } = this.props;
    console.log(userRole);
    if (userRole.isAdmin === true) {
      return (
        <Button variant="primary" className="mb-3" onClick={this.handleCreateGroup}>
          Создать
        </Button>
      );
    }
    return null; 
  };

  render() {
    const { groups, userRole } = this.props;
    const { editedGroup, showEditModal } = this.state;
    const { createdGroup, showCreateModal } = this.state;
    const { deletedGroup,showDeleteModal} = this.state;
    console.log('render');
    if(!userRole) {
      return <div>Loading...</div>; 
    }
    return (
      <Container className="mt-4">
        <h1 className="text-center mb-4">Группы кампусных курсов</h1>
        {this.renderButtons()}
        <ListGroup>
          {groups.map((group) => (
            <ListGroup.Item key={group.id}>
              {group.name}
              {userRole.isAdmin === true && (
                <div className="d-flex justify-content-end">
                  <Button variant="warning" className="ml-2 mr-2" onClick={() => this.handleEditGroup(group.id,'', group.name)}>
                    Редактировать
                  </Button>
                  <Button variant="danger" className="ml-2" onClick={() => this.handleDeleteGroup(group.id)}>
                    Удалить
                  </Button>
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <EditGroupModal
          show={showEditModal}
          handleClose={this.handleCloseEdit}
          handleSave={this.handleSaveEdit}
          editedGroup={editedGroup}
        />
        <CreateGroupModal
          show={showCreateModal}
          handleClose={this.handleCloseCreate}
          handleCreate={this.handleCreate}
          createdGroup={createdGroup}
        />
        <DeleteGroupModal
          show={showDeleteModal}
          handleClose={this.handleCloseDelete}
          handleDelete={this.handleConfirmDeleteGroup}
          deletedGroup={deletedGroup}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.group.groupsList,
  userRole:state.role.role,
});

const mapDispatchToProps = {
  fetchGroups,
  fetchRole,
  editGroup,
  createGroup,
  deleteGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
