// пути страниц, lazy load, guards и т. д

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import TodoListView from '@/views/TodoListView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  {path: '/todolist', name: 'todolist', component: TodoListView}
]

export default createRouter({
  history: createWebHistory(),
  routes
})