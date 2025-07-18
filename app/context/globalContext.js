"use client"

import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import defaultStates from '../utils/defaultStates';
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [fiveDayForecast, setFiveDayForecast] = useState({});
    const [uvIndex, setUVIndex] = useState({});
    const [geoCodedList, setGeoCodedList] = useState(defaultStates);
    const [inputValue, setInputValue] = useState('');
    const [activeCityCoords, setActiveCityCoords] = useState([]);

    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setActiveCityCoords([
                        position.coords.latitude,
                        position.coords.longitude
                    ]);
                },
                (error) => {
                    console.error("Error getting location:", error.message);
                    setActiveCityCoords([22.5697, 88.3697]);
                }
            );
        } else {
            setActiveCityCoords([22.5697, 88.3697]);
        }
    }

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const fetchForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
            setForecast(res.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error.message);
        }
    };

    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
            setAirQuality(res.data);
        } catch (error) {
            console.log("Error fetching air quality: ", error.message);
        }
    };

    const fetchFiveDayForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
            setFiveDayForecast(res.data);
        } catch (error) {
            console.log("Error fetching 5-day forecast: ", error.message);
        }
    };

    const fetchGeoCodedList = async (search) => {
        try {
            if (!search.trim()) {
                setGeoCodedList(defaultStates);
                return;
            }

            const res = await axios.get(`/api/geocoded?search=${search}`);
            setGeoCodedList(res.data);
        } catch (error) {
            console.log("Error fetching locations: ", error.message);
            setGeoCodedList([]);
        }
    }

    const fetchUVIndex = async (lat, lon) => {
        try {
            const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
            setUVIndex(res.data);
        } catch (error) {
            console.log("Error fetching UV index: ", error.message);
        }
    };

    const handleInput = (e) => {
        const value = e.target.value;
        setInputValue(value);
        fetchGeoCodedList(value);
    };

    useEffect(() => {
        const debouncedFetch = debounce((search) => {
            fetchGeoCodedList(search);
        }, 500);

        if (inputValue) {
            debouncedFetch(inputValue);
        }

        return () => {
            debouncedFetch.cancel();
        }
    }, [inputValue])

    useEffect(() => {
        const [lat, lon] = activeCityCoords;
        if (lat != null && lon != null) {
            fetchForecast(lat, lon);
            fetchAirQuality(lat, lon);
            fetchFiveDayForecast(lat, lon);
            fetchUVIndex(lat, lon);
        }
    }, [activeCityCoords]);

    return (
        <GlobalContext.Provider value={{
            forecast,
            airQuality,
            fiveDayForecast,
            uvIndex,
            geoCodedList,
            inputValue,
            setInputValue,
            handleInput
        }}>
            <GlobalContextUpdate.Provider value={{
                setActiveCityCoords
            }}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);