import { fromUnixTime, format } from "date-fns";

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const unixToTime = (unix: number, timezone: number) => {
  // Use Intl.DateTimeFormat with UTC to skip local timezone interference after adding the offset
  const date = new Date((unix + timezone) * 1000);
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  }).format(date);
};

export const unixToDay = (unix: number) => {
  return format(fromUnixTime(unix), "eee");
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


