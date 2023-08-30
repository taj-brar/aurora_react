import React from "react";
import RepeatedSession from "./RepeatedSession.js";
import MeetingTimes from "./MeetingTimes.js";
import './App.css'

class DayContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: props.courses.sort(RepeatedSession.compareCourses),
            numSlots: props.dayMWF ? MWFSlots : TRSlots,
            slotStartTimes: props.dayMWF ? slotStartTimesMWF : slotStartTimesTR
        }
    }

    render() {
        let i = 0;
        let displayedCourses = this.state.courses.flatMap(course => {
            let slots = [];
            while (MeetingTimes.timeIsEarlier(this.state.slotStartTimes[i], course.getPrimarySchedule().getStartTime())) {
            // while (course.getPrimarySchedule().getStartTime().localeCompare(this.state.slotStartTimes[i]) > 0) {
                slots.push(<div className='CourseSlot'>{this.state.slotStartTimes[i]}</div>);
                i++;
            }
            slots.push(<div className='CourseSlot SelectedCourseSlot'>{course.getCourseNumber()}</div>);
            i++;
            console.log('SLOTS:' + slots);
            return slots;
        });
        while (displayedCourses.length < this.state.numSlots)
            displayedCourses.push(<div className='CourseSlot'>{this.state.slotStartTimes[i++]}</div>)

        return (
            <div className='DayContainer'>
                {displayedCourses}
            </div>
        );
    }
}

const slotStartTimesMWF = ['08:30 am', '09:30 am', '10:30 am', '11:30 am', '12:30 pm',
    '01:30 pm', '02:30 pm', '03:30 pm', '04:30 pm', '05:30 pm'];

const slotStartTimesTR = ['08:30 am', '10:00 am', '11:30 am', '01:00 pm',
    '02:30 pm', '04:00 pm', '05:30 pm'];

export default DayContainer;
export const MWFSlots = 10;
export const TRSlots = 7;
