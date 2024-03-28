import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getCourses } from './Actions/GetCourses';

class CourseList extends Component {


  componentDidUpdate(prevProps) {
    const { groupId } = this.props.match.params;
    if (groupId !== prevProps.match.params.groupId) {
      this.props.getCourses(groupId);
    }
  }

  render() {
    const { courses } = this.props;

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Название группы</th>
            <th>Учебный год</th>
            <th>Семестр</th>
            <th>Мест всего</th>
            <th>Мест свободно</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.groupName}</td>
              <td>{course.academicYear}</td>
              <td>{course.semester}</td>
              <td>{course.totalSeats}</td>
              <td>{course.availableSeats}</td>
              <td>{course.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.course.coursesList,
});

const mapDispatchToProps = {
  getCourses,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
