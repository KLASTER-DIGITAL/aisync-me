import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет классы Tailwind CSS с помощью clsx и tailwind-merge
 * Это позволяет избежать конфликтов классов и упрощает работу с условными классами
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
