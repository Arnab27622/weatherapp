"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { sun } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import { UvProgress } from '../UvProgress/UvProgress';

function UvIndex() {
    const { uvIndex } = useGlobalContext();

    if (!uvIndex || !uvIndex.result) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    const uvIndexValue = uvIndex.result.uv;
    const uvIndexMax = uvIndexValue.toFixed(1);

    const uvIndexCategory = (uvIndex: number) => {
        if (uvIndex <= 2) {
            return {
                text: "Low",
                description: "No protection required.",
                color: "text-emerald-600 dark:text-emerald-400",
            };
        } else if (uvIndex <= 5) {
            return {
                text: "Moderate",
                description: "Stay in shade near midday.",
                color: "text-amber-600 dark:text-amber-400",
            };
        } else if (uvIndex <= 7) {
            return {
                text: "High",
                description: "Wear a hat and sunglasses.",
                color: "text-orange-600 dark:text-orange-400",
            };
        } else if (uvIndex <= 10) {
            return {
                text: "Very High",
                description: "Apply sunscreen and wear protective clothing.",
                color: "text-red-600 dark:text-red-400"
            };
        } else {
            return {
                text: "Extremely High",
                description: "Take extra precautions and avoid the sun.",
                color: "text-purple-600 dark:text-purple-400",
            };
        }
    };

    const progressPercentage = Math.min((uvIndexValue / 14) * 100, 100);
    const category = uvIndexCategory(uvIndexValue);

    return (
        <div className='pt-5 px-4 h-[10.5rem] border rounded-lg flex flex-col gap-8 md:gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300'>
                    {sun} UV Index
                </h2>
                <div className="pt-2 flex flex-col gap-1">
                    <p className="text-2xl">
                        <strong className={`${category.color}`}>{uvIndexMax}</strong>
                        <span className='text-sm'>
                            ({uvIndexCategory(uvIndexMax).text})
                        </span>
                    </p>
                    <UvProgress
                        max={14}
                        value={progressPercentage}
                        className='progress'
                    />
                </div>
            </div>
            <p className='text-sm text-slate-600 dark:text-slate-400'>{category.description}</p>
        </div>
    )
}

export default UvIndex
