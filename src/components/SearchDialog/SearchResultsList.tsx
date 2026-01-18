import { GeocodedLocation } from "@/types/weather";
import { Search } from "lucide-react";

interface SearchResultsListProps {
    geoCodedList?: GeocodedLocation[];
    hoveredIndex: number;
    setHoveredIndex: (index: number) => void;
    handleCitySelection: (item: GeocodedLocation) => void;
    inputValue: string;
}

export const SearchResultsList = ({
    geoCodedList,
    hoveredIndex,
    setHoveredIndex,
    handleCitySelection,
    inputValue,
}: SearchResultsListProps) => {
    if (!inputValue) return null;

    return (
        <>
            <li className="p-2 text-sm text-muted-foreground">Suggestions</li>

            {geoCodedList?.length ? (
                geoCodedList.map((item: GeocodedLocation, index: number) => {
                    const isHovered = hoveredIndex === index;
                    return (
                        <li
                            key={`${item.name}-${index}`}
                            className={`flex items-center py-2 sm:py-3 px-2 text-sm cursor-pointer rounded-sm ${isHovered ? "bg-accent" : ""
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onClick={() => handleCitySelection(item)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleCitySelection(item);
                                }
                            }}
                        >
                            <Search className="mr-2 h-4 w-4" />
                            <span className="text-xs sm:text-sm">
                                {item.name}, {item.state ? `${item.state}, ` : ""}
                                {item.country}
                            </span>
                        </li>
                    );
                })
            ) : (
                <li className="p-2 text-sm text-muted-foreground">No Results</li>
            )}
        </>
    );
};
