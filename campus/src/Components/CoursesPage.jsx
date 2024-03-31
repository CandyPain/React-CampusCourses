import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { getCourses } from './Actions/GetCourses';
import CreateCourseModal from './CreateCourseModal';
import { createCourse } from './Actions/PostCreateCourse';
import { fetchRole } from './Actions/GetRole';

const CourseList = () => {
  const courses = useSelector(state => state.course.coursesList);
  const [showСreateCourseModal, setShowCreateCourseModal] = useState(false);
  const userRole = useSelector(state => state.role.role);
  const groupId = useSelector(state => state.course.groupId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRole());
    dispatch(getCourses(groupId));
  }, [dispatch]);
  
  useEffect(() => {
    console.log('courses:', courses);
  }, [courses,userRole]);

  const handleClose = () => {
    setShowCreateCourseModal(false);
  };

  const handleСreateCourse = (groupId, courseInfo) => {
    dispatch(createCourse(groupId, courseInfo));
    setShowCreateCourseModal(false);
  };
  const handleShowCreateGroup = () => {
    setShowCreateCourseModal(true);
  }

  const renderCreateCourseButton = () => {
    console.log(userRole);
    if (userRole && userRole.isAdmin === true) {
      console.log('in if ');
      return (
        <Button variant="primary" onClick={handleShowCreateGroup}>
          Создать курс
        </Button>
      );
    }
    return null;
  };


  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Группы кампусных курсов</h1>
      {renderCreateCourseButton()}
      <ListGroup>
        {courses.map(course => (
          <ListGroup.Item key={course.id}>
            <div className="d-flex justify-content-between">
              <div>
                <p>Название группы: {course.groupName}</p>
                <p>Учебный год: {course.academicYear}</p>
                <p>Семестр: {course.semester}</p>
              </div>
              <div>
                <p>Мест всего: {course.totalSeats}</p>
                <p>Мест свободно: {course.availableSeats}</p>
                <p>Статус: {course.status}</p>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    
      <CreateCourseModal
        show={showСreateCourseModal}
        handleClose={handleClose}
        handleСreateCourse={handleСreateCourse}
      />
          </Container>
  );
  
};

export default CourseList;
