import React from "react";
import {getCourses} from "./Utility";
import './App.css';

function App() {
    const [year, setYear] = React.useState(2024);
    const [term, setTerm] = React.useState("Winter");
    const [subject, setSubject] = React.useState("Computer Science");
    const [courses, setCourses] = React.useState(null);

    React.useEffect(() => {
        getCourses(year, term, subject)
            .then((data) => setCourses(data));
    }, []);

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
                        <select id="year" className="menu-select-item"></select>
                    </div>

                    <div className="menu-flex-item">
                        <label htmlFor="term">Term</label>
                        <br/>
                        <select id="term" className="menu-select-item"></select>
                    </div>

                    <div className="menu-flex-item">
                        <label htmlFor="subject">Subject</label>
                        <br/>
                        <select id="subject" className="menu-select-item"></select>
                    </div>

                    <button className="menu-flex-item">Get courses</button>
                </div>

                <div className="course-list-flex-container">
                    <button className="course-list-flex-item">
                        <p className="course-details" style={{fontSize: "1.1em"}}>COMP 1010 A02 - Introductory Computer
                            Science 1</p>
                        <p className="course-details"></p>
                        <p className="course-details" style={{float: "left"}}>10112</p>
                        <p className="course-details" style={{float: "right"}}>Fall 2022 | 3 credits</p>
                        <br/>
                        <p className="course-details">Main (Fort Garry & Bannatyne) Campus | WALLACE 223</p>
                        <p className="course-details">09:30 am - 10:20 am | MWF | Sep 07, 2022 - Dec 12, 2022</p>
                        <p className="course-details">Heather Matheson</p>
                        <p className="course-details">Undergraduate Lecture | Lab required</p>
                    </button>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                    <div className="course-list-flex-item"></div>
                </div>

            </div>
        </div>
    );
}

export default App;
