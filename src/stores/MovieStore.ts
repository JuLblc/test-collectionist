import { defineStore } from "pinia";
import { reactive } from "vue";
import { MovieWithFavoriteStatus } from "../types";
import { removeDuplicates } from "../helpers";

type State = {
  categoryMovies: MovieWithFavoriteStatus[];
  homeMovies: MovieWithFavoriteStatus[];
  favoriteMovies: MovieWithFavoriteStatus[];
};

export const useMovieStore = defineStore("movieStore", () => {
  const state: State = reactive({
    categoryMovies: [],
    homeMovies: [],
    favoriteMovies: [],
  });

  const isFavorite = (movie: MovieWithFavoriteStatus) => {
    const favoriteMovieIds = state.favoriteMovies.map(({ id }) => id);

    return favoriteMovieIds.includes(movie.id);
  };

  const updateMovies = (
    movies: MovieWithFavoriteStatus[],
    targetState: MovieWithFavoriteStatus[]
  ) => {
    movies.forEach((movie, index) => {
      targetState[index] = {
        ...movie,
        isFavorite: isFavorite(movie),
      };
    });
  };

  const updateCategoryMovies = (newMovies: MovieWithFavoriteStatus[]) => {
    updateMovies(newMovies, state.categoryMovies);
  };

  const updateHomeMovies = (newMovies: MovieWithFavoriteStatus[]) => {
    updateMovies(newMovies, state.homeMovies);
  };

  const toggleFavoriteMovie = (movieId: number) => {
    const allMovies = removeDuplicates([
      ...state.favoriteMovies,
      ...state.homeMovies,
      ...state.categoryMovies,
    ]);

    const movie = allMovies.find(({ id }) => id === movieId);
    if (movie) {
      movie.isFavorite = !movie.isFavorite;
    }

    updateFavoriteMovies(allMovies);
  };

  const updateFavoriteMovies = (newMovies: MovieWithFavoriteStatus[]) => {
    state.favoriteMovies = newMovies.filter(({ isFavorite }) => isFavorite);
  };

  return {
    state,
    isFavorite,
    updateFavoriteMovies,
    updateCategoryMovies,
    updateHomeMovies,
    toggleFavoriteMovie,
  };
});
