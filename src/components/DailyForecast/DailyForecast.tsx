"use client"
import { ForecastItem } from '@/types/weather';
import { useForecast, useFiveDayForecast } from '@/hooks/useWeatherData';
import { getWeatherIcon } from '@/utils/weatherUtils';
import { convertTemperature } from '@/utils/misc';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO } from 'date-fns';
import { useUnit } from '@/context/UnitContext';

function DailyForecast() {
    const { data: forecast } = useForecast();
    const { unit } = useUnit();
    const { data: fiveDayForecast } = useFiveDayForecast();

    const { city, list } = fiveDayForecast || {};

    if (!fiveDayForecast || !city || !list || !forecast || !forecast.weather) {
        return (
            <div className='pt-5 px-10 h-42 border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 overflow-hidden'>
                <div className='h-full flex gap-10 overflow-hidden'>
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className='flex flex-col gap-4 basis-34 cursor-grab'>
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-4 w-12 mt-4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const todaysForecast = list.filter(
        (forecastItem: ForecastItem) =>
            forecastItem.dt_txt.startsWith(todayString)
    );

    if (todaysForecast.length < 1) {
        return <Skeleton className='h-42 w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2' />
    }

    return (
        <div className='pt-5 px-10 h-42 border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
            <div className="h-full flex gap-10 overflow-hidden">
                {todaysForecast.length < 1 ? ('') : (
                    <div className='w-full'>
                        <Carousel>
                            <CarouselContent>
                                {todaysForecast.map((forecastItem: ForecastItem) => {
                                    const time = format(parseISO(forecastItem.dt_txt), "HH:mm");
                                    const icon = getWeatherIcon(forecastItem.weather[0].main);

                                    return (
                                        <CarouselItem className='flex flex-col gap-4 basis-34 cursor-grab' key={forecastItem.dt_txt}>
                                            <p className="text-gray-600 dark:text-gray-400">{time}</p>
                                            <p>{icon}</p>
                                            <p className='mt-4 text-sky-700 dark:text-sky-300'>{convertTemperature(forecastItem.main.temp, unit)}°{unit === 'imperial' ? 'F' : 'C'}</p>
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