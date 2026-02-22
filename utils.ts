import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rsRatingStyle(rsRating: number): string {
  if (rsRating >= 80) return 'text-green-400 border-green-700';
  if (rsRating >= 40) return 'text-white border-slate-600';
  return 'text-red-400 border-red-800';
}
