"use client"

import { ForecastItem } from '@/types/weather';
import { useFiveDayForecast } from '@/hooks/useWeatherData';
import { calender } from '@/utils/Icons'
import { convertTemperature, unixToDay } from '@/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import { useUnit } from '@/context/UnitContext';

function FiveDayForecast() {
    const { data: fiveDayForecast } = useFiveDayForecast();
    const { unit } = useUnit();

    const { city, list } = fiveDayForecast || {};

    if (!fiveDayForecast || !city || !list) {
        return (
            <div className="pt-7 pb-6 px-4 border rounded-lg flex flex-1 flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none overflow-hidden">
                <div className="top">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <div className="forecast-list pt-3">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className='daily-forecast py-3 flex flex-col justify-evenly border-b-2'>
                                <Skeleton className="h-6 w-12 mb-2" />
                                <div className='flex flex-1 items-center justify-between gap-4'>
                                    <Skeleton className="h-6 w-12" />
                                    <Skeleton className="h-2 w-full rounded-lg" />
                                    <Skeleton className="h-6 w-12" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const processData = (dailyData: ForecastItem[]) => {
        let minTemp = Number.MAX_VALUE;
        let maxTemp = Number.MIN_VALUE;

        dailyData.forEach((day: ForecastItem) => {
            if (day.main.temp_min < minTemp) {
                minTemp = day.main.temp_min;
            }
            if (day.main.temp_max > maxTemp) {
                maxTemp = day.main.temp_max;
            }
        });

        return {
            day: unixToDay(dailyData[0].dt),
            minTemp, maxTemp
        };
    };

    const dailyForecasts = [];

    for (let i = 0; i < 40; i += 8) {
        const dailyData = list.slice(i, i + 8);
        dailyForecasts.push(processData(dailyData));
    }

    return (
        <div className="
                pt-7 pb-6 px-4
                border rounded-lg flex flex-1 flex-col justify-between
                dark:bg-dark-grey shadow-sm dark:shadow-none">
            <div className="top">
                <h2 className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                    {calender}5-Day Forecast for {city.name}
                </h2>

                <div className="forecast-list pt-3">{
                    dailyForecasts.map((day, index) => {
                        return <div key={index} className='daily-forecast py-4 flex flex-col justify-evenly border-b-2'>
                            <p className='text-2xl min-w-14 text-slate-700 dark:text-slate-300'>{day.day}</p>
                            <p className='text-sm flex justify-between'>
                                <span className='text-blue-500'>(Low)</span>
                                <span className='text-red-500'>(High)</span>
                            </p>

                            <div className='flex flex-1 items-center justify-between gap-4'>
                                <p className="font-bold text-blue-700 dark:text-blue-300">
                                    {convertTemperature(day.minTemp, unit)}°{unit === 'imperial' ? 'F' : 'C'}
                                </p>
                                <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                                <p className="font-bold text-orange-700 dark:text-orange-300">
                                    {convertTemperature(day.maxTemp, unit)}°{unit === 'imperial' ? 'F' : 'C'}
                                </p>
                            </div>
                        </div>
                    })
                }</div>
            </div>
        </div>
    )
}

export default FiveDayForecast
