import { createRouter, createWebHistory } from "vue-router"

import HomePage from "./pages/HomePage/index.vue"
import SignUpPage from "./pages/SignUp/index.vue"
import SignInPage from "./pages/SignIn/index.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/signup", component: SignUpPage },
    { path: "/signin", component: SignInPage },
  ]
})