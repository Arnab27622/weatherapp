import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        const city = searchParams.get("search");

        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        console.log('Error fetching geocoded data', error);
        return new Response("Error fetching geocoded data", {
            status: 500,
        });
    }
}