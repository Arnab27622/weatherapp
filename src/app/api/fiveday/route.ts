import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/utils/logger";

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

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const dailyRes = await fetch(url, {
            next: { revalidate: 3600 }
        });

        const dailyData = await dailyRes.json();
        return NextResponse.json(dailyData);

    } catch (error) {
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");
        logger.apiError("/api/fiveday", error, { lat: lat || undefined, lon: lon || undefined });
        return NextResponse.json(
            { error: "Error in getting the daily data" },
            { status: 500 }
        );
    }
};