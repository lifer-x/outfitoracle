import style from './WeatherDetails.module.css'
import { useWeatherStore } from '../../store';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import waterIcon from '../../assets/img/icons/water.svg';
import windIcon from '../../assets/img/icons/wind.svg';

export const WeatherDetails = () => {
    const { humidity, windSpeed} = useWeatherStore();
    
    if (
        humidity === undefined || 
        windSpeed === undefined
    ) {
        return <></>;
    }
    
    return (
        <div className={style["weather-details"]}>
            <WeatherCard icon={waterIcon} text={"Humidity"} value={humidity} unit={'%'}/>
            <WeatherCard icon={windIcon} text={'Wind'} value={windSpeed} unit={"m/s"}/>
        </div>
    )
}
