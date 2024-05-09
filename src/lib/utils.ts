import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return moment(date).format("HH:mm dddd YYYY");
}

/* Closeup function for modals */
export const closePopup = () => {
  const elem = document.activeElement as HTMLElement;
  if (elem) {
    elem?.blur();
  }
};
