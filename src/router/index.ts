// пути страниц, lazy load, guards и т. д
import store from "../store";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import TodoListView from "@/views/TodoListView.vue";
import DebugView from "@/views/DebugView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/todolist",
    name: "todolist",
    component: TodoListView,
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/debug",
    name: "debug",
    component: DebugView,
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/AuthView.vue"),
    meta: {
      layout: "auth",
      auth: false, // не требует авторизацию
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiredAuth = to.meta.auth;

  if (requiredAuth && store.getters["auth/isAuthenticated"]) next();
  else if (requiredAuth && !store.getters["auth/isAuthenticated"]) {
    next("/auth?message=auth");
  } else next();
});

export default router;
