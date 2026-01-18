/**
 * useCityTime Hook
 * Calculates and updates the real-time local time and day for a specific city.
 * Accounts for the city's UTC timezone offset (provided by OpenWeather API).
 */

import { useState, useEffect } from "react";
import { format } from "date-fns";

/**
 * Custom hook for timezone-aware time management
 * @param timezone - The timezone offset in seconds from UTC
 * @returns An object containing the formatted local time (HH:mm:ss) and day of the week
 */
export const useCityTime = (timezone: number | undefined) => {
    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    useEffect(() => {
        if (timezone === undefined) return;

        /**
         * Calculates the local time by adjusting the local UTC time with the target offset
         */
        const updateTime = () => {
            // Get current time with target timezone offset
            const date = new Date();
            const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
            const cityTime = new Date(utcTime + timezone * 1000);

            setLocalTime(format(cityTime, "HH:mm:ss"));
            setCurrentDay(format(cityTime, "eeee"));
        };

        updateTime();
        // Update the clock every second for a live interface
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    return { localTime, currentDay };
};
