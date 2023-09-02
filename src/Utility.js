class Utility {
    static parseFloatSafe(value) {
        const token = parseFloat(value.split(" "));
        return isNaN(token) ? -1 : token;
    }

    static getCourses(year, term, subjects) {
        return fetch(`/courses?year=${year}&term=${Utility.getTermCode(term)}&subjects=${Utility.getSubjectCodes(subjects)}`)
            .then((res) => res.json())
    }

    static getTermCode(term) {
        if (term === 'Fall')
            return "90";
        else if (term === 'Summer')
            return '50';
        else
            return '10';
    }

    static getSubjectCodes(subjects) {
        return subjects.map(subject => Utility.getSubjectCode(subject));
    }

    static getSubjectCode(subject) {
        if (subject === 'Computer Science')
            return 'COMP';
        else if (subject === 'Physics')
            return 'PHYS'
        else if (subject === 'Biosystems Engineering')
            return 'BIOE';
        else if (subject === 'Civil Engineering')
            return 'CIVL';
        else if (subject === 'Electrical and Computer Engineering')
            return 'ECE';
        else if (subject === 'Engineering')
            return 'ENG';
        else if (subject === 'Mechanical Engineering')
            return 'MECH';
        else if (subject === 'Mathematics')
            return 'MATH';
        else if (subject === 'Statistics')
            return 'STAT';
    }

    static getCustomSelectStyles() {
        return {
            menu: (styles) => ({
               ...styles,
               backgroundColor: 'transparent'
            }),
            menuList: (styles) => ({
                ...styles,
                backgroundColor: '#2e3046',
                borderRadius: 10
            }),
            control: (styles) => ({
                ...styles,
                backgroundColor: '#2e3046',
                borderRadius: 10,
                borderColor: '#2e3046',
            }),
            option: (styles, {isFocused, isDisabled}) => ({
                ...styles,
                backgroundColor: isFocused ? '#847b8e' : '#2e3046',
                color: isDisabled ? 'grey' : undefined
            }),
            dropdownIndicator: (styles) => ({
                ...styles,
                paddingTop: 5,
                paddingBottom: 5,
            }),
            clearIndicator: (styles) => ({
                ...styles,
                paddingTop: 5,
                paddingBottom: 5,
            }),
            valueContainer: (styles) => ({
                ...styles,
                fontSize: 13,
            }),
            singleValue: (styles) => ({
                ...styles,
               color: 'white'
            }),
            multiValueRemove: (styles) => ({
                ...styles,
                backgroundColor: '#847b8e'
            }),
            placeholder: (styles) => ({
                ...styles,
                color: 'white',
                paddingLeft: 5
            }),
        }
    }
}// end class Utility

export default Utility;