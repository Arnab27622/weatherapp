"use client"

import { useForecast } from '@/hooks/useWeatherData'
import {
    navigation
} from '@/utils/Icons';
import { getWeatherIcon } from '@/utils/weatherUtils';
import { convertTemperature } from '@/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import { useUnit } from '@/context/UnitContext';
import { useCityTime } from '@/hooks/useCityTime';

function Temperature() {
    const { data: forecast } = useForecast();
    const { unit } = useUnit();
    const { main, timezone, name, weather } = forecast || {};

    const { localTime, currentDay } = useCityTime(timezone);

    if (!forecast || !weather || !main || !main.temp || !main.temp_min || !main.temp_max) {
        return (
            <div className="pt-7 pb-6 px-4 border rounded-lg flex flex-col justify-between h-80 dark:bg-dark-grey shadow-sm dark:shadow-none overflow-hidden">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-24 rounded-md" />
                    <Skeleton className="h-6 w-24 rounded-md" />
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <Skeleton className="h-6 w-32 rounded-md" />
                </div>
                <div className="py-2 self-center">
                    <Skeleton className="h-16 w-32 rounded-md" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-8 rounded-full" />
                    <Skeleton className="h-6 w-40 rounded-md" />
                    <div className="flex gap-4">
                        <Skeleton className="h-6 w-28 rounded-md" />
                        <Skeleton className="h-6 w-28 rounded-md" />
                    </div>
                </div>
            </div>
        )
    }

    const temp = convertTemperature(main.temp, unit);
    const minTemp = convertTemperature(main.temp_min, unit);
    const maxTemp = convertTemperature(main.temp_max, unit);
    const unitSymbol = unit === 'imperial' ? '°F' : '°C';

    const { main: weatherMain, description } = weather[0];

    return (
        <div className="
                pt-7 pb-6 px-4
                border rounded-lg flex flex-col justify-between
                dark:bg-dark-grey shadow-sm dark:shadow-none
        ">
            <p className="flex justify-between items-center">
                <span className="font-medium text-slate-500 dark:text-slate-400">{currentDay}</span>
                <span className="font-medium text-slate-500 dark:text-slate-400">{localTime}</span>
            </p>

            <p className="mb-6 font-bold flex items-center gap-2">
                <span className='text-slate-800 dark:text-slate-200'>{name}</span>
                <span className='text-blue-500 dark:text-blue-700'>{navigation}</span>
            </p>

            <p className="pt-3 pb-7 text-8xl font-bold self-center text-amber-600 dark:text-amber-400">{temp}{unitSymbol}</p>

            <div>
                <div>
                    <span className="text-2xl">{getWeatherIcon(weatherMain)}</span>
                    <p className="pt-2 capitalize text-lg font-medium text-blue-600 dark:text-blue-400">{description}</p>
                </div>
                <p className='flex items-center gap-4'>
                    <span><strong className='text-blue-500'>Low: </strong>{minTemp}{unitSymbol}</span>
                    <span><strong className='text-red-500'>High: </strong> {maxTemp}{unitSymbol}</span>
                </p>
            </div>
        </div>
    )
}

export default Temperature
