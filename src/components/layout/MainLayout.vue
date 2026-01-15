<template>
  <Navbar />
  <Sidebar />
  <div class="container">
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/about">Go to About</RouterLink>
      <RouterLink to="/todolist">Go to TodoList</RouterLink>
      <RouterLink to="/debug">Go to Debug</RouterLink>
    </nav>
  </div>
  <main>
    <Alert v-if="message" />
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import Navbar from "../ui/Navbar/Navbar.vue";
import Alert from "../ui/Alert/Alert.vue";
import Sidebar from "../ui/Sidebar/Sidebar.vue";
import { useAppStore } from "@/stores";
import { computed } from "vue";
const appStore = useAppStore();
const message = computed(() => appStore.message);
</script>
