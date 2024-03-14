import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from './Actions/PostLogout'; 
import { Navigate } from 'react-router-dom';
import {Form} from 'react-bootstrap';

class LogoutButton extends Component {
  state = {
    redirect: false
  };

  handleLogout = async () => {
    const { logOut } = this.props;
    await logOut();
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Navigate to="/login" />
    }

    return (
      <Form.Label onClick={this.handleLogout}>Выход</Form.Label>
    );
  }
}

export default connect(null, { logOut })(LogoutButton);
