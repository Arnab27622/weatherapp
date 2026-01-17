import {
  Command,
  Github,
  Search,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudSun,
  CloudFog,
  Cloudy,
  CloudLightning,
  Navigation,
  ThermometerSun,
  Sunset,
  Wind,
  Gauge,
  Droplets,
  Thermometer,
  Eye,
  UsersRound,
  CalendarDays,
  SunDim,
} from "lucide-react";

// Weather condition icons
export const drizzleIcon = <CloudDrizzle className="text-blue-400 dark:text-blue-300" size={25} />;
export const rain = <CloudRain className="text-blue-500 dark:text-blue-400" size={30} />;
export const snow = <Snowflake className="text-cyan-400 dark:text-cyan-300" size={30} />;
export const clearSky = <CloudSun className="text-amber-500 dark:text-amber-400" size={30} />;
export const cloudFog = <CloudFog className="text-gray-500 dark:text-gray-400" size={30} />;
export const cloudy = <Cloudy className="text-slate-500 dark:text-slate-400" size={30} />;
export const cloudLightning = <CloudLightning className="text-yellow-500 dark:text-yellow-400" size={30} />;

// UI icons
export const commandIcon = <Command className="text-gray-700 dark:text-gray-300" size={14} />;
export const github = <Github className="text-white dark:text-black" size={20} />;
export const searchIcon = <Search className="text-gray-700 dark:text-gray-300" />;

// Weather data icons
export const navigation = <Navigation className="text-blue-600 dark:text-blue-400" size={15} />;
export const thermo = <ThermometerSun className="text-orange-600 dark:text-orange-400" size={15} />;
export const sunset = <Sunset className="text-orange-500 dark:text-orange-400" size={15} />;
export const wind = <Wind className="text-blue-500 dark:text-blue-400" size={15} />;
export const gauge = <Gauge className="text-indigo-600 dark:text-indigo-400" size={15} />;
export const droplets = <Droplets className="text-blue-500 dark:text-blue-400" size={15} />;
export const thermometer = <Thermometer className="text-amber-600 dark:text-amber-400" size={15} />;
export const eye = <Eye className="text-sky-600 dark:text-sky-400" size={15} />;
export const people = <UsersRound className="text-purple-600 dark:text-purple-400" size={15} />;
export const calender = <CalendarDays className="text-slate-600 dark:text-slate-400" size={15} />;
export const sun = <SunDim className="text-amber-500 dark:text-amber-400" size={15} />;