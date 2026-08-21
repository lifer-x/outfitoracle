import type { GeoApiResponse, MeteoApiResponse } from "./types";

export const isGeoApiResponse = (data: unknown): data is GeoApiResponse =>
    typeof data === 'object' &&
    data !== null &&
    'results' in data &&
    Array.isArray(data.results) &&
    'generationtime_ms' in data;


export const isMeteoApiResponse = (data: unknown): data is MeteoApiResponse =>
    typeof data === 'object' &&
    data !== null &&
    'latitude' in data &&
    'longitude' in data &&
    'current' in data &&
    typeof data.current === 'object' &&
    data.current !== null;


const fetchResponse = async <Type>(
    url: string,
    validator: (data: unknown) => data is Type,
    errorMessage: string
): Promise<Type> => {
    if (!navigator.onLine) {
        throw new Error('No internet');
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(errorMessage);
    }

    const rawData: unknown = await response.json();

    if (!validator(rawData)) {
        throw new Error(errorMessage);
    }

    return rawData;
};

export const fetchCoordinates = async (
    city: string
): Promise<{ latitude: number; longitude: number }> => {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const geoData = await fetchResponse<GeoApiResponse>(
        geoUrl,
        isGeoApiResponse,
        "Oops! Location not found!"
    );
    const [firstCity] = geoData.results;

    if (!firstCity) {
        throw new Error("Oops! Location not found!");
    }

    return { latitude: firstCity.latitude, longitude: firstCity.longitude };
};

export const fetchMeteoData = (
    latitude: number, 
    longitude: number
): Promise<MeteoApiResponse> => {
    const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=ms`;
    return fetchResponse<MeteoApiResponse>(meteoUrl,isMeteoApiResponse,"Failed to get weather data");
};
