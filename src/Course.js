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
                    <p className="course-details">{course.getCampus()} | WALLACE 223</p>
                    <p className="course-details">09:30 am - 10:20 am | MWF | Sep 07, 2022 - Dec 12, 2022</p>
                    <p className="course-details">Heather Matheson</p>
                    <p className="course-details" style={{float: "left"}}>Undergraduate Lecture | Lab required</p>
                </button>
            </div>
        );
    }
}

export default Course;
