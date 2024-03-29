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
            year: '',
            term: '',
            subjects: [],
            courses: [],
            chosenCourses: [],
            conflictingCourseCRN: -1
        }

        this.updateCourseList = this.updateCourseList.bind(this);
        this.unChooseCourse = this.unChooseCourse.bind(this);
        this.chooseCourse = this.chooseCourse.bind(this);
        this.setYear = this.setYear.bind(this);
        this.setTerm = this.setTerm.bind(this);
        this.setSubjects = this.setSubjects.bind(this);
    }

    async updateCourseList() {
        if (this.state.year !== 'None' && this.state.term !== 'None' && this.state.subjects !== 'None') {
            await Utility.getCourses(this.state.year, this.state.term, this.state.subjects)
                .then(data => RepeatedSession.CreateFromParsedDataSet(data))
                .then(courseList => {
                    this.setState({
                        courses: courseList,
                        chosenCourses: [],
                        conflictingCourseCRN: -1
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
        let conflict = false;
        this.state.chosenCourses.forEach(preChosenCourse => {
            const newCourse = this.state.courses.find((course) => course.getCRN() === crn);

            if (preChosenCourse.isConflict(newCourse)) {
                this.setState({
                    conflictingCourseCRN: preChosenCourse.getCRN()
                })
                setTimeout(() => {
                    this.setState({
                        conflictingCourseCRN: -1
                    })
                }, 500)
                conflict = true;
            }
        });

        if (!conflict)
            this.setState((oldState) => ({
                chosenCourses: oldState.chosenCourses.concat(oldState.courses.filter((c) => c.getCRN() === crn))
            }), () => {
            });

        return conflict;
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

    setSubjects(newSubjects) {
        this.setState({
            subjects: newSubjects
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
                    <DayContainer key={mondayCourses.length + 'M' + this.state.conflictingCourseCRN}
                                  courses={mondayCourses} dayMWF={true} conflictingCRN={this.state.conflictingCourseCRN}/>
                    <DayContainer key={tuesdayCourses.length + 'T' + this.state.conflictingCourseCRN}
                                  courses={tuesdayCourses} dayMWF={false} conflictingCRN={this.state.conflictingCourseCRN}/>
                    <DayContainer key={wednesdayCourses.length + 'W' + this.state.conflictingCourseCRN}
                                  courses={wednesdayCourses} dayMWF={true} conflictingCRN={this.state.conflictingCourseCRN}/>
                    <DayContainer key={thursdayCourses.length + 'R' + this.state.conflictingCourseCRN}
                                  courses={thursdayCourses} dayMWF={false} conflictingCRN={this.state.conflictingCourseCRN}/>
                    <DayContainer key={fridayCourses.length + 'F' + this.state.conflictingCourseCRN}
                                  courses={fridayCourses} dayMWF={true} conflictingCRN={this.state.conflictingCourseCRN}/>
                </div>

                <div className="sidebar-flex-container">

                    <div className="menu-flex-container">

                        <div className="menu-flex-item">
                            <YearSelector setYear={this.setYear}/>
                        </div>

                        <div className="menu-flex-item">
                            <TermSelector key={this.disabledTerms.toString()} setTerm={this.setTerm}
                                          disabledTerms={this.disabledTerms}/>
                        </div>

                        <div className="menu-flex-item">
                            <SubjectSelector setSubjects={this.setSubjects}/>
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
