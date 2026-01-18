/**
 * Utility functions for weather data processing and visualization
 */

import { ForecastItem } from "@/types/weather";
import {
    clearSky,
    cloudFog,
    cloudLightning,
    cloudy,
    drizzleIcon,
    rain,
    snow,
} from "@/utils/Icons";
import { unixToDay } from "@/utils/misc";

/**
 * Returns the appropriate icon component based on the weather condition string
 * @param weatherMain - The main weather condition (e.g., "Rain", "Clouds", "Clear")
 * @returns React node representing the weather icon
 */
export const getWeatherIcon = (weatherMain: string) => {
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

/**
 * Processes a list of forecast items for a single day to extract min/max temperatures
 * @param dailyData - Array of forecast items for a specific day
 * @returns Object containing the day name, minimum temperature, and maximum temperature
 */
export const processDailyData = (dailyData: ForecastItem[]) => {
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
        minTemp,
        maxTemp,
    };
};
