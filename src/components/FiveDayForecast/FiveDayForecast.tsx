"use client"
import { ForecastItem } from '@/types/weather';
import { useFiveDayForecast } from '@/hooks/useWeatherData';
import { calender } from '@/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton';
import { useUnit } from '@/context/UnitContext';
import { processDailyData } from '@/utils/weatherUtils';
import { DailyForecastItem } from './DailyForecastItem';

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

    const dailyForecasts = [];

    for (let i = 0; i < 40; i += 8) {
        const dailyData = list.slice(i, i + 8);
        dailyForecasts.push(processDailyData(dailyData));
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
                        return (
                            <DailyForecastItem
                                key={index}
                                day={day.day}
                                minTemp={day.minTemp}
                                maxTemp={day.maxTemp}
                                unit={unit}
                            />
                        );
                    })
                }</div>
            </div>
        </div>
    )
}

export default FiveDayForecast
