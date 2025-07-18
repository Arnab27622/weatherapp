"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from '@/app/context/globalContext';

function FlyToActiveCity({ activeCityCoords }: {
    activeCityCoords: {
        lat: number; lon: number
    }
}) {
    const map = useMap();

    useEffect(() => {
        if (activeCityCoords) {
            const zoomLev = 13;
            const flyToOptions = {
                duration: 1.5
            };

            map.flyTo([activeCityCoords.lat, activeCityCoords.lon], zoomLev, flyToOptions);
        }
    }, [activeCityCoords, map]);

    return null;
};

function Mapbox() {
    const { forecast } = useGlobalContext();

    const activeCityCoords = forecast?.coord;

    if (!forecast || !forecast?.coord || !activeCityCoords) {
        return <div>
            <h1>
                Loading...
            </h1>
        </div>
    }

    return (
        <div className='flex-1 basis-[50%] border rounded-lg'>
            <MapContainer center={[activeCityCoords.lat, activeCityCoords.lon]} zoom={13} scrollWheelZoom={false} style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }} className='rounded-lg m-4'>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
                <FlyToActiveCity activeCityCoords={activeCityCoords} />
            </MapContainer>
        </div>
    )
}

export default Mapbox
