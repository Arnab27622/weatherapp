/**
 * Population Component
 * Displays the estimated population of the selected city.
 * Uses formatted numbers (e.g., 1.2M) for readability.
 */

"use client"

import { useFiveDayForecast } from '@/hooks/useWeatherData';
import { people } from '@/utils/Icons';
import { formatNumber } from '@/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Population component
 * Renders a card with population statistics for the current city.
 */
function Population() {
    const { data: fiveDayForecast } = useFiveDayForecast();
    if (!fiveDayForecast || !fiveDayForecast.city) {
        return (
            <div className='pt-5 px-4 h-42 border rounded-lg flex flex-col gap-8 md:gap-6 dark:bg-dark-grey shadow-sm dark:shadow-none overflow-hidden'>
                <div className="top">
                    <Skeleton className="h-6 w-28 mb-2" />
                    <Skeleton className="h-10 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
            </div>
        )
    }

    const { city } = fiveDayForecast;

    return (
        <div className='pt-5 px-4 h-42 border rounded-lg flex flex-col gap-8 md:gap-6 dark:bg-dark-grey shadow-sm dark:shadow-none'>
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
