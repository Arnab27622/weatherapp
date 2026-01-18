/**
 * Context for managing and distributing the user's active location coordinates.
 * Handles automatic geolocation on initial load and provides state for manual updates.
 */

"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { LocationContextProps, ProviderProps } from "@/types/context"

const LocationContext = createContext<LocationContextProps | undefined>(undefined)

/**
 * Provider component that wraps the application to provide location state.
 * Defaults to Kolkata (22.5697, 88.3697) if geolocation is unavailable or denied.
 */
export const LocationProvider = ({ children }: ProviderProps) => {
    const [activeCityCoords, setActiveCityCoords] = useState<number[]>([22.5697, 88.3697]) // Default Kolkata

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setActiveCityCoords([position.coords.latitude, position.coords.longitude])
                },
                (error) => {
                    console.error("Error getting location:", error.message)
                }
            )
        }
    }, [])

    return (
        <LocationContext.Provider value={{ activeCityCoords, setActiveCityCoords }}>
            {children}
        </LocationContext.Provider>
    )
}

/**
 * Custom hook to access the LocationContext.
 * Must be used within a LocationProvider.
 * @throws Error if used outside of LocationProvider
 */
export const useLocation = () => {
    const context = useContext(LocationContext)
    if (!context) {
        throw new Error("useLocation must be used within a LocationProvider")
    }
    return context
}
