import React from "react";
import Select from 'react-select';
import Utility from "./Utility.js";
import './App.css';

class SubjectSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSubjects: [],
            setSubjects: props.setSubjects
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newSubjects) {
        this.state.setSubjects(newSubjects.map(subject => subject.value));
        this.setState({
            selectedSubjects: newSubjects
        })
    }

    render() {
        const scienceSubjects = [
            {value: 'Computer Science', label: 'Computer Science'},
            {value: 'Physics', label: 'Physics'},
        ]
        const engineeringSubjects = [
            {value: 'Biosystems Engineering', label: 'Biosystems Engineering'},
            {value: 'Civil Engineering', label: 'Civil Engineering'},
            {value: 'Electrical and Computer Engineering', label: 'Electrical and Computer Engineering'},
            {value: 'Engineering', label: 'Engineering'},
            {value: 'Mechanical Engineering', label: 'Mechanical Engineering'},
        ]
        const mathsSubjects = [
            {value: 'Mathematics', label: 'Mathematics'},
            {value: 'Statistics', label: 'Statistics'}
        ]

        const subjectOptions = [
            { label: 'Science', options: scienceSubjects},
            { label: 'Engineering', options: engineeringSubjects},
            { label: 'Maths', options: mathsSubjects},
        ];

        return (
            <Select isMulti
                    id="subject"
                    className="menu-select-item"
                    value={this.state.selectedSubjects}
                    placeholder='select subject(s)'
                    onChange={this.handleChange}
                    styles={Utility.getCustomSelectStyles()}
                    options={subjectOptions}/>
        );
    }
}

export default SubjectSelector;