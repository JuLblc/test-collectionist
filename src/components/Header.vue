<script setup lang="ts">
import home from "../assets/icons/home.svg";
import Link from "../components/Base/Link.vue";
</script>
<template>
  <nav class="bg-black p-4 pr-8 pl-8 flex justify-between items-center">
    <router-link to="/">
      <img class="w-8 h-8" :src="home" alt="Home" />
    </router-link>
    <div class="flex space-x-4">
      <Link link="/movies/28" label="Movies" />
      <span class="text-white">|</span>
      <Link link="/favorites" label="Favorites" />
    </div>
  </nav>
</template>
