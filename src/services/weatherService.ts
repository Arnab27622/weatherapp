/**
 * Service layer for interacting with the application's internal API routes.
 * These functions wrap axios calls to the Next.js API endpoints.
 */

import axios from "axios";
import { Forecast, AirQuality, FiveDayForecast, UvIndex, GeocodedLocation } from "../types/weather";

/**
 * Fetches current weather forecast for specific coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Promise resolving to Forecast data
 */
export const fetchForecast = async (lat: number, lon: number): Promise<Forecast> => {
    const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
    return res.data;
};

/**
 * Fetches air quality/pollution data for specific coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Promise resolving to AirQuality data
 */
export const fetchAirQuality = async (lat: number, lon: number): Promise<AirQuality> => {
    const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
    return res.data;
};

/**
 * Fetches 5-day weather forecast for specific coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Promise resolving to FiveDayForecast data
 */
export const fetchFiveDayForecast = async (lat: number, lon: number): Promise<FiveDayForecast> => {
    const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
    return res.data;
};

/**
 * Fetches UV Index data for specific coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Promise resolving to UvIndex data
 */
export const fetchUvIndex = async (lat: number, lon: number): Promise<UvIndex> => {
    const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
    return res.data;
};

/**
 * Fetches a list of geocoded locations based on a search string
 * @param search - City name or search query
 * @returns Promise resolving to an array of GeocodedLocation objects
 */
export const fetchGeoCodedList = async (search: string): Promise<GeocodedLocation[]> => {
    const res = await axios.get(`/api/geocoded?search=${search}`);
    return res.data;
};
