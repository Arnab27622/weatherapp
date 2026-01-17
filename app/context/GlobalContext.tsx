"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import defaultStates from "../utils/defaultStates"
import { useQuery } from "@tanstack/react-query"
import {
    fetchForecast,
    fetchAirQuality,
    fetchFiveDayForecast,
    fetchUvIndex,
    fetchGeoCodedList as fetchGeoCodedListAPI
} from "../services/weatherService"
import { toast } from "sonner"

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Forecast {
    coord: { lon: number; lat: number };
    weather: Weather[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };
    visibility: number;
    wind: { speed: number; deg: number; gust?: number };
    clouds: { all: number };
    dt: number;
    sys: {
        type?: number;
        id?: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        temp_kf?: number;
    };
    weather: Weather[];
    clouds: { all: number };
    wind: { speed: number; deg: number; gust?: number };
    visibility: number;
    pop: number;
    rain?: { "3h": number };
    sys: { pod: string };
    dt_txt: string;
}

export interface FiveDayForecast {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: {
        id: number;
        name: string;
        coord: { lat: number; lon: number };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

export interface AirQuality {
    coord: number[];
    list: {
        dt: number;
        main: { aqi: number };
        components: {
            co: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            nh3: number;
        };
    }[];
}

export interface UvIndex {
    lat: number;
    lon: number;
    date_iso: string;
    date: number;
    result: {
        uv: number;
    }; // Matching the component's uvIndex.result.uv usage
}

export interface GlobalContextProps {
    forecast: Partial<Forecast>
    airQuality: Partial<AirQuality>
    fiveDayForecast: Partial<FiveDayForecast>
    uvIndex: Partial<UvIndex>
    geoCodedList: {
        name: string;
        country: string;
        state: string;
        lat: number;
        lon: number;
    }[]
    inputValue: string
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    setActiveCityCoords: React.Dispatch<React.SetStateAction<number[]>>
    isSearchLoading: boolean
    isDebouncing: boolean
}

const GlobalContext = createContext<GlobalContextProps>({
    forecast: {},
    airQuality: {},
    fiveDayForecast: {},
    uvIndex: {},
    geoCodedList: defaultStates,
    inputValue: "",
    setInputValue: () => { },
    handleInput: () => { },
    setActiveCityCoords: () => { },
    isSearchLoading: false,
    isDebouncing: false,
})

const GlobalContextUpdate = createContext<{
    setActiveCityCoords: React.Dispatch<React.SetStateAction<number[]>>
} | null>(null)

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [inputValue, setInputValue] = useState("")
    const [activeCityCoords, setActiveCityCoords] = useState<number[]>([])

    // Get Current Location
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setActiveCityCoords([position.coords.latitude, position.coords.longitude])
                },
                (error) => {
                    console.error("Error getting location:", error.message)
                    // Default to Kolkata
                    setActiveCityCoords([22.5697, 88.3697])
                }
            )
        } else {
            setActiveCityCoords([22.5697, 88.3697])
        }
    }, [])

    const [lat, lon] = activeCityCoords

    // React Query Implementations
    const { data: forecast } = useQuery({
        queryKey: ["forecast", lat, lon],
        queryFn: () => fetchForecast(lat, lon),
        enabled: !!lat && !!lon,
    })

    const { data: airQuality, isError: isErrorAirQuality } = useQuery({
        queryKey: ["airQuality", lat, lon],
        queryFn: () => fetchAirQuality(lat, lon),
        enabled: !!lat && !!lon,
    })

    const { data: fiveDayForecast, isError: isErrorFiveDay } = useQuery({
        queryKey: ["fiveDayForecast", lat, lon],
        queryFn: () => fetchFiveDayForecast(lat, lon),
        enabled: !!lat && !!lon,
    })

    const { data: uvIndex, isError: isErrorUv } = useQuery({
        queryKey: ["uvIndex", lat, lon],
        queryFn: () => fetchUvIndex(lat, lon),
        enabled: !!lat && !!lon,
    })

    // Notify about errors
    useEffect(() => {
        if (isErrorAirQuality || isErrorFiveDay || isErrorUv) {
            toast.error("Could not fetch some weather data. Please try again later.")
        }
    }, [isErrorAirQuality, isErrorFiveDay, isErrorUv])

    // Search Geocoded List
    const fetchGeoCodedList = async (search: string) => {
        if (!search.trim()) return defaultStates
        const res = await fetchGeoCodedListAPI(search)
        return res
    }



    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    // Debounce input to prevent excessive refetches (handled by UI input + debounce here or just debounced state?)
    // The previous implementation debounced the FETCH call. 
    // Since useQuery depends on `inputValue`, we should probably debounce the state update OR use a debounced value for the query key.
    // For simplicity with the existing UI, let's keep the handleInput direct and maybe use a debounced hook for the query key if performance is bad, 
    // but the previous code had an explicit debounce.
    // Let's replicate the debounce behavior for the search query.

    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(inputValue)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [inputValue])

    const { data: searchResults, isFetching: isSearchFetching } = useQuery({
        queryKey: ["geocodedList", debouncedSearch],
        queryFn: () => fetchGeoCodedList(debouncedSearch),
        initialData: defaultStates,
        enabled: true,
    })

    const isDebouncing = inputValue !== debouncedSearch;
    const isSearchLoading = isSearchFetching || isDebouncing;

    // Use searchResults or defaultStates based on input
    const finalGeoCodedList = (inputValue.trim() === "" && debouncedSearch === "")
        ? defaultStates
        : (searchResults || defaultStates)


    return (
        <GlobalContext.Provider
            value={{
                forecast: forecast || {},
                airQuality: airQuality || {},
                fiveDayForecast: fiveDayForecast || {},
                uvIndex: uvIndex || {},
                geoCodedList: finalGeoCodedList,
                inputValue,
                setInputValue,
                handleInput,
                setActiveCityCoords,
                isSearchLoading,
                isDebouncing,
            }}
        >
            <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => {
    const context = useContext(GlobalContextUpdate);
    if (context === null) {
        throw new Error("useGlobalContextUpdate must be used within a GlobalContextProvider");
    }
    return context;
};
