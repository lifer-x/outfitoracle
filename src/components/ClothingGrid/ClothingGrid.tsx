import style from './ClothingGrid.module.css';
import { useWeatherStore } from '../../store';
import { ClothingCard } from '../ClothingCard/ClothingCard';
import { Container } from '../Container/Container';

const clothesImages = import.meta.glob<{ default: string }>('../../assets/img/clothes/*.{png,svg}', { eager: true });

export const ClothingGrid = () => {
    const clothing = useWeatherStore((state) => state.clothing);

    if (clothing.length === 0){ 
        return <></>;
    }

    return (
    <Container>
        <h2 className={style['wear_header']}>Weather outfit:</h2>
        <div className={style['wear_grid']}>
            {clothing.map((item) => 
                <ClothingCard item={item} clothesImages={clothesImages} key={item.name}/>
            )}
        </div>
    </Container>
    );
};
