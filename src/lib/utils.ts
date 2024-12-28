import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function firstUpper(string: string) {
  return string[0].toLocaleUpperCase() + string.slice(1);
}

export function numberGradeToString(num: number, type: string) {
  if (type.includes('1-5')) {
    switch (num) {
      case 1:
        return 'b';
      case 2:
        return 'c';
      case 3:
        return 'm';
      case 4:
        return 'e';
      case 5:
        return 'l';
      default:
        return 'amis_numeron_muttamminen_epaonnistui';
    }
  } else {
    switch (num) {
      case 1:
        return 'm';
      case 2:
        return 'e';
      case 3:
        return 'l';
      default:
        return 'amis_numeron_muttamminen_epaonnistui';
    }
  }
}
