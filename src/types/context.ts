import { Dispatch, SetStateAction, ReactNode } from "react";
import { GeocodedLocation } from "./weather";

export type Unit = "metric" | "imperial";

export interface UnitContextProps {
    unit: Unit;
    toggleUnit: () => void;
}

export interface LocationContextProps {
    activeCityCoords: number[];
    setActiveCityCoords: Dispatch<SetStateAction<number[]>>;
}

export interface SearchContextProps {
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    handleInput: (value: string) => void;
    geoCodedList: GeocodedLocation[];
    isSearchLoading: boolean;
    handleCitySelection: (item: GeocodedLocation) => void;
}

export interface ProviderProps {
    children: ReactNode;
}
