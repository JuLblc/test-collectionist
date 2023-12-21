<script setup lang="ts">
import { watch } from "vue";
import Tabs from "../components/Base/Tabs.vue";
import { fetchMoviesByCategory } from "../services/fetchMoviesByCategory";
import { useMovieStore } from "../stores/MovieStore";
import MovieCard from "../components/MovieCard.vue";
import LoaderCard from "../components/LoaderCard.vue";
import useFetchDataOnRouteUpdate from "../hooks/useFetchDataOnRouteUpdate";

export type Category = {
  id: number;
  label: string;
};

const CATEGORIES: Category[] = [
  { id: 28, label: "ACTION" },
  { id: 16, label: "ANIMATION" },
  { id: 12, label: "ADVENTURE" },
  { id: 35, label: "COMEDY" },
  { id: 99, label: "DOCUMENTARY" },
];

const LOADER_CARD_NUMBER_TO_DISPLAY = 8;

const movieStore = useMovieStore();

const {
  fetchedData: fetchedMovies,
  isLoading,
  isError,
} = useFetchDataOnRouteUpdate({
  fetchData: fetchMoviesByCategory,
});

watch(isLoading, (newIsLoading) => {
  const shouldUpdateMovies = !newIsLoading && !isError.value;

  if (shouldUpdateMovies && fetchedMovies.value) {
    movieStore.updateCategoryMovies(fetchedMovies.value);
  }
});
</script>

<template>
  <div class="flex justify-center">
    <div class="mb-8">
      <Tabs :items="CATEGORIES" />
      <div class="grid grid-cols-4 gap-4">
        <LoaderCard
          v-if="isLoading"
          v-for="x in LOADER_CARD_NUMBER_TO_DISPLAY"
          :key="x"
        />
        <MovieCard
          v-else
          v-for="movie in movieStore.state.categoryMovies"
          :movie="movie"
          :key="movie.id"
          :isLoading="isLoading"
        />
      </div>
    </div>
  </div>
</template>
