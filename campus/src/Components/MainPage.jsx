import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { fetchGroups } from './Actions/GetGroups';
import { fetchRole } from './Actions/GetRole';
import { editGroup } from './Actions/PutGroupName';
import { createGroup } from './Actions/PostCreateGroup';
import { deleteGroup } from './Actions/DeleteGroup';
import { Container, ListGroup, Button } from 'react-bootstrap';
import EditGroupModal from './EditGroupModal';
import CreateGroupModal from './CreateGroupModal';
import DeleteGroupModal from './DeleteGroupModal';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const SET_GROUP_ID = 'SET_GROUP_ID'

const MainPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedGroup, setEditedGroup] = useState({ id: '', name: '', currentName: '' });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdGroup, setCreatedGroup] = useState({ name: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedGroup, setDeletedGroup] = useState({ id: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groups = useSelector(state => state.group.groupsList);
  const userRole = useSelector(state => state.role.role);

  useEffect(() => {
    dispatch(fetchRole());
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    console.log('userRole:', userRole);
    console.log('groups:', groups);
  }, [userRole, groups]);

  const handleCreateGroup = () => {
    setShowCreateModal(true);
  };

  const handleEditGroup = (groupId, groupName, currentName) => {
    setEditedGroup({ id: groupId, name: groupName, currentName: currentName });
    setShowEditModal(true);
  };

  const handleSaveEdit = (groupId, groupName) => {
    dispatch(editGroup(groupId, groupName));
    setShowEditModal(false);
  };

  const handleCreate = (groupName) => {
    dispatch(createGroup(groupName));
    setShowCreateModal(false);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
  };

  const handleCloseCreate = () => {
    setShowCreateModal(false);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteGroup = (groupId) => {
    setDeletedGroup({ id: groupId });
    setShowDeleteModal(true);
  };

  const handleConfirmDeleteGroup = (groupId) => {
    dispatch(deleteGroup(groupId));
    setShowDeleteModal(false);
  };

    const handleToGroup = (groupId) => {
      dispatch({
        type: SET_GROUP_ID,
        payload: groupId,
      });
      navigate(`/courses/${groupId}`);
  };

  const renderButtons = () => {
    if (!userRole) {
      return <div>Loading...</div>;
    }
    if (userRole.isAdmin === true) {
      return (
        <Button variant="primary" className="mb-3" onClick={handleCreateGroup}>
          Создать
        </Button>
      );
    }
    return null;
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Группы кампусных курсов</h1>
      {renderButtons()}
      <ListGroup>
        {groups.map((group) => (
          <ListGroup.Item key={group.id} onClick={() => handleToGroup(group.id)}>
            {group.name}
            {userRole && userRole.isAdmin === true && (
              <div className="d-flex justify-content-end">
                <Button variant="warning" className="ml-2 mr-2" onClick={() => handleEditGroup(group.id, '', group.name)}>
                  Редактировать
                </Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDeleteGroup(group.id)}>
                  Удалить
                </Button>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <EditGroupModal
        show={showEditModal}
        handleClose={handleCloseEdit}
        handleSave={handleSaveEdit}
        editedGroup={editedGroup}
      />
      <CreateGroupModal
        show={showCreateModal}
        handleClose={handleCloseCreate}
        handleCreate={handleCreate}
        createdGroup={createdGroup}
      />
      <DeleteGroupModal
        show={showDeleteModal}
        handleClose={handleCloseDelete}
        handleDelete={handleConfirmDeleteGroup}
        deletedGroup={deletedGroup}
      />
    </Container>
  );
};

export default MainPage;
