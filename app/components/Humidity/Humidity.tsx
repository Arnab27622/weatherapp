"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { droplets } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Humidity() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    const { humidity } = forecast?.main;

    const getHumidityInfo = (humidity: number) => {
        if (humidity < 20) return {
            text: "Very Dry: May cause skin, eye, and respiratory irritation.",
            color: "text-blue-600 dark:text-blue-400"
        };
        if (humidity < 30) return {
            text: "Dry: Can lead to dry skin and discomfort.",
            color: "text-sky-600 dark:text-sky-400"
        };
        if (humidity < 40) return {
            text: "Slightly Dry: Acceptable but may feel a bit dry indoors.",
            color: "text-cyan-600 dark:text-cyan-400"
        };
        if (humidity < 60) return {
            text: "Comfortable: Ideal humidity for health and indoor comfort.",
            color: "text-emerald-600 dark:text-emerald-400"
        };
        if (humidity < 70) return {
            text: "Moderately Humid: May feel muggy; allergens may increase.",
            color: "text-amber-600 dark:text-amber-400"
        };
        if (humidity < 85) return {
            text: "High Humidity: Feels sticky and can lead to discomfort.",
            color: "text-orange-600 dark:text-orange-400"
        };
        if (humidity >= 85) return {
            text: "Very High Humidity: Risk of mold, mildew, and heat-related fatigue.",
            color: "text-red-600 dark:text-red-400"
        };

        return {
            text: "Unavailable: Humidity data not available.",
            color: "text-slate-600 dark:text-slate-400"
        };
    };

    const humidityInfo = getHumidityInfo(humidity);

    return (
        <div className='pt-4 px-4 h-[10.5rem] border rounded-lg flex flex-col gap-6 md:gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                    {droplets} Humidity
                </h2>
                <p className={`text-2xl pt-3 font-bold ${humidityInfo.color}`}>
                    {humidity}%
                </p>
            </div>
            <p className={`text-sm ${humidityInfo.color}`}>
                {humidityInfo.text}
            </p>
        </div>
    )
}

export default Humidity