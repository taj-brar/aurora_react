import React from "react";
import Select from 'react-select';
import './App.css';
import Utility from "./Utility.js";

class TermSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTerm: 'None',
            setTerm: props.setTerm,
            disabledTerms: props.disabledTerms
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newTerm) {
        this.state.setTerm(newTerm?.value);
        this.setState({
            selectedTerm: newTerm
        })
    }

    render() {
        const termOption = [
            {value: 'Fall', label: 'Fall', isDisabled: this.state.disabledTerms.includes('Fall')},
            {value: 'Winter', label: 'Winter', isDisabled: this.state.disabledTerms.includes('Winter')},
            {value: 'Summer', label: 'Summer', isDisabled: this.state.disabledTerms.includes('Summer')}
        ];

        return <Select id="term"
                       className="menu-select-item"
                       value={this.state.selectedTerm}
                       placeholder='select term'
                       onChange={this.handleChange}
                       styles={Utility.getCustomSelectStyles()}
                       options={termOption}/>;
    }
}

export default TermSelector;