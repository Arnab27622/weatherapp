"use client";

import React, {
    useState,
    useEffect,
    useCallback,
    MouseEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Command, CommandInput } from "@/components/ui/command";
import { Search, Loader2 } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import {
    useSearchHistory,
} from "@/hooks/use-search-history";

import { GeocodedLocation } from "@/types/weather";
import { SearchResultsList } from "./SearchResultsList";
import { SearchHistoryList } from "./SearchHistoryList";

const SearchDialog: React.FC = () => {
    const {
        geoCodedList,
        inputValue,
        setInputValue,
        handleInput,
        isSearchLoading,
        handleCitySelection: handleCitySelectionBase
    } = useSearch();

    const { history, removeFromHistory, clearHistory } = useSearchHistory();

    const [hoveredIndex, setHoveredIndex] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => setHoveredIndex(0), [geoCodedList, inputValue]);

    const handleCitySelection = useCallback(
        (item: GeocodedLocation) => {
            handleCitySelectionBase(item);
            setOpen(false);
        },
        [handleCitySelectionBase]
    );

    const onInputChange = (value: string) => handleInput(value);

    const handleDeleteHistoryItem = (
        e: MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.stopPropagation();
        removeFromHistory(id);
    };

    return (
        <div className="search-btn">
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        setInputValue("");
                    }
                }}
            >
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="border inline-flex items-center justify-start text-sm font-medium hover:dark:bg-[#0f0f0f] hover:bg-slate-100 ease-in-out duration-200 p-2 cursor-pointer"
                        aria-label="Search cities"
                    >
                        <Search className="h-6 w-6 text-muted-foreground" />
                    </Button>
                </DialogTrigger>

                <DialogContent className="p-0 z-1100">
                    <Command className="rounded-lg border shadow-md" shouldFilter={false}>
                        <div className="relative">
                            <CommandInput
                                placeholder="Search cities..."
                                value={inputValue}
                                onValueChange={onInputChange}
                                className="text-sm sm:text-base"
                            />
                            {isSearchLoading && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            )}
                        </div>

                        <ul className={`px-2 sm:px-3 pb-2 transition-opacity duration-200 ${isSearchLoading ? 'opacity-50' : 'opacity-100'}`}>
                            {inputValue ? (
                                <SearchResultsList
                                    geoCodedList={geoCodedList}
                                    hoveredIndex={hoveredIndex}
                                    setHoveredIndex={setHoveredIndex}
                                    handleCitySelection={handleCitySelection}
                                    inputValue={inputValue}
                                />
                            ) : (
                                <SearchHistoryList
                                    history={history}
                                    hoveredIndex={hoveredIndex}
                                    setHoveredIndex={setHoveredIndex}
                                    handleCitySelection={handleCitySelection}
                                    handleDeleteHistoryItem={handleDeleteHistoryItem}
                                    clearHistory={clearHistory}
                                />
                            )}
                        </ul>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SearchDialog;
