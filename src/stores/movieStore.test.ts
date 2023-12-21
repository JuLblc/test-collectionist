import { describe, test, expect, beforeEach } from "vitest";
import { useMovieStore } from "../stores/MovieStore";
import { createPinia, setActivePinia } from "pinia";

type TestMovie = {
  id: number;
  title: string;
  isFavorite: boolean;
};

describe("Movie Store", () => {
  let store: any = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useMovieStore();
  });

  const movies: TestMovie[] = [
    { id: 1, title: "Test Movie 1", isFavorite: true },
    { id: 2, title: "Test Movie 2", isFavorite: false },
    { id: 3, title: "Test Movie 3", isFavorite: false },
  ];
  const favoriteMovies: TestMovie[] = [
    { id: 1, title: "Test Movie 1", isFavorite: true },
  ];

  test("isFavorite should return TRUE if the movie is in the favorite list", () => {
    // Arrange
    store.state.favoriteMovies = favoriteMovies;
    // Act
    const result = store.isFavorite(movies[0]);

    // Assert
    expect(result).toBe(true);
  });

  test("isFavorite should return FALSE if the movie is NOT in the favorite list", () => {
    // Arrange
    store.state.favoriteMovies = favoriteMovies;

    // Act
    const result = store.isFavorite(movies[1]);

    // Assert
    expect(result).toBe(false);
  });

  test("updateFavoriteMovies should update the favoriteMovies list correctly", () => {
    // Arrange
    const newMovies = [
      { id: 4, title: "Test Movie 4", isFavorite: true },
      { id: 5, title: "Test Movie 5", isFavorite: false },
    ];

    // Act
    store.updateFavoriteMovies([...movies, ...newMovies]);

    // Assert
    expect(store.state.favoriteMovies).toEqual([movies[0], newMovies[0]]);
  });

  test("updateFavoriteMovies should handle an empty array of movies", () => {
    // Act
    store.updateFavoriteMovies([]);

    // Assert
    expect(store.state.favoriteMovies).toEqual([]);
  });

  test("toggleFavoriteMovie should remove a movie from the favorite list if it is already marked as favorite", () => {
    // Arrange
    store.state.favoriteMovies = [...favoriteMovies];
    store.state.homeMovies = [...movies];

    // Act
    const movieId = 1;
    store.toggleFavoriteMovie(movieId);

    // Assert
    expect(store.state.homeMovies[0].isFavorite).toBe(false);
    expect(store.state.favoriteMovies.length).toEqual(0);
  });

  test("toggleFavoriteMovie should toggle the favorite status of a movie", () => {
    // Arrange
    store.state.homeMovies = [...movies];
    store.state.favoriteMovies = [];

    // Act
    const movieId = 2;
    store.toggleFavoriteMovie(movieId);

    // Assert
    expect(store.state.homeMovies[1].isFavorite).toBe(true);
    const favoriteMovieIds = store.state.favoriteMovies.map(
      (movie: TestMovie) => movie.id
    );
    expect(favoriteMovieIds.includes(movieId)).toBe(true);
  });

  test("updateMovies should update the target state correctly for categoryMovies", () => {
    // Arrange
    const previousMovies: TestMovie[] = [
      { id: 1, title: "Test Movie 1", isFavorite: true },
      { id: 2, title: "Test Movie 2", isFavorite: false },
    ];
    store.state.categoryMovies = previousMovies;

    const newMovies: TestMovie[] = [
      { id: 4, title: "Test Movie 4", isFavorite: false },
      { id: 5, title: "Test Movie 5", isFavorite: false },
    ];

    const favoriteMovies: TestMovie[] = [
      { id: 1, title: "Test Movie 1", isFavorite: true },
      { id: 4, title: "Test Movie 4", isFavorite: true },
    ];
    store.state.favoriteMovies = favoriteMovies;

    // Act
    store.updateCategoryMovies(newMovies);

    // Assert
    const expected = [
      { ...newMovies[0], isFavorite: true },
      { ...newMovies[1], isFavorite: false },
    ];

    // Assert
    expect(store.state.categoryMovies).toStrictEqual(expected);
  });
});
