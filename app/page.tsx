import AirPollution from "./components/AirPollution/AirPollution";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import FeelsLike from "./components/FeelsLike/FeelsLike";
import Humidity from "./components/Humidity/Humidity";
import Navbar from "./components/Navbar";
import Population from "./components/Population/Population";
import Pressure from "./components/Pressure/Pressure";
import Sunset from "./components/Sunset/Sunset";
import Temperature from "./components/Temperature/Temperature";
import UvIndex from "./components/UvIndex/UvIndex";
import Visibility from "./components/Visibility/Visibility";
import Wind from "./components/Wind/Wind";
import Footer from "./components/Footer/Footer";
import Cities from "./components/Cities/Cities";
import ChatBot from "./components/ChatBot/ChatBot";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast";
import { LocationProvider } from "./context/LocationContext";
import { SearchProvider } from "./context/SearchContext";

export default function Home() {
  return (
    <LocationProvider>
      <SearchProvider>
        <main className="min-h-screens">
          <Navbar />
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pb-4 flex flex-col gap-4 md:flex-row mt-6">
              <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
                <Temperature />
                <FiveDayForecast />
              </div>
              <div className="flex flex-col w-full">
                <div className="instruments grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <AirPollution />
                  <Sunset />
                  <Wind />
                  <DailyForecast />
                  <UvIndex />
                  <Population />
                  <FeelsLike />
                  <Humidity />
                  <Visibility />
                  <Pressure />
                </div>
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