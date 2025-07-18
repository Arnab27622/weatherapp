import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};

export const airQualityIndexText = [
  {
    rating: 10,
    description: "excellent",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    rating: 20,
    description: "good",
    color: "text-green-600 dark:text-green-400",
  },
  {
    rating: 30,
    description: "satisfactory",
    color: 'text-lime-600 dark:text-lime-400',
  },
  {
    rating: 40,
    description: "fair",
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    rating: 50,
    description: "moderate",
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    rating: 60,
    description: "moderate",
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    rating: 70,
    description: "poor",
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    rating: 80,
    description: "poor",
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    rating: 90,
    description: "very poor",
    color: 'text-red-600 dark:text-red-400',
  },
  {
    rating: 100,
    description: "very poor",
    color: 'text-red-600 dark:text-red-400',
  },
];
