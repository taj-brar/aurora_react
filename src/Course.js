import React from "react";
import Popup from 'reactjs-popup';
import './App.css';
import personIcon from './icons/person-icon.svg';
import calendarIcon from './icons/calendar-icon.svg';
import locationIcon from './icons/location-pin-icon.svg';
import clockIcon from './icons/clock-icon.svg';

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
        let conflict = false;
        if (!this.state.chosen)
            conflict = this.state.chooseCourse(this.state.course.getCRN());
        else
            this.state.unChooseCourse(this.state.course.getCRN());

        this.setState((oldState) => ({
            chosen: !oldState.chosen && !conflict
        }));
    }

    render() {
        const course = this.state.course;
        const schedule = course.getSchedules() ? course.getSchedules()["0"] : null;
        const courseButtonStyle = {
            backgroundColor: this.state.chosen ? '#A2A2B0' : ''
        }

        return (
            <div className="course-list-flex-item">
                <Popup className="extra-course-info-popup"
                       trigger={<button className='extra-course-info-button' style={courseButtonStyle}>◀</button>}>
                    <div></div>
                </Popup>
                <button className="course-info" style={courseButtonStyle} title={course.getCourseNumber() + ' ' + course.getSection() + ' - ' + course.getCourseName()} onClick={this.handleClick}>
                    <p className="course-details-text"
                       style={{fontSize: "1.1em"}}>{course.getCourseNumber()} {course.getSection()} - {course.getCourseName()}</p>

                    <p className="course-details-text" style={{float: "left"}}>{this.state.course.getCRN()}</p>
                    <p className="course-details-text"
                       style={{float: "right"}}>{course.getTerm()} | {course.getCredits()} credits</p>
                    <br/>

                    <div className='course-details'>
                        <img className='course-details-icon' src={locationIcon} alt='location icon'/>
                        <p className="course-details-text">{course.getCampus()}</p>
                    </div>

                    <div className='course-details'>
                        <img className='course-details-icon' src={clockIcon} alt='clock icon'/>
                        <p className="course-details-text">{schedule !== null && schedule.hasTimeInfo() ? schedule.getStartTime() + ' - ' + schedule.getEndTime() + ' | ' + schedule.getDays() + ' | ' + schedule.getLocation() : 'Schedule unavailable'}</p>
                    </div>

                    <div className='course-details'>
                        <img className='course-details-icon' src={personIcon} alt='person icon'/>
                        <p className="course-details-text">{schedule !== null && schedule.getInstructors() !== undefined ? schedule.getInstructors() : 'TBA'} </p>
                    </div>

                    <div className='course-details'>
                        <img className='course-details-icon' src={calendarIcon} alt='calendar icon'/>
                        <p className="course-details-text">{schedule !== null ? schedule.getDateRange() : 'Dates unavailable'}{course.isLabRequired() ? ' | Lab required' : null}</p>
                    </div>

                </button>
            </div>
        );
    }
}

export default Course;
