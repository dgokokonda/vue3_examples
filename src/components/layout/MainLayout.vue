<template>
  <Navbar />
  <div class="container">
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/about">Go to About</RouterLink>
      <RouterLink to="/todolist">Go to TodoList</RouterLink>
      <RouterLink to="/debug">Go to Debug</RouterLink>
    </nav>
  </div>
  <main>
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import Navbar from "../ui/Navbar/Navbar.vue";
</script>
