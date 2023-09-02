import React from "react";
import Select from 'react-select';
import './App.css';
import Utility from "./Utility.js";

class YearSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedYear: 'None',
            setYear: props.setYear
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newYear) {
        this.state.setYear(newYear?.value);
        this.setState({
            selectedYear: newYear
        })
    }

    render() {
        const yearOptions = [
            { value: '2024', label: '2024' },
            { value: '2023', label: '2023' },
            { value: '2022', label: '2022' },
            { value: '2021', label: '2021' },
            { value: '2020', label: '2020' }
        ];

        return <Select id="year"
                       className="menu-select-item"
                       value={this.state.selectedTerm}
                       placeholder='select year'
                       onChange={this.handleChange}
                       styles={Utility.getCustomSelectStyles()}
                       options={yearOptions}/>;
    }
}

export default YearSelector;