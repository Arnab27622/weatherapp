import { useState, useEffect } from "react";
import { format } from "date-fns";

export const useCityTime = (timezone: number | undefined) => {
    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    useEffect(() => {
        if (timezone === undefined) return;

        const updateTime = () => {
            // Get current time with target timezone offset
            const date = new Date();
            const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
            const cityTime = new Date(utcTime + timezone * 1000);

            setLocalTime(format(cityTime, "HH:mm:ss"));
            setCurrentDay(format(cityTime, "eeee"));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    return { localTime, currentDay };
};
