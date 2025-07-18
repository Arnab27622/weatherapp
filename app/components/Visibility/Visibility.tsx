"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { eye } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Visibility() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.visibility) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    const { visibility } = forecast;

    const getVisibilityDesc = (visibility: number) => {
        const km = visibility / 1000;

        if (km >= 40) {
            return "Excellent: Nearly unlimited visibility.";
        } else if (km >= 20) {
            return "Very Good: Clear conditions.";
        } else if (km >= 10) {
            return "Good: Easily navigable.";
        } else if (km >= 4) {
            return "Moderate: Some limitations on long-distance clarity.";
        } else if (km >= 1) {
            return "Poor: Restricted visibility, caution advised.";
        } else if (km >= 0) {
            return "Very Poor: Dangerous for navigation.";
        }

        return "Unavailable: No visibility data available.";
    };


    return (
        <div className='pt-5 px-4 h-[10.5rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium">
                    {eye}Visibility
                </h2>
                <p className="text-2xl pt-4">
                    {Math.round(visibility / 1000)} km
                </p>
            </div>
            <p className='text-sm'>{getVisibilityDesc(visibility)}</p>
        </div>
    )
}

export default Visibility
