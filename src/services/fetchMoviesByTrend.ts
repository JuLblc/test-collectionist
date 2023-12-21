import { options } from "./constants";
import {
  generateMoviesWithDetails,
  selectRandomElements,
} from "./dataTransform";

export const fetchMoviesByTrend = async () => {
  const URL = "https://api.themoviedb.org/3/trending/movie/day";
  const NUMBER_MOVIES_TO_DISPLAY = 4;

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }

    const json = await response.json();

    const movies = await generateMoviesWithDetails(json.results);
    const randomMovies = selectRandomElements(movies, NUMBER_MOVIES_TO_DISPLAY);

    return randomMovies;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
