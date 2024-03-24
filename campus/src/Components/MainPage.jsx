import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from './Actions/GetGroups';
import { fetchRole } from './Actions/GetRole';
import { Container, ListGroup, Button } from 'react-bootstrap';

class MainPage extends Component {
  componentDidMount() {
    this.props.fetchRole();
    this.props.fetchGroups();
  }

  handleCreateGroup = () => {
    console.log('Создание новой группы');
  };

  handleEditGroup = (groupId) => {
    console.log('Редактирование группы', groupId);
  };

  handleDeleteGroup = (groupId) => {
    console.log('Удаление группы', groupId);
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
    console.log('render');
    if(!userRole) {
      return <div>Loading...</div>; // Можно отобразить загрузочный индикатор, если userRole еще не загружен
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
                  <Button variant="warning" className="ml-2 mr-2" onClick={() => this.handleEditGroup(group.id)}>
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
  fetchRole
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
