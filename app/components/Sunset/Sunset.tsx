"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { sunset } from '@/app/utils/Icons';
import { unixToTime } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Sunset() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    const times = forecast?.sys?.sunset;
    const timezone = forecast?.timezone;

    const sunsetTime = unixToTime(times, timezone);
    const sunriseTime = unixToTime(forecast?.sys?.sunrise, timezone);
    return (
        <div className='pt-5 px-4 h-[10.5rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium text-amber-700 dark:text-amber-300'>
                    {sunset}Sunset
                </h2>
                <p className="pt-4 text-2xl text-amber-800 dark:text-amber-200">{sunsetTime}</p>
            </div>
            <p className='text-sm text-sky-700 dark:text-sky-300'><strong className='text-sky-600 dark:text-sky-400'>Sunrise:</strong> {sunriseTime}</p>
        </div>
    )
}

export default Sunset
