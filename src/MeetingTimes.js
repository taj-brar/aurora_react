import Moment from 'moment';
import pkg from 'moment-range';

const {extendMoment} = pkg;

const moment = extendMoment(Moment);

class MeetingTimes {
    // INSTANCE VARIABLES
    #type
    #startTime
    #endTime
    #timeSlot
    #days
    #location
    #dateRange
    #scheduleType
    #instructors

    // CONSTRUCTOR
    constructor(data) {
        this.#type = data.type;
        this.#startTime = data.timeSlot != null ? moment(data.timeSlot.split(' - ')['0'], 'hh:mm a') : null;
        this.#endTime = data.timeSlot != null ? moment(data.timeSlot.split(' - ')['1'], 'hh:mm a') : null;
        this.#timeSlot = data.timeSlot != null ? moment.range(this.#startTime, this.#endTime) : null;
        this.#days = data.days;
        this.#location = data.location;
        this.#dateRange = data.dateRange;
        this.#scheduleType = data.scheduleType;
        this.#instructors = data.instructors;
    }

    hasTimeInfo() {
        return this.#startTime != null && this.#endTime != null;
    }

    getType() {
        return this.#type;
    }

    getStartTime() {
        return this.#startTime?.format("hh:mm a");
    }

    getEndTime() {
        return this.#endTime?.format("hh:mm a");
    }

    getTimeSlot() {
        return this.#timeSlot;
    }

    getDays() {
        return this.#days;
    }

    getLocation() {
        return this.#location;
    }

    getDateRange() {
        return this.#dateRange;
    }

    getScheduleType() {
        return this.#scheduleType;
    }

    getInstructors() {
        return this.#instructors;
    }

    isOnMonday() {
        return this.getDays() !== null ? this.getDays().includes('M') : false;
    }

    isOnTuesday() {
        return this.getDays() !== null ? this.getDays().includes('T') : false;
    }

    isOnWednesday() {
        return this.getDays() !== null ? this.getDays().includes('W') : false;
    }

    isOnThursday() {
        return this.getDays() !== null ? this.getDays().includes('R') : false;
    }

    isOnFriday() {
        return this.getDays() !== null ? this.getDays().includes('F') : false;
    }

    isConflict(otherMeetingTime) {
        let dayOverlap = false;
        for (let i = 0; i < this.getDays().length; i++)
            dayOverlap |= otherMeetingTime?.getDays().includes(this.getDays().charAt(i));

        return dayOverlap && this.getTimeSlot()?.overlaps(otherMeetingTime.getTimeSlot());
    }

    static timeIsEarlier(timeA, timeB) {
        const time1 = moment(timeA, 'hh:mm a');
        const time2 = moment(timeB, 'hh:mm a');
        return time1.isBefore(time2);
    }
}

export default MeetingTimes;