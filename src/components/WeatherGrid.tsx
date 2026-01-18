"use client";

import AirPollution from "@/components/AirPollution/AirPollution";
import Sunset from "@/components/Sunset/Sunset";
import Wind from "@/components/Wind/Wind";
import DailyForecast from "@/components/DailyForecast/DailyForecast";
import UvIndex from "@/components/UvIndex/UvIndex";
import Population from "@/components/Population/Population";
import FeelsLike from "@/components/FeelsLike/FeelsLike";
import Humidity from "@/components/Humidity/Humidity";
import Visibility from "@/components/Visibility/Visibility";
import Pressure from "@/components/Pressure/Pressure";

const WeatherGrid = () => {
    return (
        <div className="instruments grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
        </div>
    );
};

export default WeatherGrid;

