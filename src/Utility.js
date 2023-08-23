class Utility {
    static parseFloatSafe(value) {
        const token = parseFloat(value.split(" "));
        return isNaN(token) ? -1 : token;
    }

    static getCourses(year, term, subject) {
        return fetch(`/courses?year=${year}&term=${Utility.getTermCode(term)}&subject=${Utility.getSubjectCode(subject)}`)
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

    static getSubjectCode(subject) {
        if (subject === 'Computer Science')
            return 'COMP';
    }
}// end class Utility

export default Utility;