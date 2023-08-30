import React from 'react';
import Utility from './Utility.js';
import './App.css';
import Course from './Course.js';
import RepeatedSession from './RepeatedSession.js';
import YearSelector from './YearSelector.js';
import TermSelector from "./TermSelector.js";
import SubjectSelector from "./SubjectSelector.js";
import DayContainer from './DayContainer.js';

class App extends React.Component {
    disabledTerms = [];

    constructor(props) {
        super(props);

        this.state = {
            year: 'None',
            term: 'None',
            subject: 'Computer Science',
            courses: [],
            chosenCourses: []
        }

        this.updateDisabledTerms('2024');

        this.updateCourseList = this.updateCourseList.bind(this);
        this.unChooseCourse = this.unChooseCourse.bind(this);
        this.chooseCourse = this.chooseCourse.bind(this);
        this.setYear = this.setYear.bind(this);
        this.setTerm = this.setTerm.bind(this);
        this.setSubject = this.setSubject.bind(this);
    }

    async updateCourseList() {
        if (this.state.year !== 'None' && this.state.term !== 'None' && this.state.subject !== 'None') {
            await Utility.getCourses(this.state.year, this.state.term, this.state.subject)
                .then(data => RepeatedSession.CreateFromParsedDataSet(data))
                .then(courseList => {
                    this.setState({
                        courses: courseList,
                        chosenCourses: []
                    });
                })
        }
    }

    unChooseCourse(crn) {
        this.setState((oldState) => ({
            chosenCourses: oldState.chosenCourses.filter((c) => c.getCRN() !== crn)
        }), () => {
        })
    }

    chooseCourse(crn) {
        this.setState((oldState) => ({
            chosenCourses: oldState.chosenCourses.concat(oldState.courses.filter((c) => c.getCRN() === crn))
        }), () => {
        });
    }

    updateDisabledTerms(year) {
        this.disabledTerms = [];
        if (year === '2020')
            this.disabledTerms.push('Fall');
        else if (year === '2023')
            this.disabledTerms.push('Winter');
        else if (year === '2024') {
            this.disabledTerms.push('Summer');
            this.disabledTerms.push('Fall');
        }
    }

    setYear(newYear) {
        this.setState({
            year: newYear,
            term: 'None'
        })
        this.updateDisabledTerms(newYear)
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
            <Course key={`${course.getCRN()} ${course.getTerm()}`} course={course} unChooseCourse={this.unChooseCourse}
                    chooseCourse={this.chooseCourse}/>);
        const mondayCourses = this.state.chosenCourses.filter(course => course.isOnMonday());
        const tuesdayCourses = this.state.chosenCourses.filter(course => course.isOnTuesday());
        const wednesdayCourses = this.state.chosenCourses.filter(course => course.isOnWednesday())
        const thursdayCourses = this.state.chosenCourses.filter(course => course.isOnThursday());
        const fridayCourses = this.state.chosenCourses.filter(course => course.isOnFriday());

        return (
            <div className="App main-flex-container">

                <div className="week-flex-container">
                    <DayContainer key={mondayCourses.length + 'M'} courses={mondayCourses} dayMWF={true}/>
                    <DayContainer key={tuesdayCourses.length + 'T'} courses={tuesdayCourses} dayMWF={false}/>
                    <DayContainer key={wednesdayCourses.length + 'W'} courses={wednesdayCourses} dayMWF={true}/>
                    <DayContainer key={thursdayCourses.length + 'R'} courses={thursdayCourses} dayMWF={false}/>
                    <DayContainer key={fridayCourses.length + 'F'} courses={fridayCourses} dayMWF={true}/>
                </div>

                <div className="sidebar-flex-container">

                    <div className="menu-flex-container">

                        <div className="menu-flex-item">
                            <label htmlFor="year">Year</label>
                            <br/>
                            <YearSelector setYear={this.setYear}/>
                        </div>

                        <div className="menu-flex-item">
                            <label htmlFor="term">Term</label>
                            <br/>
                            <TermSelector key={this.disabledTerms.toString()} setTerm={this.setTerm}
                                          disabledTerms={this.disabledTerms}/>
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
        );
    }
}

export default App;
