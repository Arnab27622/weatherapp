"use client";

import { Mapbox } from '../Mapbox/MapboxWrapper';
import defaultStates from '@/utils/defaultStates';
import { useLocation } from '@/context/LocationContext';


function Cities() {
    const { setActiveCityCoords } = useLocation();

    const getClickedCityCords = (lat: number, lon: number) => {
        setActiveCityCoords([lat, lon]);

        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="mapbox-con mt-4 pl-1 flex gap-4">
            <Mapbox />
            <div className="states flex flex-col gap-3 flex-1">
                <h2 className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                    Top Large Cities
                </h2>
                <div className="flex flex-col gap-4">
                    {defaultStates.map((state, index) => {
                        // Create a unique color for each city based on index
                        const cityColors = [
                            'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30',
                            'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30',
                            'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30',
                            'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30',
                            'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30',
                            'text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30'
                        ];

                        const colorClass = cityColors[index % cityColors.length];

                        return (
                            <div
                                key={index}
                                className={`border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none transition-colors duration-200 ${colorClass}`}
                                onClick={() => {
                                    getClickedCityCords(state.lat, state.lon);
                                }}>
                                <p className="px-6 py-4 font-medium">{state.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Cities