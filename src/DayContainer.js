import React from "react";
import RepeatedSession from "./RepeatedSession.js";
import MeetingTimes from "./MeetingTimes.js";
import './App.css'
import personIcon from './icons/person-icon.svg';
import locationIcon from './icons/location-pin-icon.svg';
import clockIcon from './icons/clock-icon.svg';

class DayContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: props.courses.sort(RepeatedSession.compareCourses),
            numSlots: props.dayMWF ? MWFSlots : TRSlots,
            slotStartTimes: props.dayMWF ? slotStartTimesMWF : slotStartTimesTR,
            conflictingCRN: props.conflictingCRN,
        }
    }

    render() {
        let i = 0;
        let displayedCourses = this.state.courses.flatMap(course => {
            let slots = [];
            while (MeetingTimes.timeIsEarlier(this.state.slotStartTimes[i], course.getPrimarySchedule().getStartTime())) {
                slots.push(<div className='CourseSlot'>{this.state.slotStartTimes[i]}</div>);
                i++;
            }
            slots.push(<div
                    className={`CourseSlot selected-course-slot ${course.getCRN() === this.state.conflictingCRN ? 'conflicting-course' : ''}`}>
                    <p className='course-slot-info-text'><span className='largeText'>{course.getCourseNumber()} {course.getSection()}</span></p>

                    <div className='course-slot-info'>
                        <img className='course-slot-info-icon' src={clockIcon} alt='clock icon'/>
                        <p className='course-slot-info-text'>{course.getPrimarySchedule().getStartTime()} - {course.getPrimarySchedule().getEndTime()}</p>
                    </div>

                    <div className='course-slot-info'>
                        <img className='course-slot-info-icon' src={locationIcon} alt='location icon'/>
                        <p className='course-slot-info-text'>{course.getPrimarySchedule().getLocation()}</p>
                    </div>

                    <div className='course-slot-info'>
                        <img className='course-slot-info-icon' src={personIcon} alt='person icon'/>
                        <p className='course-slot-info-text'>{course.getPrimarySchedule().getInstructors()}</p>
                    </div>

                </div>
            );
            i++;
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
