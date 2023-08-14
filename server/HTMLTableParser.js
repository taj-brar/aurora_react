"use strict";
const cheerio = require('cheerio');

class HTMLTableParser {
    // CLASS METHODS
    static fetchData(year, term, subject) {
        return fetch('https://aurora.umanitoba.ca/ssb/bwckschd.p_get_crse_unsec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': '353',
                'Origin': 'https://aurora.umanitoba.ca',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin'
            },
            body: `term_in=${year}${term}&sel_subj=dummy&sel_day=dummy&sel_schd=dummy&sel_insm=dummy&sel_camp=dummy&sel_levl=dummy&sel_sess=dummy&sel_instr=dummy&sel_ptrm=dummy&sel_attr=dummy&sel_subj=${subject}&sel_crse=&sel_title=&sel_from_cred=&sel_to_cred=&sel_camp=%25&sel_levl=%25&sel_ptrm=%25&sel_instr=%25&sel_attr=%25&begin_hh=0&begin_mi=0&begin_ap=a&end_hh=0&end_mi=0&end_ap=a`
        }).then(response => response.text())
            .then(html => html.substring(html.indexOf("<table  CLASS=\"datadisplaytable\""), html.lastIndexOf("<br />")))
            .then(htmlChopped => HTMLTableParser.parse(htmlChopped));
    }

    static parse(htmlToParse) {
        const $ = cheerio.load(htmlToParse);
        const $loadedTable = $("table:first");
        const tableData = $loadedTable["0"].children["2"].children.filter(tag => tag.type === "tag");
        let parsedCourses = [];

        let i = 0;
        while (i < tableData.length) {
            parsedCourses.push({
                ...(this.getCourseMainInfo(tableData[i++])),
                ...(this.getCourseDetails(tableData[i++]))
            });
        }

        return parsedCourses;
    }

    static getCourseMainInfo(rowElement) {
        let tokens = rowElement.children["1"].children["0"].children["0"].data.split(" - ").map(token => token.trim());

        return {
            courseName: tokens[0],
            crn: tokens[1],
            courseNumber: tokens[2],
            courseSection: tokens[3]
        };
    }

    static getCourseDetails(rowElement) {
        const detailsArray = rowElement.children["1"].children;
        const spanElements = detailsArray.filter(element => element.name === "span");
        const anchorElement = detailsArray.filter(element => element.name === "a");
        const creditsElement = anchorElement["0"].prev.prev.prev;
        const scheduleTypeElement = creditsElement.prev.prev;
        const campusElement = scheduleTypeElement.prev.prev;

        return {
            requiresLab: detailsArray["0"].type === "text" && detailsArray["0"].data.includes("This section must be taken with a laboratory/tutorial."),
            term: spanElements["0"].next.data.trim(),
            registrationDates: spanElements["1"].next.data.trim(),
            levels: spanElements["2"].next.data.trim(),
            attributes: spanElements.length > 3 ? spanElements["3"].next.data.trim() : null,
            credits: creditsElement.data.trim(),
            scheduleType: scheduleTypeElement.data.trim(),
            campus: campusElement.data.trim(),
            schedule: this.checkScheduleExists(detailsArray) ? this.getCourseSchedule(detailsArray.filter(element => element.name === "table")["0"]) : null
        }
    }

    static checkScheduleExists(detailsArray) {
        const paragraphElements = detailsArray.filter(element => element.name === "p");

        // Plain text indicating instructor approval required
        const instructorApprovalRequired = detailsArray["0"].type === "text" && detailsArray["0"].data.includes("Instructor approval required.");

        // Paragraph indicating section cancelled
        const sectionCancelled = paragraphElements.length !== 0 && paragraphElements["0"].name === "p" && paragraphElements["0"].children["0"].type === "text" && paragraphElements["0"].children["0"].data.includes("Section cancelled");

        // Bold text in paragraph indicating remote course
        const remoteCourse = paragraphElements.length !== 0 && paragraphElements["0"].name === "p" && paragraphElements["0"].children["0"].name === "b" && paragraphElements["0"].children["0"].children["0"].data.includes("Note: This course section will not be delivered on campus. This section will be offered by Remote Learning throughout the Winter Term.");

        return !instructorApprovalRequired && !sectionCancelled && !remoteCourse;
    }

    static getCourseSchedule(tableElement) {
        const rowElements = tableElement.children["2"].children.filter(element => element.name === "tr");
        const scheduledDates = new Array(rowElements.length - 1); // parse all row elements except the first since it contains column names

        for (let i = 1; i < rowElements.length; i++)
            scheduledDates.push(this.getParsedScheduledDate(rowElements[i]));

        return scheduledDates;
    }

    static getParsedScheduledDate(rowElement) {
        const dataElements = rowElement.children.filter(element => element.name === "td");

        return {
            type: this.getFirstChildData(dataElements[0]),
            timeSlot: this.getFirstChildData(dataElements[1]),
            days: this.getFirstChildData(dataElements[2]),
            location: this.getFirstChildData(dataElements[3]),
            dateRange: this.getFirstChildData(dataElements[4]),
            scheduleType: this.getFirstChildData(dataElements[5]),
            instructors: this.getFirstChildData(dataElements[6])
        }
    }

    static getFirstChildData(element) {
        return element.children["0"].data;
    }

}// end class HTMLTableParser

module.exports = HTMLTableParser;