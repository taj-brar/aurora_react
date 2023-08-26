import React from "react";
import './App.css';

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

    handleChange(e) {
        const newTerm = e.target.value;
        this.state.setTerm(newTerm);
        this.setState({
            selectedTerm: newTerm
        })
    }

    render() {
        return (
            <select id="term" className="menu-select-item" value={this.state.selectedTerm} onChange={this.handleChange}>
                <option value="None">Select a term</option>
                <option value="Fall" disabled={this.state.disabledTerms.includes('Fall')}>Fall</option>
                <option value="Winter" disabled={this.state.disabledTerms.includes('Winter')}>Winter</option>
                <option value="Summer" disabled={this.state.disabledTerms.includes('Summer')}>Summer</option>
            </select>
        );
    }
}

export default TermSelector;