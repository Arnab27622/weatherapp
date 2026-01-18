/**
 * useSearchHistory Hook
 * Manages the recently searched cities history with local storage persistence.
 * Prevents duplicates and maintains a maximum history length.
 */

import { useLocalStorage } from "./use-local-storage";
import { SearchHistoryItem } from "@/types/search";

/**
 * Custom hook for search history management
 * Provides methods for adding, removing, and clearing history items.
 */
export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(
    "search-history",
    []
  );

  /**
   * Adds a new city to the search history
   * Removes existing entries for the same location and caps the list to 10 items.
   */
  const addToHistory = (
    search: Omit<SearchHistoryItem, "id" | "searchedAt">
  ) => {
    const newSearch: SearchHistoryItem = {
      ...search,
      id: `${search.lat}-${search.lon}-${Date.now()}`,
      searchedAt: Date.now(),
    };

    // Filter out existing entries for the same coordinates to move the new search to the top
    const filteredHistory = history.filter(
      (item) => !(item.lat === search.lat && item.lon === search.lon)
    );
    const newHistory = [newSearch, ...filteredHistory].slice(0, 10);

    setHistory(newHistory);
    return newHistory;
  };

  /**
   * Removes a specific item from history by ID
   */
  const removeFromHistory = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    return newHistory;
  };

  /**
   * Clears the entire search history
   */
  const clearHistory = () => {
    setHistory([]);
    return [];
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}