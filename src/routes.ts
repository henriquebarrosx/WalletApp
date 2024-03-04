import { createRouter, createWebHistory } from "vue-router"

import HomePage from "./pages/HomePage/index.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage }
  ]
})