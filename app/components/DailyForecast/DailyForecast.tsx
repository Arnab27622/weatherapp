"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { clearSky, cloudFog, cloudLightning, cloudy, drizzleIcon, rain, snow } from '@/app/utils/Icons';
import { kelvinToCelsius } from '@/app/utils/misc';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React from 'react'

function DailyForecast() {
    const { forecast, fiveDayForecast } = useGlobalContext();

    const { city, list } = fiveDayForecast;

    if (!fiveDayForecast || !city || !list || !forecast || !forecast.weather) {
        return <Skeleton className='h-[12rem] w-full' />;
    }

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const todaysForecast = list.filter(
        (forecastItem: { dt_txt: string }) =>
            forecastItem.dt_txt.startsWith(todayString)
    );

    if (todaysForecast.length < 1) {
        return <Skeleton className='h-[10.5rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2' />
    }

    const getIcon = (weatherMain: string) => {
        switch (weatherMain) {
            case "Drizzle":
                return drizzleIcon;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Atmosphere":
                return cloudFog;
            case "Clouds":
                return cloudy;
            case "Thunderstorm":
                return cloudLightning;
            default:
                return clearSky;
        }
    };

    return (
        <div className='pt-5 px-10 h-[10.5rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
            <div className="h-full flex gap-10 overflow-hidden">
                {todaysForecast.length < 1 ? ('') : (
                    <div className='w-full'>
                        <Carousel>
                            <CarouselContent>
                                {todaysForecast.map((forecastItem: any) => {
                                    const time = moment(forecastItem.dt_txt).format("HH:mm");
                                    const temp = kelvinToCelsius(forecastItem.main.temp);
                                    const icon = getIcon(forecastItem.weather[0].main);

                                    return (
                                        <CarouselItem className='flex flex-col gap-4 basis-[8.5rem] cursor-grab' key={forecastItem.dt_txt}>
                                            <p className="text-gray-600 dark:text-gray-400">{time}</p>
                                            <p>{icon}</p>
                                            <p className='mt-4 text-sky-700 dark:text-sky-300'>{temp}°C</p>
                                        </CarouselItem>
                                    );
                                })}
                            </CarouselContent>
                        </Carousel>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DailyForecast