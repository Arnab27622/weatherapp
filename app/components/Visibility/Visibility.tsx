"use client";

import { useGlobalContext } from '@/app/context/GlobalContext';
import { eye } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Visibility() {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast?.visibility) {
        return <Skeleton className='h-[12rem] w-full' />
    }

    const { visibility } = forecast;

    const getVisibilityInfo = (visibility: number) => {
        const km = visibility / 1000;

        if (km >= 40) {
            return {
                text: "Excellent: Nearly unlimited visibility.",
                color: "text-emerald-600 dark:text-emerald-400",
                valueColor: "text-emerald-700 dark:text-emerald-300"
            };
        } else if (km >= 20) {
            return {
                text: "Very Good: Clear conditions.",
                color: "text-green-600 dark:text-green-400",
                valueColor: "text-green-700 dark:text-green-300"
            };
        } else if (km >= 10) {
            return {
                text: "Good: Easily navigable.",
                color: "text-lime-600 dark:text-lime-400",
                valueColor: "text-lime-700 dark:text-lime-300"
            };
        } else if (km >= 4) {
            return {
                text: "Moderate: Some limitations on long-distance clarity.",
                color: "text-amber-600 dark:text-amber-400",
                valueColor: "text-amber-700 dark:text-amber-300"
            };
        } else if (km >= 1) {
            return {
                text: "Poor: Restricted visibility, caution advised.",
                color: "text-orange-600 dark:text-orange-400",
                valueColor: "text-orange-700 dark:text-orange-300"
            };
        } else if (km >= 0) {
            return {
                text: "Very Poor: Dangerous for navigation.",
                color: "text-red-600 dark:text-red-400",
                valueColor: "text-red-700 dark:text-red-300"
            };
        }

        return {
            text: "Unavailable: No visibility data available.",
            color: "text-slate-600 dark:text-slate-400",
            valueColor: "text-slate-700 dark:text-slate-300"
        };
    };

    const visibilityInfo = getVisibilityInfo(visibility);
    const roundedKm = Math.round(visibility / 1000);

    return (
        <div className='pt-5 px-4 h-[10.5rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                    {eye} Visibility
                </h2>
                <p className={`text-2xl pt-4 font-bold ${visibilityInfo.valueColor}`}>
                    {roundedKm} km
                </p>
            </div>
            <p className={`text-sm ${visibilityInfo.color}`}>
                {visibilityInfo.text}
            </p>
        </div>
    )
}

export default Visibility