/**
 * UI Utility Functions
 * Core helper functions for managing class name transitions and tailwind overrides.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges CSS class names using clsx and tailwind-merge
 * Ensures that Tailwind utility classes are merged correctly without conflicts.
 * 
 * @param inputs - Variadic list of class names, objects, or arrays
 * @returns Optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
