"use client";

import { useForecast } from '@/hooks/useWeatherData';
import { gauge } from '@/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';

function Pressure() {
    const { data: forecast } = useForecast();

    if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
        return (
            <div className='pt-5 px-4 h-42 border rounded-lg flex flex-col gap-6 md:gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none overflow-hidden'>
                <div className="top">
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-10 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
            </div>
        )
    }

    const { pressure } = forecast?.main;

    const getPressureInfo = (pressure: number) => {
        if (pressure < 980) {
            return {
                text: "Very Low: Possible stormy or unsettled weather.",
                color: "text-red-600 dark:text-red-400",
                valueColor: "text-red-700 dark:text-red-300"
            };
        } else if (pressure < 1000) {
            return {
                text: "Low: Often associated with cloudy, rainy, or windy weather.",
                color: "text-orange-600 dark:text-orange-400",
                valueColor: "text-orange-700 dark:text-orange-300"
            };
        } else if (pressure < 1013) {
            return {
                text: "Slightly Below Average: May indicate changing weather conditions.",
                color: "text-amber-600 dark:text-amber-400",
                valueColor: "text-amber-700 dark:text-amber-300"
            };
        } else if (pressure === 1013) {
            return {
                text: "Average: Standard atmospheric pressure at sea level.",
                color: "text-emerald-600 dark:text-emerald-400",
                valueColor: "text-emerald-700 dark:text-emerald-300"
            };
        } else if (pressure <= 1025) {
            return {
                text: "Above Average: Often brings calm and clear weather.",
                color: "text-blue-600 dark:text-blue-400",
                valueColor: "text-blue-700 dark:text-blue-300"
            };
        } else if (pressure > 1025) {
            return {
                text: "High: Indicates very stable and dry conditions, often sunny.",
                color: "text-indigo-600 dark:text-indigo-400",
                valueColor: "text-indigo-700 dark:text-indigo-300"
            };
        }

        return {
            text: "Unavailable: Air pressure data not available.",
            color: "text-slate-600 dark:text-slate-400",
            valueColor: "text-slate-700 dark:text-slate-300"
        };
    };

    const pressureInfo = getPressureInfo(pressure);

    return (
        <div className='pt-5 px-4 h-42 border rounded-lg flex flex-col gap-6 md:gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                    {gauge} Pressure
                </h2>
                <p className={`text-2xl pt-4 md:pt-3 font-bold ${pressureInfo.valueColor}`}>
                    {pressure} hPa
                </p>
            </div>
            <p className={`text-sm ${pressureInfo.color}`}>
                {pressureInfo.text}
            </p>
        </div>
    )
}

export default Pressure