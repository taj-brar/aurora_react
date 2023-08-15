import React from 'react';
import {getCourses} from './Utility';
import './App.css';
import Course from './Course.js';
import RepeatedSession from './RepeatedSession.js';
import YearSelector from './YearSelector.js';
import TermSelector from "./TermSelector";
import SubjectSelector from "./SubjectSelector";

function App() {
    const [year, setYear] = React.useState(2022);
    const [term, setTerm] = React.useState("Winter");
    const [subject, setSubject] = React.useState("Computer Science");
    const [courses, setCourses] = React.useState([]);

    const updateCourseList = async () => {
        console.log("Update course list");
        await getCourses(year, term, subject)
            .then(data => RepeatedSession.CreateFromParsedDataSet(data))
            .then(courseList => {
                setCourses(courseList);
            })
    }

    const coursesList = courses.map((course) => <Course key={`${course.getCRN()} ${course.getTerm()}`} course={course}/>);

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
                        <label htmlFor="year" style={{textAlign: "center"}}>Year</label>
                        <br/>
                        <YearSelector setYear={setYear}/>
                    </div>

                    <div className="menu-flex-item">
                        <label htmlFor="term">Term</label>
                        <br/>
                        <TermSelector setTerm={setTerm}/>
                    </div>

                    <div className="menu-flex-item">
                        <label htmlFor="subject">Subject</label>
                        <br/>
                        <SubjectSelector setSubject={setSubject}/>
                    </div>

                    <button className="menu-flex-item" onClick={updateCourseList}>Get courses</button>
                </div>

                <div className="course-list-flex-container">
                    { coursesList }
                </div>

            </div>
        </div>
    );
}

export default App;
