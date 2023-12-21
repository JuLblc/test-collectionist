import { options } from "./constants";
import { generateMoviesWithDetails } from "./dataTransform";

export const fetchMoviesByCategory = async (id: string) => {
  const URL = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`;

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }

    const json = await response.json();
    const movies = await generateMoviesWithDetails(json.results);

    return movies;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
