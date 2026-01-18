import { useLocalStorage } from "./use-local-storage";
import { SearchHistoryItem } from "@/types/search";

export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(
    "search-history",
    []
  );

  const addToHistory = (
    search: Omit<SearchHistoryItem, "id" | "searchedAt">
  ) => {
    const newSearch: SearchHistoryItem = {
      ...search,
      id: `${search.lat}-${search.lon}-${Date.now()}`,
      searchedAt: Date.now(),
    };

    const filteredHistory = history.filter(
      (item) => !(item.lat === search.lat && item.lon === search.lon)
    );
    const newHistory = [newSearch, ...filteredHistory].slice(0, 10);

    setHistory(newHistory);
    return newHistory;
  };

  const removeFromHistory = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    return newHistory;
  };

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