"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Unit, UnitContextProps, ProviderProps } from "@/types/context";

const UnitContext = createContext<UnitContextProps | undefined>(undefined);

export const UnitProvider = ({ children }: ProviderProps) => {
    const [unit, setUnit] = useState<Unit>("metric");

    useEffect(() => {
        // Ideally persist to localstorage
        const savedUnit = localStorage.getItem("weather-app-unit") as Unit;
        if (savedUnit) {
            setUnit(savedUnit);
        }
    }, []);

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

export const useUnit = () => {
    const context = useContext(UnitContext);
    if (!context) {
        throw new Error("useUnit must be used within a UnitProvider");
    }
    return context;
};
