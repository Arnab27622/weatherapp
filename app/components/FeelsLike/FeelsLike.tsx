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
        const diff = feelsLike - avgTemp;

        if (diff < -5) {
            return {
                text: 'Feels significantly colder than actual temperature.',
                color: 'text-blue-600 dark:text-blue-400'
            };
        }
        if (diff >= -5 && diff <= 5) {
            return {
                text: 'Feels close to actual temperature.',
                color: 'text-emerald-600 dark:text-emerald-400'
            };
        }
        if (diff > 5) {
            return {
                text: "Feels significantly warmer than actual temperature.",
                color: 'text-amber-600 dark:text-amber-400'
            };
        }

        return {
            text: "Temperature feeling is typical for this range.",
            color: 'text-slate-600 dark:text-slate-400'
        };
    };

    const feelsLikeInfo = feelsLikeText(feels_like, temp_min, temp_max);
    const feelsLikeColor = feelsLikeInfo.color;

    return (
        <div className='pt-5 pl-4 h-[10.5rem] border rounded-lg flex flex-col gap-6 md:gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                    {thermometer} Feels Like
                </h2>
                <p className={`text-2xl pt-4 font-bold ${feelsLikeColor}`}>
                    {kelvinToCelsius(feels_like)}°C
                </p>
            </div>
            <p className={`pt-3 text-sm ${feelsLikeColor}`}>
                {feelsLikeInfo.text}
            </p>
        </div>
    )
}

export default FeelsLike