import React from "react";
import Popup from 'reactjs-popup';
import './App.css';

class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: props.course,
            chosen: false,
            chooseCourse: props.chooseCourse,
            unChooseCourse: props.unChooseCourse
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((oldState) => ({
            chosen: !oldState.chosen
        }), () => {
            if (this.state.chosen)
                this.state.chooseCourse(this.state.course.getCRN());
            else
                this.state.unChooseCourse(this.state.course.getCRN());
        });
    }

    render() {
        const course = this.state.course;
        const schedule = course.getSchedules() ? course.getSchedules()["0"] : null;
        const courseButtonStyle = {
            backgroundColor: this.state.chosen ? "#9e9ea3" : "#d0d0d7"
        }

        return (
            <div className="course-list-flex-item">
                <Popup className="extra-course-info" trigger={<button>&lt;</button>}>
                    <div></div>
                </Popup>
                <button className="course-details" style={courseButtonStyle} onClick={this.handleClick}>
                    <p className="course-details"
                       style={{fontSize: "1.1em"}}>{course.getCourseNumber()} {course.getSection()} - {course.getCourseName()}</p>
                    <p className="course-details"></p>
                    <p className="course-details"
                       style={{float: "left"}}>{this.state.course.getCRN()}</p>
                    <p className="course-details"
                       style={{float: "right"}}>{course.getTerm()} | {course.getCredits()} credits</p>
                    <br/>
                    <p className="course-details">{course.getCampus()}</p>
                    <p className="course-details">{schedule !== null && schedule.hasTimeInfo()  ? schedule.getStartTime() + ' - ' +  schedule.getEndTime() + ' | ' +  schedule.getDays() + ' | ' + schedule.getLocation(): 'Schedule unavailable'}</p>
                    <p className="course-details" style={{float: "left"}}>{schedule !== null ? schedule.getInstructors() : null}</p>
                    <p className="course-details" style={{float: "right"}}>{schedule !== null ? schedule.getDateRange() : null}{course.isLabRequired() ? ' | Lab required' : null}</p>
                </button>
            </div>
        );
    }
}

export default Course;
