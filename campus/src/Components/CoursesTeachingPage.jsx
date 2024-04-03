import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { getTeachingCourses } from './Actions/GetTeachingCourses';
import CreateCourseModal from './CreateCourseModal';
import { createCourse } from './Actions/PostCreateCourse';
import { fetchRole } from './Actions/GetRole';
import { useNavigate } from 'react-router-dom';

export const SET_COURSE_ID = 'SET_COURSE_ID'


const CourseList = () => {
  const courses = useSelector(state => state.course.coursesTeachingList);
  const [showСreateCourseModal, setShowCreateCourseModal] = useState(false);
  const userRole = useSelector(state => state.role.role);
  const groupId = useSelector(state => state.course.groupId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTeachingCourses());
  }, [dispatch]);
  
  useEffect(() => {
    console.log('courses:', courses);
  }, [courses]);

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


  const getStatusColor = (status) => {
    switch (status) {
      case 'Created':
        return 'gray';
      case 'OpenForAssigning':
        return 'green';
      case 'Started':
        return 'blue';
      case 'Finished':
        return 'red';
      default:
        return 'black'; 
    }
  };

  const handleToCourse = (courseId) => {
    console.log('handleToCourse', courseId);
    dispatch({
      type: SET_COURSE_ID,
      payload: courseId,
    });
    navigate(`/courses/${courseId}`);
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Группы кампусных курсов</h1>
      <ListGroup>
        {courses.map((course) => (
          <ListGroup.Item key={course.id} onClick={() => handleToCourse(course.id)}>
            <div className="d-flex justify-content-between">
              <div style={{ flexGrow: 1 }}>
                <h5 style={{ fontWeight: 'bold' }}>{course.name}</h5>
                <p>Учебный год: {course.startYear}</p>
                <p>Семестр: {course.semester}</p>
                <p style={{ color: '#808080', fontSize: '0.8rem' }}>
                  Мест всего: {course.maximumStudentsCount} | Мест свободно: {course.remainingSlotsCount}
                </p>
              </div>
              <div>
              <p style={{ color: getStatusColor(course.status) }}>{course.status}</p>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
  
  
};

export default CourseList;
