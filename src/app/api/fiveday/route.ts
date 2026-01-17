import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");
        const apiKey = process.env.OPENWEATHER_API_KEY;

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const dailyRes = await fetch(url, {
            next: { revalidate: 3600 }
        });

        const dailyData = await dailyRes.json();
        return NextResponse.json(dailyData);

    } catch (error) {
        console.log("Error getting daily data.", error);
        return new Response("Error in getting the daily data.", { status: 500 });
    }
};