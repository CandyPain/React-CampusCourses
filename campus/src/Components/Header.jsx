import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { logOut } from './Actions/PostLogout';
import { fetchRole } from './Actions/GetRole';
import { getUsers } from './Actions/GetAllUsers';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.registration.isAuthenticated);
  const userEmail = useSelector(state => state.registration.userEmail);
  const userRole = useSelector(state => state.role.role);
  const navigate = useNavigate();

  
  useEffect(() => {
    console.log(userRole,'userRole');
  }, [userRole]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleFetchMyCourses = () => {
    navigate('/courses/my');
  };

  const handleFetchTeachingCourses = () => {
    //dispatch(fetchTeachingCourses());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Container>
        <Navbar.Brand>Кампусные курсы</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isAuthenticated && (
              <>
                {()=>{console.log(userRole,'USERROLE RENDER');}}
                <span className="nav-link text-white" onClick={() => navigate('/groups')}>Группы курсов</span>
                {userRole && userRole.isStudent && (
                  <span className="nav-link text-white" onClick={handleFetchMyCourses}>
                    Мои курсы
                  </span>
                )}
                {userRole && userRole.isTeacher && (
                  <span className="nav-link text-white" onClick={handleFetchTeachingCourses}>
                    Преподаваемые курсы
                  </span>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Nav style={{ marginRight: '16%' }}>
        {isAuthenticated ? (
          <>
            <span className="nav-link text-white" onClick={() => navigate('/profile')}>{userEmail.userEmail}</span>
            <span className="nav-link text-white" style={{ cursor: 'pointer' }} onClick={handleLogout}>
              Выход
            </span>
          </>
        ) : (
          <>
            <span className="nav-link text-white" onClick={() => navigate('/login')}>Вход</span>
            <span className="nav-link text-white" onClick={() => navigate('/register')}>Регистрация</span>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
