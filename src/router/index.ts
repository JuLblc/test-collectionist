import { createRouter, createWebHistory } from "vue-router";
import FavoritesVue from "../views/Favorites.vue";
import HomeVue from "../views/Home.vue";
import MoviesVue from "../views/Movies.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeVue,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesVue,
    },
    {
      path: "/movies/:id",
      name: "movies",
      component: MoviesVue,
    },
  ],
});

export default router;
