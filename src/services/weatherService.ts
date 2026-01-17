import axios from "axios";
import { Forecast, AirQuality, FiveDayForecast, UvIndex, GeocodedLocation } from "../types/weather";

export const fetchForecast = async (lat: number, lon: number): Promise<Forecast> => {
    const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
    return res.data;
};

export const fetchAirQuality = async (lat: number, lon: number): Promise<AirQuality> => {
    const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
    return res.data;
};

export const fetchFiveDayForecast = async (lat: number, lon: number): Promise<FiveDayForecast> => {
    const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
    return res.data;
};

export const fetchUvIndex = async (lat: number, lon: number): Promise<UvIndex> => {
    const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
    return res.data;
};

export const fetchGeoCodedList = async (search: string): Promise<GeocodedLocation[]> => {
    const res = await axios.get(`/api/geocoded?search=${search}`);
    return res.data;
};
