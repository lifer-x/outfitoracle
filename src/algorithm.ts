import { getClothingRecommendations } from "./wardrobe";
import type { MeteoApiResponse } from "./types";

const DRIZZLE_CODE_MIN = 51;
const RAIN_CODE_MAX = 67;
const SHOWER_CODE_MIN = 80;
const SHOWER_CODE_MAX = 82;
const HIGH_HUMIDITY_THRESHOLD = 95;
const FREEZING_POINT = 0;

const STEAM_HUMIDITY_COEF = 0.06105;
const STEAM_EXP_BASE = 17.27;
const STEAM_EXP_DIV = 4105.079;
const STEAM_EXP_ADD = 237.7;

const FEEL_STEAM_WEIGHT = 0.33;
const FEEL_WIND_WEIGHT = 0.7;
const FEEL_BASE_SUBTRACT = 4;

const ROUND_DECIMAL_FACTOR = 10;

export const processWeatherData = (meteoData: MeteoApiResponse) => {
    const { 
        relative_humidity_2m: humidity, 
        temperature_2m: temperature, 
        weather_code: weatherCode, 
        wind_speed_10m: windSpeed 
    } = meteoData.current;

    const feelsTemp = calculateFeelTemperature(temperature, humidity, windSpeed);

    const isRaining = (
        (weatherCode >= DRIZZLE_CODE_MIN && weatherCode <= RAIN_CODE_MAX) ||
        (weatherCode >= SHOWER_CODE_MIN && weatherCode <= SHOWER_CODE_MAX) ||
        humidity > HIGH_HUMIDITY_THRESHOLD
    ) && feelsTemp > FREEZING_POINT;

    const clothing = getClothingRecommendations(feelsTemp, isRaining);

    return { clothing, feelsTemp, humidity, temperature, weatherCode, windSpeed };
};


export const calculateFeelTemperature = (
    temp: number,
    humidity: number,
    windSpeed: number
): number => {


    const steamPressure = humidity * STEAM_HUMIDITY_COEF * Math.exp(
        STEAM_EXP_BASE - STEAM_EXP_DIV / (STEAM_EXP_ADD + temp)
    );
    
    const feelTemp = temp + 
        FEEL_STEAM_WEIGHT * steamPressure - 
        FEEL_WIND_WEIGHT * windSpeed - 
        FEEL_BASE_SUBTRACT;
  
    return Math.round(feelTemp * ROUND_DECIMAL_FACTOR) / ROUND_DECIMAL_FACTOR;
};
