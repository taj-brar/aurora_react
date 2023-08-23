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
        this.#startTime = this.hasTimeInfo() ? moment(data.timeSlot.split(' - ')['0'], 'hh:mm a') : null;
        this.#endTime = this.hasTimeInfo() ? moment(data.timeSlot.split(' - ')['1'], 'hh:mm a') : null;
        this.#timeSlot = this.hasTimeInfo() ? moment.range(this.#startTime, this.#endTime) : null;
        this.#days = data.days;
        this.#location = data.location;
        this.#dateRange = data.dateRange;
        this.#scheduleType = data.scheduleType;
        this.#instructors = data.instructors;
    }

    hasTimeInfo() {
        return this.#type !== 'On-Line Study' && this.#type !== 'Project';
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

    isConflict(otherMeetingTime) {
        let dayOverlap = false;
        for (let i = 0; i < otherMeetingTime.#days; i++)
            dayOverlap &= this.#days.contains(otherMeetingTime.#days.charAt(i));

        return dayOverlap && this.#timeSlot.overlaps(otherMeetingTime.#timeSlot);
    }
}

export default MeetingTimes;