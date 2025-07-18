"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { thermometer } from '@/app/utils/Icons';
import { kelvinToCelsius } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function FeelsLike() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    const { feels_like, temp_min, temp_max } = forecast?.main;

    const feelsLikeText = (feelsLike: number, tempMin: number, tempMax: number) => {
        const avgTemp = (tempMax + tempMin) / 2;

        if (feelsLike < avgTemp - 5) {
            return 'Feels significantly colder than actual temperature.';
        }
        if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
            return 'Feels close to actual temperature.';
        }
        if (feelsLike > avgTemp + 5) {
            return "Feels significantly warmer than actual temperature.";
        }

        return "Temperature feeling is typical for this range.";
    };

    const feelsLikeDesc = feelsLikeText(feels_like, temp_min, temp_max);

    return (
        <div className='pt-5 pl-4 h-[10.5rem] border rounded-lg flex flex-col gap-6 md:gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium">
                    {thermometer}Feels Like
                </h2>
                <p className="text-2xl pt-4">
                    {kelvinToCelsius(feels_like)}°C
                </p>
            </div>
            <p className='pt-3 text-sm'>{feelsLikeDesc}</p>
        </div>
    )
}

export default FeelsLike
