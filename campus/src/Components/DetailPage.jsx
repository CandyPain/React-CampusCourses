import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import { fetchCourseDetails } from './Actions/GetDetails';
import { fetchRole } from './Actions/GetRole';
import { Nav, Row, Col } from 'react-bootstrap';

const CourseDetailsPage = () => {
  const  courseId  = useSelector((state) => state.detail.courseId)
  const dispatch = useDispatch();
  const { courseDetails, error } = useSelector((state) => state.detail);
  const userRole = useSelector(state => state.role.role);
  useEffect(() => {
    dispatch(fetchRole());
    dispatch(fetchCourseDetails(courseId));
  }, [dispatch]);
  
  useEffect(() => {
    console.log('courseDetails:', courseDetails);
  }, [courseDetails,userRole]);
  const [activeTab, setActiveTab] = useState('requirements');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="mt-4">
      {courseDetails && (
        <>
          <h1 className="text-center mb-4">{courseDetails.name}</h1>
          <h2>Основные данные курса</h2>
          <Table striped bordered>
            <tbody>
              <tr>
                <td>Статус курса</td>
                <td>{courseDetails.status}</td>
              </tr>
              <tr>
                <td>Учебный год</td>
                <td>{courseDetails.startYear}</td>
              </tr>
              <tr>
                <td>Семестр</td>
                <td>{courseDetails.semester}</td>
              </tr>
              <tr>
                <td>Всего мест</td>
                <td>{courseDetails.maximumStudentsCount}</td>
              </tr>
              <tr>
                <td>Заявок на рассмотрении</td>
                <td>{courseDetails.studentsInQueueCount}</td>
              </tr>
              <tr>
                <td>Студентов зачислено</td>
                <td>{courseDetails.studentsEnrolledCount}</td>
              </tr>
            </tbody>
          </Table>
          <Nav variant="tabs" className="mt-4">
            <Nav.Item>
              <Nav.Link active={activeTab === 'requirements'} onClick={() => handleTabChange('requirements')}>
                Требования
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active={activeTab === 'annotations'} onClick={() => handleTabChange('annotations')}>
                Аннотация
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active={activeTab === 'notifications'} onClick={() => handleTabChange('notifications')}>
                Уведомления
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {activeTab === 'requirements' && (
            <div className="mt-4">
              <h3>Требования</h3>
              <p>{courseDetails.requirements}</p>
            </div>
          )}
          {activeTab === 'annotations' && (
            <div className="mt-4">
              <h3>Аннотация</h3>
              <p>{courseDetails.annotations}</p>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="mt-4">
              <h3>Уведомления</h3>
              {courseDetails.notifications.map((notification, index) => (
                <div key={index}>
                  <p>{notification.text}</p>
                  <small>{notification.date}</small>
                </div>
              ))}
            </div>
          )}
          <Nav variant="tabs" className="mt-4">
            <Nav.Item>
              <Nav.Link active={activeTab === 'teachers'} onClick={() => handleTabChange('teachers')}>
                Преподаватели
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active={activeTab === 'students'} onClick={() => handleTabChange('students')}>
                Студенты
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {activeTab === 'students' && (
            <div className="mt-4">
              <h3>Студенты</h3>
              <p>{courseDetails.students}</p>
            </div>
          )}
          {activeTab === 'teachers' && (
            <div className="mt-4">
              <h3>Преподаватели</h3>
              {courseDetails.teachers.map((teacher, index) => (
                <div key={index}>
                  <p>{teacher.name}</p>
                  <small>{teacher.email}</small>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default CourseDetailsPage;
