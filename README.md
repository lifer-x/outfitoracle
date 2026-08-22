# 🔮 OutfitOracle

**OutfitOracle** is a stylish, glassmorphism-designed frontend web application built with Vanilla JavaScript. It doesn't just display the current weather for a selected city; it calculates a unique **comfort index** based on temperature, humidity, and wind speed to provide tailored clothing and accessory recommendations.

## ✨ Features
*   **Dynamic Recommendations**: A smart wardrobe algorithm suggests appropriate clothing items (from t-shirts to heavy winter coats and umbrellas).
*   **Extreme Weather Alerts**: Triggers a "Sit home" warning during dangerous freezes or extreme heatwaves.
*   **Smooth UX**: Fluid height transitions and container animations during API requests and error states.
*   **Fully Responsive**: Optimised for mobile devices, desktops, and ultra-high-resolution screens (2K/4K+).
*   **Accessible**: Supports full keyboard navigation (trigger search by pressing `Enter`).

## 🛠️ Tech Stack
*   **HTML5** — Semantic markup (`main`, `section`, `header`).
*   **CSS3** — Custom Poppins typography, Grid/Flexbox layouts, Glassmorphic effects, and media queries.
*   **JavaScript (ES6+)** — Fetch API, asynchronous requests, and dynamic DOM manipulation.
*   **Iconography** — Boxicons.
*   **Data API** — OpenWeatherMap API.

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com
   ```
2. Navigate to the project directory:
   ```bash
   cd outfitoracle
   ```
3. Open `index.html` in your preferred browser (or use the VS Code Live Server extension).

## ⚙️ How the Algorithm Works (Comfort Index)
The application computes an internal comfort score utilizing multiple telemetry metrics:
*   **Wind Speed**: Lowers the comfort score during high winds (>5 m/s) and boosts it during calm conditions.
*   **Humidity**: High humidity scales up the heat index in hot weather, but amplifies freezing conditions during low-temperature cycles.
*   **Apparent Temperature (`feels_like`)**: The foundational metric mapping the wardrobe configuration across 9 distinct thermal zones.

---
🎨 *Crafted to protect both your style and your comfort.*
