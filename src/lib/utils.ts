import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function firstUpper (string : string) {
  return string[0].toLocaleUpperCase() + string.slice(1);
} 