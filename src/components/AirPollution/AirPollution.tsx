"use client"

import { useAirQuality } from '@/hooks/useWeatherData';
import { thermo } from '@/utils/Icons';
import { airQualityIndexText } from '@/constants/config';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

function AirPollution() {
    const { data: airQuality } = useAirQuality();

    if (!airQuality || !airQuality.list || !airQuality.list[0] || !airQuality.list[0].main) {
        return (
            <div className='air-pollution pt-6 px-4 h-42 border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 overflow-hidden'>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        )
    }

    const airQualityIndex = airQuality.list[0].main.aqi * 10;

    const filterIndex = airQualityIndexText.find((item) => {
        return item.rating === airQualityIndex;
    });

    return (
        <div className='air-pollution pt-6 px-4 h-42 border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
            <h2 className='flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200'>
                {thermo}Air Pollution
            </h2>
            <Progress value={airQualityIndex} max={100} className='progress' />
            <p className='text-sm'>Air quality is <strong className={`${filterIndex?.color}`}>{filterIndex?.description}</strong>.</p>
        </div>
    )
}

export default AirPollution
