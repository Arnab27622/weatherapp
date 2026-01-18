# 🌤️ Modern Weather Application

A sleek, premium, and feature-rich weather dashboard built with Next.js 15, TypeScript, and Tailwind CSS. This application provides real-time weather data, air quality indexing, UV tracking, and an integrated AI chatbot for weather insights.

## ✨ Key Features

-   **📍 Dynamic Geolocation**: Automatically detects your current location to provide local weather updates.
-   **🔍 Global Search**: Search for weather information in any city across the globe with geocoding support.
-   **🌡️ Real-time Metrics**: Detailed tracking of temperature, feels like, humidity, visibility, pressure, and population.
-   **📅 5-Day Forecast**: Accurate three-hourly forecast for the next 5 days with processed daily min/max temperatures.
-   **🌬️ Air Quality Index (AQI)**: Comprehensive pollutant tracking including CO, NO2, O3, SO2, PM2.5, and PM10.
-   **☀️ UV Index Monitoring**: Real-time UV intensity tracking with a custom progress visualization.
-   **🤖 AI Chatbot**: An intelligent assistant powered by Google Gemini to help you understand weather patterns and plan your day.
-   **🌓 Dark/Light Mode**: Full theme support with seamless transitions and a premium aesthetic.
-   **📏 Unit Conversion**: Toggle between Metric (°C, m/s) and Imperial (°F, mph) systems.

## 🚀 Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **State Management**: [React Context API](https://react.dev/learn/passing-data-deeply-with-context)
-   **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **AI**: [Google Gemini Pro](https://deepmind.google/technologies/gemini/)
-   **API**: [OpenWeatherMap API](https://openweathermap.org/api), [OpenUV API](https://www.openuv.io/)

## 📂 Project Structure

```
weatherapp/
├── public/                     # Static assets (images, fonts, etc.)
├── src/
│   ├── app/                    # Next.js App Router & API Routes
│   │   ├── api/                # Server-side API handlers (Proxy for weather APIs)
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx            # Main dashboard entry point
│   ├── components/             # React components categorized by feature
│   │   ├── ChatBot/            # AI assistant components
│   │   ├── ui/                 # Reusable UI primitives (shadcn)
│   │   └── [Feature]/          # Specific weather modules (Sunset, Wind, etc.)
│   ├── constants/              # Application constants
│   ├── context/                # Context providers (Location, Search, Units, Theme)
│   ├── hooks/                  # Custom React hooks (Data fetching, LocalStorage)
│   ├── services/               # API service layer
│   ├── types/                  # TypeScript interface definitions
│   └── utils/                  # Helper functions and Icon definitions
├── .env                        # Environment variables (API Keys)
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## 🛠️ Getting Started

### Prerequisites

-   Node.js 18+ 
-   npm / yarn / pnpm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Arnab27622/weatherapp.git
    cd weatherapp
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory and add your API keys:
    ```env
    OPENWEATHER_API_KEY=your_openweather_key_here
    OPENUV_API_KEY=your_openuv_key_here
    GEMINI_API_KEY=your_gemini_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Documentation

Every core module within `/src` is documented using JSDoc-style comments. This includes:
-   **Components**: Explaining the purpose and props of each UI element.
-   **Services**: Detailing API interaction logic.
-   **Hooks**: Describing state management and side effects.
-   **Utils**: Formatting and conversion logic.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for feature requests and bug reports.

## 📄 License

This project is open-source and available under the MIT License.
