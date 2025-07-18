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

    const getHumidity = (humidity: number) => {
        if (humidity < 20) return "Very Dry: May cause skin, eye, and respiratory irritation.";
        if (humidity < 30) return "Dry: Can lead to dry skin and discomfort.";
        if (humidity < 40) return "Slightly Dry: Acceptable but may feel a bit dry indoors.";
        if (humidity < 60) return "Comfortable: Ideal humidity for health and indoor comfort.";
        if (humidity < 70) return "Moderately Humid: May feel muggy; allergens may increase.";
        if (humidity < 85) return "High Humidity: Feels sticky and can lead to discomfort.";
        if (humidity >= 85) return "Very High Humidity: Risk of mold, mildew, and heat-related fatigue.";

        return "Unavailable: Humidity data not available.";
    };


    return (
        <div className='pt-4 px-4 h-[10.5rem] border rounded-lg flex flex-col gap-6 md:gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium">
                    {droplets}Humidity
                </h2>
                <p className="text-2xl pt-3">
                    {humidity}%
                </p>
            </div>
            <p className='text-sm'>{getHumidity(humidity)}</p>
        </div>
    )
}

export default Humidity
