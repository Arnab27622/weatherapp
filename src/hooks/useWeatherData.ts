"use client"

import { useQuery } from "@tanstack/react-query"
import { useLocation } from "@/context/LocationContext"
import {
    fetchForecast,
    fetchAirQuality,
    fetchFiveDayForecast,
    fetchUvIndex
} from "@/services/weatherService"

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const GC_TIME = 10 * 60 * 1000;   // 10 minutes

export const useForecast = () => {
    const { activeCityCoords } = useLocation();
    const [lat, lon] = activeCityCoords;

    return useQuery({
        queryKey: ["forecast", lat, lon],
        queryFn: () => fetchForecast(lat, lon),
        enabled: !!lat && !!lon,
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
    });
};

export const useAirQuality = () => {
    const { activeCityCoords } = useLocation();
    const [lat, lon] = activeCityCoords;

    return useQuery({
        queryKey: ["airQuality", lat, lon],
        queryFn: () => fetchAirQuality(lat, lon),
        enabled: !!lat && !!lon,
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
    });
};

export const useFiveDayForecast = () => {
    const { activeCityCoords } = useLocation();
    const [lat, lon] = activeCityCoords;

    return useQuery({
        queryKey: ["fiveDayForecast", lat, lon],
        queryFn: () => fetchFiveDayForecast(lat, lon),
        enabled: !!lat && !!lon,
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
    });
};

export const useUvIndex = () => {
    const { activeCityCoords } = useLocation();
    const [lat, lon] = activeCityCoords;

    return useQuery({
        queryKey: ["uvIndex", lat, lon],
        queryFn: () => fetchUvIndex(lat, lon),
        enabled: !!lat && !!lon,
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
    });
};
