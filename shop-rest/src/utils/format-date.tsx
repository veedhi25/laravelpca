import React from 'react';

interface DateFormatterProps {
    dateStr: string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({ dateStr }) => {
    const formatDate = (inputDateStr: string): string => {
        const dateObj = new Date(inputDateStr);

        // Extracting individual components from the date
        const day = dateObj.getUTCDate();
        const month = dateObj.getUTCMonth();
        const year = dateObj.getUTCFullYear();
        let hour = dateObj.getUTCHours();

        const minute = dateObj.getUTCMinutes();

        // Mapping month index to month short form
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthShortForm = monthNames[month];

        // Converting 24-hour format to 12-hour format with AM/PM
        let period = "AM";
        if (hour >= 12) {
            period = "PM";
            if (hour > 12) hour -= 12;
        }

        // Formatting the extracted components into the desired format
        return `${day}, ${monthShortForm} - ${year} / ${hour}:${String(minute).padStart(2, '0')} ${period}`;
    };

    return (
        <span>{formatDate(dateStr)}</span>
    );
}

export default DateFormatter;
