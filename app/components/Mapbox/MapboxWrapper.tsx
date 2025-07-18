"use client";
import dynamic from "next/dynamic";

export const Mapbox = dynamic(
    () => import("./Mapbox"),
    { ssr: false }
);