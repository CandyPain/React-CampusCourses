import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Container, Table, ListGroup } from 'react-bootstrap';
import { fetchCourseDetails } from './Actions/GetDetails';
import { fetchRole } from './Actions/GetRole';
import { Nav, Row, Col, Button, Badge } from 'react-bootstrap';
import EditCourseModal from './EditCourseModal'
import { editCourse } from './Actions/PutEditCourse';
import { editCourseTeacher } from './Actions/PutEditCourse';
import EditCourseModalTeacher from './EditCourseModalTeacher';
import { statusChange } from './Actions/PostCourseStatus';
import EditStatusModal from './EditStatusModal';
import { acceptCourse } from './Actions/PostAcceptCourse';
import AcceptCourseModal from './AcceptCourseModal';
import { CreateNotification } from './Actions/PostCreateNotification';
import CreateNotificationModal from './CreateNotificationModal';
import {editStudentStatus} from './Actions/PostStudentStatus'
import {loadProfileData} from './Actions/GetProfile'
import { editStudentMark } from './Actions/PostEditMark';
import EditGrageModal from './EditGradeModal';
import { getMyCourses } from './Actions/GetMyCourses';

export const SET_STUDENT_INFO = 'SET_STUDENT_INFO';

const CourseDetailsPage = () => {

  const coursesMy = useSelector(state => state.course.coursesMyList);
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const [showEditGrageModal, setShowEditGrageModal] = useState(false);
  const [showCreateNotificationModal, setShowCreateNotificationModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const  courseId  = useSelector((state) => state.detail.courseId)
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showEditTeacherCourseModal, setShowEditTeacherCourseModal] = useState(false);
  const dispatch = useDispatch();
  const { courseDetails, error } = useSelector((state) => state.detail);
  const {studentId, studentName} = useSelector((state) => state.detail);
  const userRole = useSelector(state => state.role.role);
  const userEmail = useSelector(state => state.profile.email);
  const hasAccept = useSelector(state => state.detail.hasAccept);
  useEffect(() => {
    dispatch(fetchRole());
    dispatch(getMyCourses());
    dispatch(loadProfileData());
    dispatch(fetchCourseDetails(courseId));
    console.log("USEREMAIL", userEmail);
  }, [dispatch]);
  
  useEffect(() => {
    console.log('courseDetails:', courseDetails);
  }, [courseDetails,userRole, userEmail]);
  const [activeTab, setActiveTab] = useState('requirements');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditCourse = (courseId, courseInfo) => {
    dispatch(editCourse(courseId,courseInfo));
    setShowEditCourseModal(false);
  };

  const handleShowAcceptCourse = () => {
    setShowAcceptModal(true);
  };

  const handleEditStatus = (courseId, courseInfo) => {
    dispatch(statusChange(courseId,courseInfo));
    setShowEditStatusModal(false);
  };

  const handleEditTeacherCourse = (courseId, courseInfo) => {
    dispatch(editCourseTeacher(courseId,courseInfo));
    setShowEditTeacherCourseModal(false);
  };

  const handleSubmitEditMark = (courseId, studentId,data) => {
    dispatch(editStudentMark(courseId,studentId,data));
    setShowEditTeacherCourseModal(false);
  };

  const handleCreateNotification = (courseId, notInfo) => {
    dispatch(CreateNotification(courseId,notInfo));
    setShowCreateNotificationModal(false);
  };


  const handleAcceptCourse = (courseId) => {
    dispatch(acceptCourse(courseId));
    setShowAcceptModal(false);
    dispatch(getMyCourses());
  };

  const handleShowEditStatus = () => {
    setShowEditStatusModal(true);
  };
  
  const handleShowCreateNotification = () => {
    setShowCreateNotificationModal(true);
  };

  const handleShowEditCourse = () => {
    setShowEditCourseModal(true);
  };

  const handleShowEditMark = (studentId,studentName) => {
    if(userRole.isAdmin || userRole.isTeacher)
    {
    dispatch({ type: SET_STUDENT_INFO, payload: {studentId,studentName} });
    setShowEditGrageModal(true);
    }
  };

  const handleShowEditTeacherCourse = () => {
    setShowEditTeacherCourseModal(true);
  };

  const handleClose = () => {
    setShowEditCourseModal(false);
  };

  const handleCloseNotification = () => {
    setShowCreateNotificationModal(false);
  };

  const handleEditTeacherClose = () => {
    setShowEditCourseModal(false);
  };

  const handleSaveStatus = () => {
    setShowEditStatusModal(false);
  };

  const handleCloseStatus = () => {
    setShowEditStatusModal(false);
  };

  const handleCloseEditGrageModal = () => {
    setShowEditGrageModal(false);
  };

  const handleCloseAccept = () => {
    setShowAcceptModal(false);
  };
  

  const handleAddTeacher = () => {
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'InQueue':
        return 'blue';
      case 'Accepted':
        return 'green';
      case 'Declined':
        return 'red';
      default:
        return 'black'; 
    }
  };

  const getBadgeVariant = (result) => {
    switch (result) {
      case 'Passed':
        return 'badge bg-success'; 
      case 'Failed':
        return 'badge bg-danger'; 
      default:
        return 'badge bg-secondary'; 
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="mt-4">
      {courseDetails && (
        <>
          <h1 className="text-center mb-4">{courseDetails.name}</h1>
          <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Основные данные курса</h2>
          {(userRole.isAdmin || userRole.isTeacher) && (
            <Button
            variant="warning"
            onClick={userRole.isAdmin ? handleShowEditCourse : userRole.isTeacher ? handleShowEditTeacherCourse : null}
            className="mt-3 float-right"
            >
            Редактировать
            </Button>
          )}
          {!userRole.isAdmin && !userRole.isTeacher && courseDetails.status === 'OpenForAssigning' && (
          <>
              {coursesMy.some(course => course.id === courseId) ? (
            <p className="mt-3 float-right mr-3">Заявка подана</p>
            ) : (
              <Button
              variant="success"
              onClick={handleShowAcceptCourse}
              className="mt-3 float-right mr-3"
              >
              Записаться на курс
              </Button>
            )}
          </>
          )}


          </div>
          <Table striped bordered>
            <tbody>
            <tr>
            <td>Статус курса</td>
              <td>{courseDetails.status}</td>
              {(userRole.isAdmin || userRole.isTeacher) && (
              <td>
                <div className="d-flex">
              <Button variant="outline-primary" onClick={handleShowEditStatus}>
                Изменить
              </Button>
              </div>
            </td>
              )}
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
              <div dangerouslySetInnerHTML={{ __html: courseDetails.requirements }} />
            </div>
          )}
          {activeTab === 'annotations' && (
            <div className="mt-4">
              <h3>Аннотация</h3>
              <div dangerouslySetInnerHTML={{ __html: courseDetails.annotations }} />
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="mt-4">
              <h3>Уведомления</h3>
              {(userRole.isAdmin || userRole.isTeacher) && (
                <Button variant="primary" onClick={handleShowCreateNotification}>
                  Создать уведомление
                </Button>
                  )}
                  <ListGroup className="mt-3">
                    {courseDetails.notifications.map((notification, index) => (
                    <ListGroup.Item
                      key={index}
                      className={notification.isImportant ? 'important-notification' : ''}
                      style={{ backgroundColor: notification.isImportant ? 'red' : 'inherit', color: notification.isImportant ? 'white' : 'black' }}
                    >
                  {notification.text}
                    </ListGroup.Item>
                  ))}
                  </ListGroup>
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
    <ListGroup className="mt-3">
      {courseDetails.students.map((student, index) => (
        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
          <div>
            <p style={{ fontWeight: 'bold' }}>{student.name}</p>
            <div>
              <span style={{ color: getStatusColor(student.status) }}>
                {student.status}
              </span>
            </div>
            <small>{student.email}</small>
          </div>
          <div className="d-flex align-items-center">
            {((student.status === 'Accepted' && (userRole.isAdmin || userRole.isTeacher)) || (student.status === 'Accepted' && userRole.isStudent && student.email === userEmail)) && (
              <div className="d-flex flex-column align-items-end w-100" >
                <div className="mb-2">
                  <small>Результат промежуточной аттестации   :</small>
                  <span class={getBadgeVariant(student.midtermResult)} ml-2 onClick={()=> {handleShowEditMark(student.id,student.name)}}>{student.midtermResult}</span>
                </div>
                <div>
                  <small>Результат финальной аттестации   :</small>
                  <span class={getBadgeVariant(student.finalResult)} ml-2 onClick={()=> {handleShowEditMark(student.id,student.name)}}>{student.finalResult}</span>
                </div>
              </div>
            )}
            {student.status === 'InQueue' && (
              <div className="d-flex align-items-center">
                <Button variant="primary" className="mr-2" onClick={() => {dispatch(editStudentStatus(courseId,student.id,{status:'Accepted'}))}}>Принять</Button>
                <Button variant="danger" onClick={() => {dispatch(editStudentStatus(courseId,student.id,{status:'Declined'}))}}>Отклонить</Button>
              </div>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
)}


          {activeTab === 'teachers' && (
            <div className="mt-4">
              <h3>Преподаватели</h3>
      {userRole.isAdmin || courseDetails.teachers.some(
    (teacher) => teacher.email === userEmail && teacher.isMain
  ) ? (
        <Button variant="primary" onClick={handleAddTeacher} className="mb-3">
          Добавить преподавателя
        </Button>
      ) : null}
      <ListGroup>
        {courseDetails.teachers.map((teacher, index) => (
          <ListGroup.Item key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p>{teacher.name}</p>
                <small>{teacher.email}</small>
              </div>
              {teacher.isMain && (
                <span className="badge bg-success">Главный преподаватель</span>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
            </div>
          )}
        </>
      )}
      <EditCourseModal
    show={showEditCourseModal}
    handleClose={handleClose}
    handleEditCourse={handleEditCourse}
    courseId={courseId}
    initialCourseData={courseDetails}
      />
            <EditCourseModalTeacher
    show={showEditTeacherCourseModal}
    handleClose={handleEditTeacherClose}
    handleEditCourse={handleEditTeacherCourse}
    courseId={courseId}
    initialCourseData={courseDetails}
      />
                <EditStatusModal
    show={showEditStatusModal}
    handleClose={handleCloseStatus}
    handleEditStatus={handleEditStatus}
    courseId={courseId}
    initialCourseData={courseDetails}
      />
      <AcceptCourseModal
    show={showAcceptModal}
    handleClose={handleCloseAccept}
    handleAcceptCourse={handleAcceptCourse}
    courseId={courseId}
      />
      <CreateNotificationModal
      show={showCreateNotificationModal}
      handleClose={handleCloseNotification}
      handleCreateNotification={handleCreateNotification}
      courseId={courseId}
      />
            <EditGrageModal
      show={showEditGrageModal}
      handleClose={handleCloseEditGrageModal}
      handleSubmitEditMark={handleSubmitEditMark}
      studentName={studentName}
      courseId={courseId}
      studentId={studentId}
      />
    </Container>
  );
};

export default CourseDetailsPage;
