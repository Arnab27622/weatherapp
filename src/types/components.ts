import { Unit } from "./context";

export interface DailyForecastItemProps {
    day: string;
    minTemp: number;
    maxTemp: number;
    unit: Unit;
}
