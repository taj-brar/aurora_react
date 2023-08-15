import React from "react";
import './App.css';

class YearSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedYear: 2024,
            setYear: props.setYear
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const newYear = e.target.value;
        this.state.setYear(newYear);
        this.setState({
            selectedYear: newYear
        })
    }

    render() {
        return (
            <select id="year" className="menu-select-item" value={this.state.selectedYear} onChange={this.handleChange}>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
            </select>
        );
    }
}

export default YearSelector;