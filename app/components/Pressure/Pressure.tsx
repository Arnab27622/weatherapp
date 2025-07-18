"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { gauge } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Pressure() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    const { pressure } = forecast?.main;

    const getPressureDesc = (pressure: number) => {
        if (pressure < 980) {
            return "Very Low: Possible stormy or unsettled weather.";
        } else if (pressure < 1000) {
            return "Low: Often associated with cloudy, rainy, or windy weather.";
        } else if (pressure < 1013) {
            return "Slightly Below Average: May indicate changing weather conditions.";
        } else if (pressure === 1013) {
            return "Average: Standard atmospheric pressure at sea level.";
        } else if (pressure <= 1025) {
            return "Above Average: Often brings calm and clear weather.";
        } else if (pressure > 1025) {
            return "High: Indicates very stable and dry conditions, often sunny.";
        }

        return "Unavailable: Air pressure data not available.";
    };


    return (
        <div className='pt-5 px-4 h-[10.5rem] border rounded-lg flex flex-col gap-6 md:gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium">
                    {gauge}Pressure
                </h2>
                <p className="text-2xl pt-4 md:pt-3">
                    {pressure} hPa
                </p>
            </div>
            <p className='text-sm'>{getPressureDesc(pressure)}</p>
        </div>
    )
}

export default Pressure
