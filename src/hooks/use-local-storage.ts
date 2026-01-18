/**
 * useLocalStorage Hook
 * A generic hook for managing state that persists in the browser's local storage.
 * Handles JSON serialization/deserialization and provides a stateful interface.
 * 
 * @template T - The type of the value being stored
 */

import { useEffect, useState } from "react";

/**
 * Custom hook to sync state with local storage
 * @param key - The local storage key to use
 * @param initialValue - The fallback value if no data is found in local storage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load initial value from local storage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsInitialized(true);
    }
  }, [key]);

  // Sync state changes back to local storage
  useEffect(() => {
    if (isInitialized) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }
  }, [key, storedValue, isInitialized]);

  return [storedValue, setStoredValue] as const;
}