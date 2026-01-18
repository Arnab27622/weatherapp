import { MouseEvent } from "react";
import { GeocodedLocation } from "./weather";

export interface SearchHistoryItem {
    id: string;
    query: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    searchedAt: number;
}

export interface SearchResultsListProps {
    geoCodedList?: GeocodedLocation[];
    hoveredIndex: number;
    setHoveredIndex: (index: number) => void;
    handleCitySelection: (item: GeocodedLocation) => void;
    inputValue: string;
}

export interface SearchHistoryListProps {
    history: SearchHistoryItem[];
    hoveredIndex: number;
    setHoveredIndex: (index: number) => void;
    handleCitySelection: (item: GeocodedLocation) => void;
    handleDeleteHistoryItem: (
        e: MouseEvent<HTMLButtonElement>,
        id: string
    ) => void;
    clearHistory: () => void;
}
