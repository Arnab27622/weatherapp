import { Button } from "@/components/ui/button";
import { SearchHistoryItem } from "@/hooks/use-search-history";
import { Search, Trash2 } from "lucide-react";
import { MouseEvent } from "react";
import { GeocodedLocation } from "@/types/weather";

interface SearchHistoryListProps {
    history: SearchHistoryItem[];
    hoveredIndex: number;
    setHoveredIndex: (index: number) => void;
    handleCitySelection: (item: GeocodedLocation) => void;
    handleDeleteHistoryItem: (
        e: MouseEvent<HTMLButtonElement>,
        id: string
    ) => void;
    clearHistory: () => void;
}

export const SearchHistoryList = ({
    history,
    hoveredIndex,
    setHoveredIndex,
    handleCitySelection,
    handleDeleteHistoryItem,
    clearHistory,
}: SearchHistoryListProps) => {
    if (!history.length) {
        return (
            <li className="p-2 text-sm text-muted-foreground">No recent searches</li>
        );
    }

    return (
        <>
            <li className="p-2 text-sm text-muted-foreground flex justify-between items-center">
                <span>Recent Searches</span>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-red-500 hover:text-red-600 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        clearHistory();
                    }}
                    aria-label="Clear all search history"
                >
                    Clear All
                </Button>
            </li>

            {history.map((item, index) => {
                const isHovered = hoveredIndex === index;
                return (
                    <li
                        key={item.id}
                        className={`flex items-center justify-between py-2 sm:py-3 px-2 text-sm cursor-pointer rounded-sm group ${isHovered ? "bg-accent" : ""
                            }`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onClick={() =>
                            handleCitySelection({
                                lat: item.lat,
                                lon: item.lon,
                                name: item.name,
                                country: item.country,
                                state: item.state,
                            })
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleCitySelection({
                                    lat: item.lat,
                                    lon: item.lon,
                                    name: item.name,
                                    country: item.country,
                                    state: item.state,
                                });
                            }
                        }}
                    >
                        <div className="flex items-center">
                            <Search className="mr-2 h-4 w-4" />
                            <span className="text-xs sm:text-sm">
                                {item.name}, {item.state ? `${item.state}, ` : ""}
                                {item.country}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500"
                            onClick={(e) => handleDeleteHistoryItem(e, item.id)}
                            aria-label="Delete history item"
                        >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </li>
                );
            })}
        </>
    );
};
