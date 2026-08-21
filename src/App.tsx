import './App.css';
import { ClothingGrid } from './components/ClothingGrid/ClothingGrid';
import { Container } from './components/Container/Container';
import { NotFound } from './components/NotFound/NotFound';
import { SearchBox } from './components/SearchBox/SearchBox';
import { WeatherCard } from './components/WeatherInfo/WeatherInfo';
import { useWeatherStore } from './store';


const App = (): React.JSX.Element => {
  const { 
    temperature, 
    clothing, 
    error
  } = useWeatherStore();
  const isErrorActive = typeof error === 'string' && error.length > 0;
  const isWeatherActive = typeof temperature === 'number' && !isErrorActive;
  const isClothingActive = clothing.length > 0 && !isErrorActive;

  return (
    <>
      <Container>
        <SearchBox />
        {isWeatherActive ? <WeatherCard /> : <></>}
        {isErrorActive ? <NotFound /> : <></>}
      </Container>
      {isClothingActive ? <ClothingGrid /> : <></>}
    </>
  );
}

export default App;
