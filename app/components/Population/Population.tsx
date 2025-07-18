"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { people } from '@/app/utils/Icons'
import { formatNumber } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Population() {
    const { fiveDayForecast } = useGlobalContext();
    const { city } = fiveDayForecast;

    if (!fiveDayForecast || !city) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    return (
        <div className='pt-5 px-4 h-[10.5rem] border rounded-lg flex flex-col gap-8 md:gap-6 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                    {people} Population
                </h2>
                <p className='pt-4 text-2xl font-bold text-cyan-700 dark:text-cyan-400'>
                    {formatNumber(city.population)}
                </p>
            </div>
            <p className='text-sm text-slate-600 dark:text-slate-400'>Latest UN population data for {city.name}.</p>
        </div>
    )
};

export default Population
