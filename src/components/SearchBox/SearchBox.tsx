import style from "./SearchBox.module.css"
import { useState } from 'react';
import { useWeatherStore } from '../../store';

export const SearchBox = () => {
  const [city, setCity] = useState('');
  const fetchWeather = useWeatherStore((state) => state.fetchWeather);

  const handleSearch = () => {
    if (city.trim()){
      void fetchWeather(city.trim());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  return (
    <div className={style["search-box"]}>
      <input
        type="text"
        placeholder="Enter Your Location"
        value={city}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button aria-label="search" onClick={handleSearch}></button>
    </div>
  );
};
