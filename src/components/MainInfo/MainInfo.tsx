import style from "./MainInfo.module.css"
import { useWeatherStore } from '../../store';

import clearBg from '../../assets/img/clear.png';
import cloudBg from '../../assets/img/cloud.png';
import mistBg from '../../assets/img/mist.png';
import rainBg from '../../assets/img/rain.png';
import snowBg from '../../assets/img/snow.png';

const CLEAR_SKY = 0;
const MAINLY_CLEAR_MIN = 1;
const MAINLY_CLEAR_MAX = 3;
const FOG_MIN = 45;
const FOG_MAX = 48;
const DRIZZLE_MIN = 51;
const RAIN_MAX = 67;
const SHOWER_MIN = 80;
const SHOWER_MAX = 82;
const SNOW_FALL_MIN = 71;
const SNOW_FALL_MAX = 77;
const SNOW_SHOWERS_MIN = 85;
const SNOW_SHOWERS_MAX = 86;


const WEATHER_CONDITIONS = [
  {
    check: (code: number) => code === CLEAR_SKY,
    srcImg: clearBg,
    weatherText: 'Clear Sky'
  },
  {
    check: (code: number) => code >= MAINLY_CLEAR_MIN && code <= MAINLY_CLEAR_MAX,
    srcImg: cloudBg,
    weatherText: 'Partly Cloudy'
  },
  {
    check: (code: number) => code >= FOG_MIN && code <= FOG_MAX,
    srcImg: mistBg,
    weatherText: 'Foggy'
  },
  {
    check: (code: number) => (code >= DRIZZLE_MIN && code <= RAIN_MAX) || (code >= SHOWER_MIN && code <= SHOWER_MAX),
    srcImg: rainBg,
    weatherText: 'Rainy'
  },
  {
    check: (code: number) => (code >= SNOW_FALL_MIN && code <= SNOW_FALL_MAX) || (code >= SNOW_SHOWERS_MIN && code <= SNOW_SHOWERS_MAX),
    srcImg: snowBg,
    weatherText: 'Snowy'
  }
];

export const MainInfo = () => {
    const { temperature, weatherCode } = useWeatherStore();

    if (
        temperature === undefined || 
        weatherCode === undefined
    ) {
        return <></>;
    }

    const condition = WEATHER_CONDITIONS.find(cond => cond.check(weatherCode));

    const srcImg = condition?.srcImg ?? clearBg;
    const weatherText = condition?.weatherText ?? 'Unknown';

    return (
        <div className={style["weather-box"]}>
            <img src={srcImg} alt={weatherText} />
            <p className={style["temperature"]}>
                {Math.round(temperature)}
                <span>°C</span>
            </p>
            <p className={style["description"]}>{weatherText}</p>
        </div>
    )
}
