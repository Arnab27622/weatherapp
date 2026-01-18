export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Forecast {
    coord: { lon: number; lat: number };
    weather: Weather[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };
    visibility: number;
    wind: { speed: number; deg: number; gust?: number };
    clouds: { all: number };
    dt: number;
    sys: {
        type?: number;
        id?: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        temp_kf?: number;
    };
    weather: Weather[];
    clouds: { all: number };
    wind: { speed: number; deg: number; gust?: number };
    visibility: number;
    pop: number;
    rain?: { "3h": number };
    sys: { pod: string };
    dt_txt: string;
}

export interface FiveDayForecast {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: {
        id: number;
        name: string;
        coord: { lat: number; lon: number };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

export interface AirQuality {
    coord: number[];
    list: {
        dt: number;
        main: { aqi: number };
        components: {
            co: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            nh3: number;
        };
    }[];
}

export interface UvIndex {
    lat: number;
    lon: number;
    date_iso: string;
    date: number;
    result: {
        uv: number;
    };
}

export interface GeocodedLocation {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface AirQualityIndexItem {
    rating: number;
    description: string;
    color: string;
}
