import style from './NotFound.module.css';
import { useWeatherStore } from '../../store';
import errorImg from '../../assets/img/404.png';

export const NotFound = () => {
  const error = useWeatherStore((state) => state.error);

  if (error === undefined || error === '') {
    return <></>;
  }

  return (
    <div className={style["not-found"]}>
      <img src={errorImg} alt="Error" />
      <p>{error}</p>
    </div>
  );
};
