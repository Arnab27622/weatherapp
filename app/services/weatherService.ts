import axios from "axios";

export const fetchForecast = async (lat: number, lon: number) => {
    const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
    return res.data;
};

export const fetchAirQuality = async (lat: number, lon: number) => {
    const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
    return res.data;
};

export const fetchFiveDayForecast = async (lat: number, lon: number) => {
    const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
    return res.data;
};

export const fetchUvIndex = async (lat: number, lon: number) => {
    const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
    return res.data;
};

export const fetchGeoCodedList = async (search: string) => {
    const res = await axios.get(`/api/geocoded?search=${search}`);
    return res.data;
};
