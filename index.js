//create single employee record
function createEmployeeRecord(employeeArray) {
    const employeeObj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj;
}

//create array of multiple employee records
function createEmployeeRecords(arrayOfEmployees) {
    return arrayOfEmployees.map(employeeArray => {
        return createEmployeeRecord(employeeArray);
    });
};

//create a time-in log within employee's timeIn array
function createTimeInEvent(employeeRecord, date) {
    const timeObj = {
        type: "TimeIn",
        hour: parseInt(date.slice(11)),
        date: date.slice(0, 10)
    }
    employeeRecord.timeInEvents.push(timeObj);
    return employeeRecord;
}

//create a time-out log within employee's timeOut array
function createTimeOutEvent(employeeRecord, date) {
    const timeObj = {
        type: "TimeOut",
        hour: parseInt(date.slice(11)),
        date: date.slice(0, 10)
    }
    employeeRecord.timeOutEvents.push(timeObj);
    return employeeRecord;
}

//calculate amount of hours employee worked on a given date
function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(e => {
        return e.date === date;
    })
    let timeOutEvent = employeeRecord.timeOutEvents.find(e => {
        return e.date === date;
    })
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}



// function hoursWorkedOnDate(employeeRecord, date) {
//     let timeIn = employeeRecord.timeInEvents.reduce((timeIn, currentEvent) => {
//         if (currentEvent.date === date) {
//             timeIn = currentEvent.hour;
//         }
//         return timeIn;
//     }, 0);
//     let timeOut = employeeRecord.timeOutEvents.reduce((timeOut, currentEvent) => {
//         if (currentEvent.date === date) {
//             timeOut = currentEvent.hour;
//         }
//         return timeOut;
//     }, 0);
//     return (timeOut - timeIn) / 100;
// }

//calculate amount of wages earned on a given date
function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    let wagesEarned = hoursWorked * employeeRecord.payPerHour;
    return wagesEarned;
}

//calculate all wages earned for a given employee
function allWagesFor(employeeRecord) {
    const allDatesWorked = employeeRecord.timeInEvents.map((event) => {
        return event.date;
    })
    return allDatesWorked.reduce((total, currentDate) => {
        return total + wagesEarnedOnDate(employeeRecord, currentDate);
    }, 0);
}

//calculates the sume of pay owed to all employees for all dates
function calculatePayroll(employeeRecordsArray) {
    return employeeRecordsArray.reduce((total, currentEmployee) => {
        return total + allWagesFor(currentEmployee);
    }, 0);
}


