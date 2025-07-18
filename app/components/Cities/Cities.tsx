"use client";

import React from 'react'
import { Mapbox } from '../Mapbox/MapboxWrapper';
import defaultStates from '@/app/utils/defaultStates';
import { useGlobalContextUpdate } from '@/app/context/globalContext';


function Cities() {
    const { setActiveCityCoords } = useGlobalContextUpdate();

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
                <h2 className="flex items-center gap-2 font-medium">
                    Top Large Cities
                </h2>
                <div className="flex flex-col gap-4">
                    {
                        defaultStates.map((state, index) => {
                            return <div key={index} className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                                onClick={() => {
                                    getClickedCityCords(state.lat, state.lon);
                                }}>
                                <p className="px-6 py-4">{state.name}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Cities
