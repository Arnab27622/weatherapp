import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Temperature from "@/components/Temperature/Temperature";
import { LocationProvider } from "@/context/LocationContext";
import { SearchProvider } from "@/context/SearchContext";

// Lazy load components that are not immediately visible
const DailyForecast = lazy(() => import("@/components/DailyForecast/DailyForecast"));
const FeelsLike = lazy(() => import("@/components/FeelsLike/FeelsLike"));
const Humidity = lazy(() => import("@/components/Humidity/Humidity"));
const Population = lazy(() => import("@/components/Population/Population"));
const Pressure = lazy(() => import("@/components/Pressure/Pressure"));
const Sunset = lazy(() => import("@/components/Sunset/Sunset"));
const UvIndex = lazy(() => import("@/components/UvIndex/UvIndex"));
const Visibility = lazy(() => import("@/components/Visibility/Visibility"));
const Wind = lazy(() => import("@/components/Wind/Wind"));
const Footer = lazy(() => import("@/components/Footer/Footer"));
const Cities = lazy(() => import("@/components/Cities/Cities"));
const ChatBot = lazy(() => import("@/components/ChatBot/ChatBot"));
const FiveDayForecast = lazy(() => import("@/components/FiveDayForecast/FiveDayForecast"));
const AirPollution = lazy(() => import("@/components/AirPollution/AirPollution"));

// Simple loading skeleton for components
const ComponentSkeleton = () => (
  <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
);

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
                <Suspense fallback={<ComponentSkeleton />}>
                  <FiveDayForecast />
                </Suspense>
              </div>
              <div className="flex flex-col w-full">
                <div className="instruments grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <Suspense fallback={<ComponentSkeleton />}>
                    <AirPollution />
                  </Suspense>
                  <Suspense fallback={<ComponentSkeleton />}>
                    <Sunset />
                  </Suspense>
                  <Suspense fallback={<ComponentSkeleton />}>
                    <Wind />
                  </Suspense>
                  <Suspense fallback={<ComponentSkeleton />}>
                    <DailyForecast />
                  </Suspense>
                  <Suspense fallback={<ComponentSkeleton />}>
                    <UvIndex />
                  </Suspense>
                  <Suspense fallback={<ComponentSkeleton />}>
                    <Population />
                  </Suspense>
                  <Suspense fallback={<ComponentSkeleton />}>
                    <FeelsLike />
                  </Suspense>
                  <Suspense fallback={<ComponentSkeleton />}>
                    <Humidity />
                  </Suspense>
                  <Suspense fallback={<ComponentSkeleton />}>
                    <Visibility />
                  </Suspense>
                  <Suspense fallback={<ComponentSkeleton />}>
                    <Pressure />
                  </Suspense>
                </div>
                <Suspense fallback={<ComponentSkeleton />}>
                  <Cities />
                </Suspense>
              </div>
            </div>
          </div>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <Suspense fallback={null}>
            <ChatBot />
          </Suspense>
        </main>
      </SearchProvider>
    </LocationProvider>
  );
}