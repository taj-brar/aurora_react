import React from "react";
import Popup from 'reactjs-popup';
import './App.css';

class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: props.course,
            updateYear: props.onclick
        }
    }

    render() {
        console.log("Passed course")
        console.log(this.state.course);
        const course = this.state.course;

        return (<button className="course-list-flex-item" onClick={this.state.updateYear}>
            <p className="course-details" style={{fontSize: "1.1em"}}>{course.getCourseNumber()} {course.getSection()} - {course.getCourseName()}</p>
            <p className="course-details"></p>
            <p className="course-details" style={{float: "left"}}>{this.state.course ? this.state.course.getCRN() : "loading..."}</p>
            <p className="course-details" style={{float: "right"}}>{course.getTerm()} | {course.getCredits()} credits</p>
            <br/>
            <p className="course-details">{course.getCampus()} | WALLACE 223</p>
            <p className="course-details">09:30 am - 10:20 am | MWF | Sep 07, 2022 - Dec 12, 2022</p>
            <p className="course-details">Heather Matheson</p>
            <p className="course-details" style={{float: "left"}}>Undergraduate Lecture | Lab required</p>
            <Popup trigger={<button style={{float: "right"}}>...</button>}>
                <div></div>
            </Popup>
        </button>);
    }
}

export default Course;
