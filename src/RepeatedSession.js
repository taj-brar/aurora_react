import Utility from './Utility.js';
import MeetingTimes from './MeetingTimes.js';

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
        this.#crn = Utility.parseFloatSafe(parsedData.crn);
        this.#courseNumber = parsedData.courseNumber;
        this.#section = parsedData.courseSection;
        this.#requiresLab = parsedData.requiresLab;
        this.#term = parsedData.term;
        this.#registrationDates = parsedData.registrationDates;
        this.#levels = parsedData.levels;
        this.#attributes = parsedData.attributes;
        this.#credits = Utility.parseFloatSafe(parsedData.credits);
        this.#scheduleType = parsedData.scheduleType;
        this.#campus = parsedData.campus;
        this.#schedule = parsedData.schedule !== null
            ? parsedData.schedule.map(schedule => new MeetingTimes(schedule))
            : null;
    }

    // INSTANCE METHODS
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

    isLabRequired() {
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

    getSchedules() {
        return this.#schedule;
    }

    getPrimarySchedule() {
        return this.#schedule ? this.#schedule['0'] : null;
    }

    isOnMonday() {
        return this.#schedule !== null ? this.#schedule['0'].isOnMonday(): false;
    }

    isOnTuesday() {
        return this.#schedule !== null ? this.#schedule['0'].isOnTuesday(): false;
    }

    isOnWednesday() {
        return this.#schedule !== null ? this.#schedule['0'].isOnWednesday(): false;
    }

    isOnThursday() {
        return this.#schedule !== null ? this.#schedule['0'].isOnThursday(): false;
    }

    isOnFriday() {
        return this.#schedule !== null ? this.#schedule['0'].isOnFriday(): false;
    }

    // CLASS METHODS
    static CreateFromParsedDataSet(parsedDataSet) {
        const repeatedSessions = [];
        parsedDataSet.forEach(parsedData => repeatedSessions.push(new RepeatedSession(parsedData)));
        return repeatedSessions;
    }

    static compareCourses(courseA, courseB) {
        // return courseA.getPrimarySchedule().getStartTime().localeCompare(courseB.getPrimarySchedule().getStartTime());
        return MeetingTimes.timeIsEarlier(courseA.getPrimarySchedule().getStartTime(), courseB.getPrimarySchedule().getStartTime()) ? -1 : 1;
    }

}// end class RepeatedSession

export default RepeatedSession;