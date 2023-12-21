import { RouteLocationNormalized } from "vue-router";
import { AnyObjectWithId } from "../types";

export const getRouteId = (route: RouteLocationNormalized): string | null => {
  return Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
};

export const convertMinutesToReadableTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const formattedMinutes = String(remainingMinutes).padStart(2, "0");

  return hours > 0 ? `${hours}h${formattedMinutes}` : `${remainingMinutes} min`;
};

export const removeDuplicates = <T extends AnyObjectWithId>(
  array: T[]
): T[] => {
  const map = new Map(array.map((item) => [item.id, item]));
  return Array.from(map.values());
};
