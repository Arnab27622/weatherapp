import { convertTemperature } from "@/utils/misc";
import { DailyForecastItemProps } from "@/types/components";

export const DailyForecastItem = ({
    day,
    minTemp,
    maxTemp,
    unit,
}: DailyForecastItemProps) => {
    return (
        <div className="daily-forecast py-4 flex flex-col justify-evenly border-b-2">
            <p className="text-2xl min-w-14 text-slate-700 dark:text-slate-300">
                {day}
            </p>
            <p className="text-sm flex justify-between">
                <span className="text-blue-500">(Low)</span>
                <span className="text-red-500">(High)</span>
            </p>

            <div className="flex flex-1 items-center justify-between gap-4">
                <p className="font-bold text-blue-700 dark:text-blue-300">
                    {convertTemperature(minTemp, unit)}°{unit === "imperial" ? "F" : "C"}
                </p>
                <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                <p className="font-bold text-orange-700 dark:text-orange-300">
                    {convertTemperature(maxTemp, unit)}°{unit === "imperial" ? "F" : "C"}
                </p>
            </div>
        </div>
    );
};
