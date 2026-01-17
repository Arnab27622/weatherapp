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

interface GlobalContextProps {
    forecast: any
    airQuality: any
    fiveDayForecast: any
    uvIndex: any
    geoCodedList: any[]
    inputValue: string
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    setActiveCityCoords: React.Dispatch<React.SetStateAction<number[]>>
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
})

const GlobalContextUpdate = createContext<any>(null)

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

    const { data: geoCodedList = defaultStates } = useQuery({
        queryKey: ["geocodedList", inputValue],
        queryFn: () => fetchGeoCodedList(inputValue),
        enabled: true, // Always enabled, will return defaultStates if empty via initialData or inside fetch logic logic
        staleTime: 1000 * 60 * 5, // Cache results for 5 mins
    })

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

    const { data: searchResults } = useQuery({
        queryKey: ["geocodedList", debouncedSearch],
        queryFn: () => fetchGeoCodedList(debouncedSearch),
        initialData: defaultStates,
        enabled: true,
    })

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
            }}
        >
            <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate)
