/**
 * Default list of cities used for initial search suggestions and fallback options.
 * Each entry contains the city name, country code, state name, and geographic coordinates.
 */
const defaultStates = [
  {
    name: "Kolkata",
    country: "IN",
    state: "West Bengal",
    lat: 22.5697,
    lon: 88.3697,
  },
  {
    name: "New York",
    country: "US",
    state: "New York",
    lat: 40.7128,
    lon: -74.0060,
  },
  {
    name: "London",
    country: "GB",
    state: "England",
    lat: 51.5074,
    lon: -0.1278,
  },
  {
    name: "Tokyo",
    country: "JP",
    state: "Tokyo Metropolis",
    lat: 35.6895,
    lon: 139.6917,
  },
  {
    name: "Paris",
    country: "FR",
    state: "Île-de-France",
    lat: 48.8566,
    lon: 2.3522,
  },
  {
    name: "Singapore",
    country: "SG",
    state: "Singapore",
    lat: 1.3521,
    lon: 103.8198,
  }
];

export default defaultStates;
