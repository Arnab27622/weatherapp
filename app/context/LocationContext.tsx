"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface LocationContextProps {
    activeCityCoords: number[]
    setActiveCityCoords: React.Dispatch<React.SetStateAction<number[]>>
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined)

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
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

export const useLocation = () => {
    const context = useContext(LocationContext)
    if (!context) {
        throw new Error("useLocation must be used within a LocationProvider")
    }
    return context
}
