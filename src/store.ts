import { create } from 'zustand';
import { fetchCoordinates, fetchMeteoData } from './api';
import { processWeatherData } from './algorithm';
import { type ClothingItem } from './types'; 

interface WeatherDataState {
    temperature?: number;
    humidity?: number;
    windSpeed?: number;
    weatherCode?: number;
    feelsTemp?: number;
    clothing: ClothingItem[];
    error?: string;
}


interface WeatherActions {
    fetchWeather: (city: string) => Promise<void>;
    resetStore: () => void;
}

type WeatherStore = WeatherDataState & WeatherActions;

const initialState: WeatherDataState = {
    temperature: undefined,
    humidity: undefined,
    windSpeed: undefined,
    weatherCode: undefined,
    feelsTemp: undefined,
    clothing: [],
    error: undefined,
};

export const useWeatherStore = create<WeatherStore>((set) => ({
    ...initialState,

    fetchWeather: async (city: string) => {
        set({ error: undefined });    

        try {
            const { latitude, longitude } = await fetchCoordinates(city);
            const meteoData = await fetchMeteoData(latitude, longitude);
            
            const { clothing, feelsTemp, humidity, temperature, weatherCode, windSpeed } = processWeatherData(meteoData);

            set({
                clothing,
                feelsTemp,
                humidity,
                temperature,
                weatherCode,
                windSpeed,
            });
            

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            set(
                { ...initialState,
                    error: errorMessage });
        }
    },

    resetStore: () => { set(initialState); }
}));
