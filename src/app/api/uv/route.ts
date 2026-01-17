import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");
        const apikey = process.env.OPENUV_API_KEY;
        if (typeof apikey === 'undefined') {
            console.error("🔑 OPENUV API key is missing!");
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
        }

        const url = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}&alt=100&dt=`;

        const headers = new Headers();
        headers.append("x-access-token", apikey);
        headers.append("Content-Type", "application/json");

        const res = await fetch(url, {
            method: 'GET',
            headers: headers,
            next: { revalidate: 900 }
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("OpenUV API error:", errorData);
            return new Response(`OpenUV API error: ${errorData.error}`, {
                status: res.status
            });
        }

        const uvData = await res.json();
        return NextResponse.json(uvData);
    } catch (error) {
        console.log("Error getting UV data", error);
        return new Response("Error getting UV data", { status: 500 });
    }
};