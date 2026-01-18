/**
 * Miscellaneous utility functions for unit conversions, formatting, and date manipulation
 */

import { fromUnixTime, format } from "date-fns";

/**
 * Converts Kelvin temperature to Celsius
 * @param kelvin - Temperature in Kelvin
 * @returns Temperature in Celsius rounded to nearest integer
 */
export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

/**
 * Converts Kelvin temperature to Fahrenheit
 * @param kelvin - Temperature in Kelvin
 * @returns Temperature in Fahrenheit rounded to nearest integer
 */
export const kelvinToFahrenheit = (kelvin: number) => {
  return Math.round((kelvin - 273.15) * (9 / 5) + 32);
};

/**
 * Converts temperature based on selected unit
 * @param kelvin - Temperature in Kelvin
 * @param unit - Target unit system ('metric' for °C, 'imperial' for °F)
 * @returns Formatted temperature value
 */
export const convertTemperature = (kelvin: number, unit: "metric" | "imperial") => {
  if (unit === "imperial") {
    return kelvinToFahrenheit(kelvin);
  }
  return kelvinToCelsius(kelvin);
};

/**
 * Converts wind speed based on selected unit
 * @param speedMps - Wind speed in meters per second
 * @param unit - Target unit system ('metric' for m/s, 'imperial' for mph)
 * @returns Formatted wind speed value
 */
export const convertWindSpeed = (speedMps: number, unit: "metric" | "imperial") => {
  if (unit === "imperial") {
    // m/s to mph
    return Math.round(speedMps * 2.23694);
  }
  // Metric is usually m/s or km/h. Keeping m/s as requested in prompt "Metric (°C, m/s)"
  return Math.round(speedMps);
};

/**
 * Converts Unix timestamp to a localized time string
 * @param unix - Unix timestamp in seconds
 * @param timezone - Timezone offset in seconds
 * @returns Formatted time string (HH:MM)
 */
export const unixToTime = (unix: number, timezone: number) => {
  // Use Intl.DateTimeFormat with UTC to skip local timezone interference after adding the offset
  const date = new Date((unix + timezone) * 1000);
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  }).format(date);
};

/**
 * Converts Unix timestamp to a shorthand day name
 * @param unix - Unix timestamp in seconds
 * @returns Day name (e.g., "Mon", "Tue")
 */
export const unixToDay = (unix: number) => {
  return format(fromUnixTime(unix), "eee");
};

/**
 * Formats large numbers with suffixes (K for thousands, M for millions)
 * @param num - Number to format
 * @returns Formatted string or original number
 */
export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};


