import React from "react";
import './App.css';

class TermSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTerm: 'Fall',
            setTerm: props.setTerm
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
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
                <option value="Summer">Summer</option>
            </select>
        );
    }
}

export default TermSelector;