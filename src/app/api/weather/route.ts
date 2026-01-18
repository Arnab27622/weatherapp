/**
 * API Route: /api/weather
 * Proxy for OpenWeatherMap Current Weather API to keep API keys secure on the server.
 */

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/utils/logger";

/**
 * Handles GET requests to fetch current weather data
 * @param req - The incoming NextRequest containing 'lat' and 'lon' search parameters
 * @returns NextResponse with weather data or error message
 */
export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");
        const apiKey = process.env.OPENWEATHER_API_KEY;

        if (!apiKey) {
            logger.error("OpenWeather API key is missing");
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const res = await axios.get(url);

        return NextResponse.json(res.data);
    } catch (error) {
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");
        logger.apiError("/api/weather", error, { lat: lat || undefined, lon: lon || undefined });
        return NextResponse.json(
            { error: "Error fetching the forecast data" },
            { status: 500 }
        );
    }
};