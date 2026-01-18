/**
 * Unit Context
 * Manages the temperature unit preference (Metric vs Imperial) across the application.
 * Persists the user's choice to local storage for consistency across sessions.
 */

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Unit, UnitContextProps, ProviderProps } from "@/types/context";

const UnitContext = createContext<UnitContextProps | undefined>(undefined);

/**
 * UnitProvider component
 * Syncs the temperature unit state with local storage.
 */
export const UnitProvider = ({ children }: ProviderProps) => {
    const [unit, setUnit] = useState<Unit>("metric");

    useEffect(() => {
        // Hydrate unit preference from local storage on mount
        const savedUnit = localStorage.getItem("weather-app-unit") as Unit;
        if (savedUnit) {
            setUnit(savedUnit);
        }
    }, []);

    /**
     * Toggles between 'metric' (°C, m/s) and 'imperial' (°F, mph)
     */
    const toggleUnit = () => {
        setUnit((prev) => {
            const newUnit = prev === "metric" ? "imperial" : "metric";
            localStorage.setItem("weather-app-unit", newUnit);
            return newUnit;
        });
    };

    return (
        <UnitContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </UnitContext.Provider>
    );
};

/**
 * Custom hook to consume the UnitContext
 * @throws Error if used outside of a UnitProvider
 */
export const useUnit = () => {
    const context = useContext(UnitContext);
    if (!context) {
        throw new Error("useUnit must be used within a UnitProvider");
    }
    return context;
};
