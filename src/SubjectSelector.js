import React from "react";
import './App.css';

class SubjectSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSubject: "Computer Science",
            setSubject: props.setSubject
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const newSubject = e.target.value;
        this.state.setSubject(newSubject);
        this.setState({
            selectedSubject: newSubject
        })
    }

    render() {
        return (
            <select id="subject" className="menu-select-item" value={this.state.selectedSubject} onChange={this.handleChange}>
                <option value="Computer Science">Computer Science</option>
            </select>
        );
    }
}

export default SubjectSelector;