import React from 'react';

export const DateFormatter = ({record}) => {
    let newData = new Date(record);
    let year = newData.getFullYear();
    let month = newData.getMonth() + 1;
    let day = newData.getDate();
    let hours = newData.getHours();
    let minutes = newData.getMinutes();
    let seconds = newData.getSeconds();

    if (seconds < 10) {
        const fullSeconds = `0${seconds}`;
        seconds = fullSeconds;
    }
    if (minutes < 10) {
        const fullMinutes = `0${minutes}`;
        minutes = fullMinutes;
    }
    if (hours < 10) {
        const fullHours = `0${hours}`;
        hours = fullHours;
    }

    if (month < 10) {
        const fullMonth = `0${month}`;
        month = fullMonth;
    }
    if (day < 10) {
        const fullDay = `0${day}`;
        day = fullDay;
    }

    return (
        <div>
            {day}-{month}-{year}
        </div>
    );
};