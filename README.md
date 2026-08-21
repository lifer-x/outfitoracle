# ☀️ Outfit Oracle

**Outfit Oracle** is a modern, ultra-fast weather client that not only displays current meteorological data but also smart-calculates the perceived temperature to suggest the perfect outfit from your wardrobe. 

The project adheres to strict type safety limits and leverages modern, high-performance tooling like **Oxlint** for instant static analysis.

## ✨ Features

- **Accurate Geocoding:** Instant city search powered by the Open-Meteo Geocoding API.
- **Advanced Weather Processor:** Calculates real-time heat/wind-chill index (perceived temperature) based on humidity, temperature, and wind speed.
- **Smart Wardrobe Algorithm:** Dynamically recommends clothing items and accessories (like an umbrella during rain) based on calculated weather conditions.
- **Robust Error Handling:** Pure state reset mechanics prevent old data from flashing when API requests fail or connection drops.
- **Automated CI/CD:** Fully automated linting, building, and deployment pipeline to GitHub Pages via GitHub Actions.

## 🛠️ Tech Stack & Tooling

- **Framework:** React 19 (Functional Components, Custom Hooks)
- **Language:** TypeScript (Strict Mode enabled)
- **State Management:** Zustand (Immutable state patterns with detached initial states)
- **Build Tool:** Vite
- **Styling:** CSS Modules (with responsive layout adapters)
- **Linting:** [Oxlint](https://github.com) (Category rules: correctness, perf, suspicious, pedantic, style set to strict `error`)

## ⚙️ Strict Quality Standards

This project maintains an extremely high code-quality baseline enforced through configuration:
- **TypeScript (`tsconfig.json`):** Enforces `"noUncheckedIndexedAccess": true` and `"useUnknownInCatchVariables": true` ensuring compile-time safety against `undefined` array boundaries and raw exceptions.
- **Linter (`oxlint.json`):** Runs with `"denyWarnings": true` making sure zero code-smells, magic numbers, or unoptimized loops survive into production builds.

## 📁 Project Architecture Overview

```text
src/
├── assets/             # Static graphics (weather conditions, item icons)
├── components/         # Shared and feature-scoped visual blocks
│   ├── ClothingCard/   # Renders an individual recommended item
│   ├── ClothingGrid/   # Dynamic grid utilizing Vite's import.meta.glob
│   ├── Container/      # Reusable glassmorphic layout wrapper
│   ├── MainInfo/       # High-level temperature & status display
│   ├── SearchBox/      # Input controls with active event handlers
│   └── WeatherCard/    # Reusable fine-grained condition line components
├── store/              # Zustand centralized reactive state engine
├── algorithm.ts        # Pure math formulas for calculating climate perception
├── api.ts              # Strongly-typed Axios/Fetch runtime API clients with Type Guards
├── types.ts            # Domain model definitions and strict contract schemas
├── wardrobe.ts         # Tabular data array storing layout garment criteria
└── main.tsx            # Application bootstrapping root entrypoint
```

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v20 or higher recommended) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com
   cd outfitoracle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Scripts

- **Development Server:** Run locally with hot-module replacement:
  ```bash
  npm run dev
  ```

- **Production Build:** Validate types and bundle into static files (`dist/`):
  ```bash
  npm run build
  ```

- **Code Linting:** Instantly analyze code safety using Rust-backed Oxlint:
  ```bash
  npm run lint
  ```

## 🌐 CI/CD & Deployment

Deployments are entirely automated. Upon pushing to the `main` branch, a GitHub Actions workflow:
1. Checks out the code.
2. Performs clean dependency installation (`npm ci`).
3. Runs strict quality verification via `npm run lint`.
4. Builds the bundles with the proper base paths.
5. Deploys the application directly to **GitHub Pages**.

