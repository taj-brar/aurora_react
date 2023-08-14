import React from "react";
import {getCourses} from "./Utility";
import './App.css';
import Course from './Course.js';
import RepeatedSession from "./RepeatedSession";

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
                setYear(2024);
            })
    }

    const updateYear = (e) => {
        setYear(e.target.value);
    }

    const updateTerm = (e) => {
        setTerm(e.target.value);
    }

    const updateSubject = (e) => {
        setSubject(e.target.value);
    }

    const coursesList = courses.map((course) => <Course key={`${course.getCRN()} ${course.getTerm()}`} course={course} onclick={updateCourseList}/>);

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
                        <select id="year" className="menu-select-item" onChange={updateYear}>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                        </select>
                    </div>

                    <div className="menu-flex-item">
                        <label htmlFor="term">Term</label>
                        <br/>
                        <select id="term" className="menu-select-item" onChange={updateTerm}>
                            <option value="Winter">Winter</option>
                            <option value="Fall">Fall</option>
                            <option value="Summer">Summer</option>
                        </select>
                    </div>

                    <div className="menu-flex-item">
                        <label htmlFor="subject">Subject</label>
                        <br/>
                        <select id="subject" className="menu-select-item" onChange={updateSubject}>
                            <option value="Computer Science">Computer Science</option>
                        </select>
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
