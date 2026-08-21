import type { ClothingItem } from "./types";

const WARDROBE_RULES = [
    { 
        threshold: 38, 
        items: [
            { name: "Sit home (Extreme Heat)", icon: "fire.svg" }
        ] 
    },
    {
        threshold: 24,
        items: [
            { name: "T-Shirt", icon: "t-shirt.svg" },
            { name: "Shorts", icon: "shorts.svg" },
            { name: "Sandals", icon: "sandals.svg" },
            { name: "Sunglasses", icon: "sunglass.svg" }
        ]
    },
    {
        threshold: 15,
        items: [
            { name: "Sweater", icon: "sweater.svg" },
            { name: "Jeans", icon: "jeans.svg" },
            { name: "Sneakers", icon: "sneakers.svg" }
        ]
    },
    {
        threshold: 5,
        items: [
            { name: "Coat", icon: "coat.svg" },
            { name: "Sneakers", icon: "sneakers.svg" },
            { name: "Scarf", icon: "scarf.svg" },
            { name: "Warm hat", icon: "winter_hat.svg" }
        ]
    },
    {
        threshold: -15,
        items: [
            { name: "Winter jacket", icon: "winter_jacket.svg" },
            { name: "Winter boots", icon: "warm_boots.svg" },
            { name: "Scarf", icon: "scarf.svg" },
            { name: "Warm hat", icon: "winter_hat.svg" },
            { name: "Mittens", icon: "mittens.svg" }
        ]
    },
    {
        threshold: -Infinity, 
        items: [{ name: "Sit home (Extreme Cold)", icon: "snow.svg" }] 
    }
];

export const getClothingRecommendations = (
  feelTemp: number, 
  isRaining: boolean
): ClothingItem[] => {
  const baseRule = WARDROBE_RULES.find(rule => feelTemp >= rule.threshold);
  const finalItems = baseRule ? [...baseRule.items] : [];

  const isSittingHome = finalItems.some(item => item.name.startsWith("Sit home"));

  if (isRaining && !isSittingHome) {
    finalItems.push({ name: "Umbrella", icon: "umbrella.svg" });
  }

  return finalItems;
};
