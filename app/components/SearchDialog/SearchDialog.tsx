"use client";

import React, {
    useState,
    useEffect,
    useCallback,
    ChangeEvent,
    MouseEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Command, CommandInput } from "@/components/ui/command";
import { Search, Trash2 } from "lucide-react";
import {
    useGlobalContext,
    useGlobalContextUpdate,
} from "@/app/context/globalContext";
import {
    useSearchHistory,
    SearchHistoryItem,
} from "@/app/hooks/use-search-history";

const SearchDialog: React.FC = () => {
    const { geoCodedList, inputValue, setInputValue, handleInput } =
        useGlobalContext();
    const { setActiveCityCoords } = useGlobalContextUpdate();
    const { history, addToHistory, removeFromHistory, clearHistory } =
        useSearchHistory();

    const [hoveredIndex, setHoveredIndex] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => setHoveredIndex(0), [geoCodedList, inputValue]);

    const handleCitySelection = useCallback(
        (item: {
            lat: number;
            lon: number;
            name: string;
            country: string;
            state?: string;
        }) => {
            setActiveCityCoords([item.lat, item.lon]);
            setOpen(false);
            setInputValue("");
            addToHistory({
                query: inputValue,
                lat: item.lat,
                lon: item.lon,
                name: item.name,
                country: item.country,
                state: item.state,
            });
        },
        [
            setActiveCityCoords,
            setInputValue,
            addToHistory,
            inputValue,
        ]
    );

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => handleInput(e);

    const handleDeleteHistoryItem = (
        e: MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.stopPropagation();
        removeFromHistory(id);
    };

    return (
        <div className="search-btn">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="border inline-flex items-center justify-start text-sm font-medium hover:dark:bg-[#0f0f0f] hover:bg-slate-100 ease-in-out duration-200 py-1 sm:py-2 px-3 w-full sm:w-64"
                    >
                        <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Search cities...</span>
                    </Button>
                </DialogTrigger>

                <DialogContent className="p-0 z-1100">
                    <Command className="rounded-lg border shadow-md">
                        <CommandInput
                            placeholder="Type a command or search"
                            value={inputValue}
                            onChangeCapture={onInputChange}
                            className="text-sm sm:text-base"
                        />

                        <ul className="px-2 sm:px-3 pb-2">
                            {inputValue ? (
                                <>
                                    <li className="p-2 text-sm text-muted-foreground">
                                        Suggestions
                                    </li>

                                    {geoCodedList?.length ? (
                                        geoCodedList.map((item: {
                                            name: string;
                                            country: string;
                                            state: string;
                                            lat: number;
                                            lon: number;
                                        }, index: number) => {
                                            const isHovered = hoveredIndex === index;
                                            return (
                                                <li
                                                    key={`${item.name}-${index}`}
                                                    className={`flex items-center py-2 sm:py-3 px-2 text-sm cursor-pointer rounded-sm ${isHovered ? "bg-accent" : ""
                                                        }`}
                                                    onMouseEnter={() => setHoveredIndex(index)}
                                                    onClick={() => handleCitySelection(item)}
                                                >
                                                    <Search className="mr-2 h-4 w-4" />
                                                    <span className="text-xs sm:text-sm">
                                                        {item.name},{" "}
                                                        {item.state ? `${item.state}, ` : ""}
                                                        {item.country}
                                                    </span>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li className="p-2 text-sm text-muted-foreground">
                                            No Results
                                        </li>
                                    )}
                                </>
                            ) : history.length ? (
                                <>
                                    <li className="p-2 text-sm text-muted-foreground flex justify-between items-center">
                                        <span>Recent Searches</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-xs text-red-500 hover:text-red-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                clearHistory();
                                            }}
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
                                            >
                                                <div className="flex items-center">
                                                    <Search className="mr-2 h-4 w-4" />
                                                    <span className="text-xs sm:text-sm">
                                                        {item.name},{" "}
                                                        {item.state ? `${item.state}, ` : ""}
                                                        {item.country}
                                                    </span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500"
                                                    onClick={(e) =>
                                                        handleDeleteHistoryItem(e, item.id)
                                                    }
                                                >
                                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>
                                            </li>
                                        );
                                    })}
                                </>
                            ) : (
                                <li className="p-2 text-sm text-muted-foreground">
                                    No recent searches
                                </li>
                            )}
                        </ul>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SearchDialog;