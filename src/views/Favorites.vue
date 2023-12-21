<script setup lang="ts">
import { useMovieStore } from "../stores/MovieStore";
import MovieCard from "../components/MovieCard.vue";

const movieStore = useMovieStore();
</script>

<template>
  <div class="flex justify-center">
    <div class="mb-8">
      <h2 class="p-4 text-2xl font-bold">YOUR FAVORITES</h2>
      <div class="grid grid-cols-4 gap-4">
        <MovieCard
          v-if="movieStore.state.favoriteMovies.length"
          :key="movie.id"
          v-for="movie in movieStore.state.favoriteMovies"
          :movie="movie"
        />
        <div class="w-72 h-108 p-4" v-else>
          <p>No favorite movies yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>
