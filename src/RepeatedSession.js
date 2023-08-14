const Utility = require('./Utility.js');

/**
 * This class represents repeated, regular, sessions, such as lectures or labs.
 * **/
class RepeatedSession {
    // INSTANCE VARIABLES
    #courseName;
    #crn;
    #courseNumber;
    #section;
    #requiresLab;
    #term;
    #registrationDates;
    #levels;
    #attributes;
    #credits;
    #scheduleType;
    #campus;
    #schedule;

    // CONSTRUCTOR
    constructor(parsedData) {
        // Instantiate
        this.#courseName = parsedData.courseName;
        this.#crn = Utility.parseIntSafe(parsedData.crn);
        this.#courseNumber = parsedData.courseNumber;
        this.#section = parsedData.courseSection;
        this.#requiresLab = parsedData.requiresLab;
        this.#term = parsedData.term;
        this.#registrationDates = parsedData.registrationDates;
        this.#levels = parsedData.levels;
        this.#attributes = parsedData.attributes;
        this.#credits = Utility.parseIntSafe(parsedData.credits);
        this.#scheduleType = parsedData.scheduleType;
        this.#campus = parsedData.campus;
        this.#schedule = parsedData.schedule;
    }

    getCourseName() {
        return this.#courseName;
    }

    getCRN() {
        return this.#crn;
    }

    getCourseNumber() {
        return this.#courseNumber;
    }

    getSection() {
        return this.#section;
    }

    getLabRequirement() {
        return this.#requiresLab;
    }

    getTerm() {
        return this.#term;
    }

    getRegistrationDates() {
        return this.#registrationDates;
    }

    getLevels() {
        return this.#levels;
    }

    getAttributes() {
        return this.#attributes;
    }

    getCredits() {
        return this.#credits;
    }

    getScheduleType() {
        return this.#scheduleType;
    }

    getCampus() {
        return this.#campus;
    }

    getSchedule() {
        return this.#schedule;
    }

    static CreateFromParsedDataSet(parsedDataSet) {
        const repeatedSessions = [];
        parsedDataSet.forEach(parsedData => repeatedSessions.push(new RepeatedSession(parsedData)));
        return repeatedSessions;
    }
}// end class RepeatedSession

export default RepeatedSession;