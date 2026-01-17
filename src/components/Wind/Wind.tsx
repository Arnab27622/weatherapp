"use client"

import { useForecast } from '@/hooks/useWeatherData';
import { wind } from '@/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React from 'react'

function Wind() {
    const { data: forecast } = useForecast();

    const windSpeed = forecast?.wind?.speed;
    const windDir = forecast?.wind?.deg;

    if (!forecast || !windSpeed || !windDir) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    return (
        <div className='pt-3 px-4 h-[10.5rem] border rounded-lg flex flex-col gap-2 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <h2 className='flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300'>
                {wind} Wind
            </h2>

            <div className="compass relative flex items-center justify-center">
                <div className="image relative">
                    <Image src="/compass_body.svg" alt="compass" width={110} height={110} />
                    <Image src="/compass_arrow.svg" alt="compass" width={11} height={11} className='absolute inset-0 m-auto transition-transform duration-500 ease-in-out dark:invert' style={{
                        transform: `rotate(${windDir}deg)`,
                        transformOrigin: 'center center',
                        transformBox: 'fill-box',
                    }} />
                </div>
                <p className="absolute inset-0 flex items-center justify-center text-xs text-sky-600 dark:text-sky-400 font-bold">{Math.round(windSpeed)} m/s</p>
            </div>
        </div>
    )
}

export default Wind
