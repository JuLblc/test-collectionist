<script setup lang="ts">
import { useMovieStore } from "../stores/MovieStore";
import { MovieWithFavoriteStatus } from "../types";
import favorite from "../assets/icons/favorite.svg";
import favoriteFilled from "../assets/icons/favoriteFilled.svg";
import { convertMinutesToReadableTime } from "../helpers";

const props = defineProps({
  movie: {
    type: Object as () => MovieWithFavoriteStatus,
    required: true,
  },
});

const movieTimeLength = convertMinutesToReadableTime(props.movie.runtime);
const movieStore = useMovieStore();

const toggleFavorite = () => {
  movieStore.toggleFavoriteMovie(props.movie.id);
};
</script>

<template>
  <div class="relative w-72 rounded overflow-hidden group">
    <div
      class="bg-cover bg-center h-108 transition-opacity group-hover:opacity-0"
      :style="{
        backgroundImage:
          'url(https://image.tmdb.org/t/p/original' +
          props.movie.poster_path +
          ')',
      }"
    ></div>
    <div
      class="absolute top-0 left-0 w-full h-full p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black flex flex-col justify-between text-white"
    >
      <div class="flex justify-between">
        <h3 class="text-xl font-semibold mb-2">{{ props.movie.title }}</h3>
        <span
          @click="toggleFavorite()"
          class="cursor-pointer min-w-[30px] flex items-center"
          ><img
            class="w-8 h-8"
            :src="props.movie.isFavorite ? favoriteFilled : favorite"
            alt="Favorite"
        /></span>
      </div>
      <article class="text-gray-200 mt-2 max-h-48 line-clamp-8">
        {{ props.movie.overview }}
      </article>
      <div class="flex justify-between mt-4">
        <span class="text-yellow-400 font-bold"
          >{{ props.movie.vote_average.toFixed(1) }} / 10</span
        >
        <span>{{ movieTimeLength }}</span>
      </div>
    </div>
  </div>
</template>
