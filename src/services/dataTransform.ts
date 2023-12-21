import { APIMovie, AnyObjectWithId, MovieWithFavoriteStatus } from "../types";
import { fetchMovieDetails } from "./fetchMovieDetails";

export const transformAPIData = (
  apiMovie: APIMovie
): MovieWithFavoriteStatus => {
  const { id, title, poster_path, runtime, overview, vote_average } = apiMovie;

  return {
    id,
    title,
    poster_path,
    runtime,
    overview,
    vote_average,
    isFavorite: false,
  };
};

export const selectRandomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = array.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const generateMoviesWithDetails = async (jsonResult: any) => {
  const apiMovies: AnyObjectWithId[] = jsonResult;
  const apiMovieIds = apiMovies.map((movie) => movie.id);
  const movies: MovieWithFavoriteStatus[] = await Promise.all(
    apiMovieIds.map(async (id) => await fetchMovieDetails(id))
  );

  return movies;
};
