/**
 * Home Page (Root Route)
 * Assembles the main dashboard layout with navigation, weather details, 
 * forecast, cities list, and the AI chatbot.
 */

import Navbar from "@/components/Navbar";
import Temperature from "@/components/Temperature/Temperature";
import { LocationProvider } from "@/context/LocationContext";
import { SearchProvider } from "@/context/SearchContext";
import WeatherGrid from "@/components/WeatherGrid";
import Cities from "@/components/Cities/Cities";
import FiveDayForecast from "@/components/FiveDayForecast/FiveDayForecast";
import ChatBot from "@/components/ChatBot/ChatBot";
import Footer from "@/components/Footer/Footer";

/**
 * Main application dashboard
 * Wraps the content in Location and Search providers to manage global state.
 */
export default function Home() {
  return (
    <LocationProvider>
      <SearchProvider>
        <main className="min-h-screens">
          <Navbar />
          <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pb-4 flex flex-col gap-4 md:flex-row mt-6">
              <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-140">
                <Temperature />
                <FiveDayForecast />
              </div>
              <div className="flex flex-col w-full">
                <WeatherGrid />
                <Cities />
              </div>
            </div>
          </div>
          <Footer />
          <ChatBot />
        </main>
      </SearchProvider>
    </LocationProvider>
  );
}