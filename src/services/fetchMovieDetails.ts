import { APIMovie, MovieWithFavoriteStatus } from "../types";
import { options } from "./constants";
import { transformAPIData } from "./dataTransform";

export const fetchMovieDetails = async (id: number) => {
  const URL = `https://api.themoviedb.org/3/movie/${id}`;

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }

    const json = await response.json();

    const apiMovieDetails: APIMovie = json;
    const movie: MovieWithFavoriteStatus = transformAPIData(apiMovieDetails);

    return movie;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
