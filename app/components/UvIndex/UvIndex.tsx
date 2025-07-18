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
                description: "No protection required."
            };
        } else if (uvIndex <= 5) {
            return {
                text: "Moderate",
                description: "Stay in shade near midday."
            };
        } else if (uvIndex <= 7) {
            return {
                text: "High",
                description: "Wear a hat and sunglasses."
            };
        } else if (uvIndex <= 10) {
            return {
                text: "Very High",
                description: "Apply sunscreen and wear protective clothing."
            };
        } else {
            return {
                text: "Extremely High",
                description: "Take extra precautions and avoid the sun."
            };
        }
    };

    const progressPercentage = Math.min((uvIndexValue / 14) * 100, 100);
    const category = uvIndexCategory(uvIndexValue);

    return (
        <div className='pt-5 px-4 h-[10.5rem] border rounded-lg flex flex-col gap-8 md:gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium'>
                    {sun} UV Index
                </h2>
                <div className="pt-2 flex flex-col gap-1">
                    <p className="text-2xl">
                        <strong>{uvIndexMax}</strong>
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
            <p className='text-sm'>{category.description}</p>
        </div>
    )
}

export default UvIndex
