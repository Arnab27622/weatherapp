"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchGeoCodedList as fetchGeoCodedListAPI } from "../services/weatherService"
import defaultStates from "../utils/defaultStates"

import { GeocodedLocation } from "../types/weather"

interface SearchContextProps {
    inputValue: string
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    geoCodedList: GeocodedLocation[]
    isSearchLoading: boolean
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [inputValue, setInputValue] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(inputValue)
        }, 500)
        return () => clearTimeout(handler)
    }, [inputValue])

    const { data: searchResults, isFetching: isSearchFetching } = useQuery({
        queryKey: ["geocodedList", debouncedSearch],
        queryFn: async () => {
            if (!debouncedSearch.trim()) return defaultStates
            return await fetchGeoCodedListAPI(debouncedSearch)
        },
        initialData: defaultStates,
        enabled: true,
        staleTime: 24 * 60 * 60 * 1000, // Search results can be cached for a long time
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const isDebouncing = inputValue !== debouncedSearch
    const isSearchLoading = isSearchFetching || isDebouncing

    const geoCodedList = (inputValue.trim() === "" && debouncedSearch === "")
        ? defaultStates
        : (searchResults || defaultStates)

    return (
        <SearchContext.Provider value={{
            inputValue,
            setInputValue,
            handleInput,
            geoCodedList,
            isSearchLoading
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider")
    }
    return context
}
