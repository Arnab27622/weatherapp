import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/utils/logger";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const city = searchParams.get("search");

        if (!apiKey) {
            logger.error("OpenWeather API key is missing");
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
        }

        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        const searchParams = req.nextUrl.searchParams;
        const city = searchParams.get("search");
        logger.apiError("/api/geocoded", error, { city: city || undefined });
        return NextResponse.json(
            { error: "Error fetching geocoded data" },
            { status: 500 }
        );
    }
}