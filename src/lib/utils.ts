import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names with conflict resolution.
 * Uses clsx for conditional class composition and tailwind-merge
 * to intelligently resolve conflicting utility classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
