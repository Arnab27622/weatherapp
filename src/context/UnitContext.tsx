"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Unit = "metric" | "imperial";

interface UnitContextProps {
    unit: Unit;
    toggleUnit: () => void;
}

const UnitContext = createContext<UnitContextProps | undefined>(undefined);

export const UnitProvider = ({ children }: { children: React.ReactNode }) => {
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
