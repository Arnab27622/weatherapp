/**
 * Search Context
 * Manages the state and logic for city searching, including input debouncing,
 * geocoding API integration, and city selection.
 */

"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchGeoCodedList as fetchGeoCodedListAPI } from "@/services/weatherService"
import defaultStates from "@/utils/defaultStates"

import { GeocodedLocation } from "@/types/weather"
import { SearchContextProps, ProviderProps } from "@/types/context"

import { useLocation } from "./LocationContext"
import { useSearchHistory } from "@/hooks/use-search-history"

const SearchContext = createContext<SearchContextProps | undefined>(undefined)

/**
 * SearchProvider component
 * Provides search-related state (input value, results, loading status) to the application.
 */
export const SearchProvider = ({ children }: ProviderProps) => {
    const [inputValue, setInputValue] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const { setActiveCityCoords } = useLocation()
    const { addToHistory } = useSearchHistory()

    // Debounce search input to avoid excessive API calls
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(inputValue)
        }, 500)
        return () => clearTimeout(handler)
    }, [inputValue])

    const { data: searchResults, isFetching: isSearchFetching } = useQuery({
        queryKey: ["geocodedList", debouncedSearch],
        queryFn: async () => {
            if (!debouncedSearch.trim()) return []
            return await fetchGeoCodedListAPI(debouncedSearch)
        },
        enabled: debouncedSearch.length > 0,
        staleTime: 24 * 60 * 60 * 1000,
    })

    const handleInput = (value: string) => {
        setInputValue(value)
    }

    /**
     * Completes city selection: updates coordinates, clears input, and adds to history
     */
    const handleCitySelection = (item: GeocodedLocation) => {
        setActiveCityCoords([item.lat, item.lon]);
        setInputValue("");
        addToHistory({
            query: inputValue,
            lat: item.lat,
            lon: item.lon,
            name: item.name,
            country: item.country,
            state: item.state,
        });
    };

    const isDebouncing = inputValue !== debouncedSearch
    const isSearchLoading = isSearchFetching || isDebouncing

    const geoCodedList = (inputValue.trim() === "")
        ? defaultStates
        : (searchResults || [])

    return (
        <SearchContext.Provider value={{
            inputValue,
            setInputValue,
            handleInput,
            geoCodedList,
            isSearchLoading,
            handleCitySelection
        }}>
            {children}
        </SearchContext.Provider>
    )
}

/**
 * Custom hook to consume the SearchContext
 * @throws Error if used outside of a SearchProvider
 */
export const useSearch = () => {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider")
    }
    return context
}
