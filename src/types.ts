export interface ClothingItem {
    name: string;
    icon: string;
}

export interface GeoResult{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    admin2_id: number;
    timezone: string;
    population: number;
    country_id: number;
    country: string;
    admin1: string;
    admin2: string;
}

export interface GeoApiResponse{
    results:GeoResult[];
    generationtime_ms:number
}


export interface MeteoUnits{
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    weather_code: string;
}

export interface MeteoResult{
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
}

export interface MeteoApiResponse{
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: MeteoUnits;
    current: MeteoResult;

}
