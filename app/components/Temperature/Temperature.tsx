"use client"

import { useGlobalContext } from '@/app/context/GlobalContext'
import {
    clearSky,
    cloudy,
    drizzleIcon,
    cloudLightning,
    rain,
    snow,
    cloudFog,
    navigation
} from '@/app/utils/Icons';
import { kelvinToCelsius } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

function Temperature() {
    const { forecast } = useGlobalContext();
    const { main, timezone, name, weather } = forecast;

    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    useEffect(() => {
        if (!timezone) return;

        const offsetMinutes = timezone / 60;
        const updateTime = () => {
            const m = moment().utcOffset(offsetMinutes);
            setLocalTime(m.format("HH:mm:ss"));
            setCurrentDay(m.format("dddd"));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]);

    if (!forecast || !weather) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    const temp = kelvinToCelsius(main?.temp);
    const minTemp = kelvinToCelsius(main?.temp_min);
    const maxTemp = kelvinToCelsius(main?.temp_max);

    const { main: weatherMain, description } = weather[0];

    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle":
                return drizzleIcon;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Atmosphere":
                return cloudFog;
            case "Clouds":
                return cloudy;
            case "Thunderstorm":
                return cloudLightning;
            default:
                return clearSky;
        }
    };

    return (
        <div className="
                pt-7 pb-6 px-4
                border rounded-lg flex flex-col justify-between
                dark:bg-dark-grey shadow-sm dark:shadow-none
        ">
            <p className="flex justify-between items-center">
                <span className="font-medium text-slate-500 dark:text-slate-400">{currentDay}</span>
                <span className="font-medium text-slate-500 dark:text-slate-400">{localTime}</span>
            </p>

            <p className="mb-6 font-bold flex items-center gap-2">
                <span className='text-slate-800 dark:text-slate-200'>{name}</span>
                <span className='text-blue-500 dark:text-blue-700'>{navigation}</span>
            </p>

            <p className="pt-3 pb-7 text-8xl font-bold self-center text-amber-600 dark:text-amber-400">{temp}°C</p>

            <div>
                <div>
                    <span className="text-2xl">{getIcon()}</span>
                    <p className="pt-2 capitalize text-lg font-medium text-blue-600 dark:text-blue-400">{description}</p>
                </div>
                <p className='flex items-center gap-4'>
                    <span><strong className='text-blue-500'>Low: </strong>{minTemp}°C</span>
                    <span><strong className='text-red-500'>High: </strong> {maxTemp}°C</span>
                </p>
            </div>
        </div>
    )
}

export default Temperature
