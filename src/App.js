import React from 'react';
import {getCourses} from './Utility';
import './App.css';
import Course from './Course.js';
import RepeatedSession from './RepeatedSession.js';
import YearSelector from './YearSelector.js';
import TermSelector from "./TermSelector";
import SubjectSelector from "./SubjectSelector";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            year: 2024,
            term: 'Winter',
            subject: 'Computer Science',
            courses: [],
            chosenCourses: []
        }

        this.updateCourseList = this.updateCourseList.bind(this);
        this.unChooseCourse = this.unChooseCourse.bind(this);
        this.chooseCourse = this.chooseCourse.bind(this);
        this.setYear = this.setYear.bind(this);
        this.setTerm = this.setTerm.bind(this);
        this.setSubject = this.setSubject.bind(this);
    }

    async updateCourseList() {
        console.log("Update course list");
        await getCourses(this.state.year, this.state.term, this.state.subject)
            .then(data => RepeatedSession.CreateFromParsedDataSet(data))
            .then(courseList => {
                this.setState({courses: courseList});
            })
    }

    unChooseCourse(crn) {
        console.log("\nunChose: " + crn);
        this.setState((oldState) => ({
            chosenCourses: oldState.chosenCourses.filter((c) => c.getCRN() !== crn)
        }), () => {
            console.log(this.state.chosenCourses);
            console.log("DONE --- unChose: " + crn);
        })
    }

    chooseCourse(crn) {
        console.log("\nchose: " + crn);
        this.setState((oldState) => ({
            chosenCourses: oldState.chosenCourses.concat(oldState.courses.filter((c) => c.getCRN() === crn))
        }), () => {
            console.log(this.state.chosenCourses);
            console.log("DONE --- chose: " + crn);
        });

    }

    setYear(newYear) {
        this.setState({
            year: newYear
        })
    }

    setTerm(newTerm) {
        this.setState({
            term: newTerm
        })
    }

    setSubject(newSubject) {
        this.setState({
            subject: newSubject
        })
    }

    render() {
        const coursesList = this.state.courses.map((course) =>
                <Course key={`${course.getCRN()} ${course.getTerm()}`} course={course} unChooseCourse={this.unChooseCourse} chooseCourse={this.chooseCourse}/>);

        return (

            <div className="App main-flex-container">

                <div className="week-flex-container">
                    <div className="day-flex-container"></div>
                    <div className="day-flex-container"></div>
                    <div className="day-flex-container"></div>
                    <div className="day-flex-container"></div>
                    <div className="day-flex-container"></div>
                </div>

                <div className="sidebar-flex-container">

                    <div className="menu-flex-container">

                        <div className="menu-flex-item">
                            <label htmlFor="year" style={{
                                textAlign: "center"
                            }

                            }>Year</label>
                            <br/>
                            <YearSelector setYear={this.setYear}/>
                        </div>

                        <div className="menu-flex-item">
                            <label htmlFor="term">Term</label>
                            <br/>
                            <TermSelector setTerm={this.setTerm}/>
                        </div>

                        <div className="menu-flex-item">
                            <label htmlFor="subject">Subject</label>
                            <br/>
                            <SubjectSelector setSubject={this.setSubject}/>
                        </div>

                        <button className="menu-flex-item" onClick={this.updateCourseList}>Get courses</button>
                    </div>

                    <div className="course-list-flex-container">
                        {coursesList}
                    </div>

                </div>
            </div>
        )
            ;
    }
}

export default App;
