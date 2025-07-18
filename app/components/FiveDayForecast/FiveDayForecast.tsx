"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { calender } from '@/app/utils/Icons'
import { kelvinToCelsius, unixToDay } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function FiveDayForecast() {
    const { fiveDayForecast } = useGlobalContext();

    const { city, list } = fiveDayForecast;

    if (!fiveDayForecast || !city || !list) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    const processData = (dailyData: { main: { temp_min: number, temp_max: number }; dt: number; }[]) => {
        let minTemp = Number.MAX_VALUE;
        let maxTemp = Number.MIN_VALUE;

        dailyData.forEach((day: { main: { temp_min: number, temp_max: number }; dt: number; }) => {
            if (day.main.temp_min < minTemp) {
                minTemp = day.main.temp_min;
            }
            if (day.main.temp_max > maxTemp) {
                maxTemp = day.main.temp_max;
            }
        });

        return {
            day: unixToDay(dailyData[0].dt),
            minTemp, maxTemp
        };
    };

    const dailyForecasts = [];

    for (let i = 0; i < 40; i += 8) {
        const dailyData = list.slice(i, i + 8);
        dailyForecasts.push(processData(dailyData));
    }

    console.log(dailyForecasts)

    return (
        <div className="
                pt-7 pb-6 px-4
                border rounded-lg flex flex-1 flex-col justify-between
                dark:bg-dark-grey shadow-sm dark:shadow-none">
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium">
                    {calender}5-Day Forecast for {city.name}
                </h2>

                <div className="forecast-list pt-3">{
                    dailyForecasts.map((day, index) => {
                        return <div key={index} className='daily-forecast py-4 flex flex-col justify-evenly border-b-2'>
                            <p className='text-2xl min-w-[3.5rem]'>{day.day}</p>
                            <p className='text-sm flex justify-between'>
                                <span>(Low)</span>
                                <span>(High)</span>
                            </p>

                            <div className='flex flex-1 items-center justify-between gap-4'>
                                <p className="font-bold">
                                    {kelvinToCelsius(day.minTemp)}°C
                                </p>
                                <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                                <p className="font-bold">
                                    {kelvinToCelsius(day.maxTemp)}°C
                                </p>
                            </div>
                        </div>
                    })
                }</div>
            </div>
        </div>
    )
}

export default FiveDayForecast
