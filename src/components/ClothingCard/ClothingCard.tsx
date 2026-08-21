import style from './ClothingCard.module.css';
import type { ClothingItem } from "../../types";

interface ClothingCardProps{
    item: ClothingItem;
    clothesImages: Record<string, {default: string}>;
}
export const ClothingCard = ({item, clothesImages}: ClothingCardProps) => {
    const imgPath = `../../assets/img/clothes/${item.icon}`;
    const finalSrc = clothesImages[imgPath]?.default ?? '';

    return (
    <div className={style["clothes-card"]}>
        <img src={finalSrc} alt={item.name} />
        <h3>{item.name}</h3>
    </div>
    );
}
