import style from "./WeatherCard.module.css";

interface WeatherCardProps {
    icon: string;
    text: string;
    value: number;
    unit: string
}
export const WeatherCard = ({icon, text, value, unit}: WeatherCardProps) => (
        <div className={style["weather-details-card"]}>
            <img src={icon} alt={text} />
            <div className={style["weather-details-text"]}>
                <span>{Math.round(value)}{unit}</span>
                <p>{text}</p>
            </div>
        </div>    
);
