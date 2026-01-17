import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/utils/logger";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { contents } = body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            logger.error("Gemini API key is not configured");
            return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            logger.apiError("/api/chat", new Error(`Gemini API error: ${response.status}`), {
                status: response.status,
                errorData
            });
            return NextResponse.json(
                { error: errorData.error?.message || `API error: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        logger.apiError("/api/chat", error);
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
