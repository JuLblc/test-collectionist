<script setup lang="ts">
import { watch } from "vue";
import { fetchMoviesByTrend } from "../services/fetchMoviesByTrend";
import { useMovieStore } from "../stores/MovieStore";
import { MovieWithFavoriteStatus } from "../types";
import MovieCard from "../components/MovieCard.vue";
import LoaderCard from "../components/LoaderCard.vue";
import useFetchDataOnLoad from "../hooks/useFetchDataOnLoad";

const LOADER_CARD_NUMBER_TO_DISPLAY = 4;

const movieStore = useMovieStore();

const fetchHomeMovies = async () => {
  const movies: MovieWithFavoriteStatus[] = await fetchMoviesByTrend();
  return movies;
};

const {
  fetchedData: fetchedMovies,
  isLoading,
  isError,
} = useFetchDataOnLoad({
  fetchData: fetchHomeMovies,
});

watch(isLoading, (newIsLoading) => {
  const shouldUpdateMovies = !newIsLoading && !isError.value;

  if (shouldUpdateMovies && fetchedMovies.value) {
    movieStore.updateHomeMovies(fetchedMovies.value);
  }
});
</script>

<template>
  <div
    class="flex justify-center bg-cover bg-center overflow-hidden"
    :style="{
      minHeight: 'calc(100vh - 64px)',
      backgroundImage:
        'url(https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg)',
    }"
  >
    <div>
      <h2 class="p-4 text-2xl font-bold">MOVIES OF THE MOMENT</h2>

      <div class="grid grid-cols-4 gap-4">
        <LoaderCard
          v-if="isLoading"
          v-for="x in LOADER_CARD_NUMBER_TO_DISPLAY"
          :key="x"
        />
        <MovieCard
          v-else
          :key="movie.id"
          v-for="movie in movieStore.state.homeMovies"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>
