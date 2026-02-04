<template>
  <div
    class="nav flex gap-6 p-6 my-4 bg-blue-950 flex justify-center items-center"
  >
    <NuxtLink class="text-blue-600 hover:text-blue-800" to="/"
      >Главная</NuxtLink
    >
    <NuxtLink class="text-blue-600 hover:text-blue-800" to="/about"
      >О нас</NuxtLink
    >
    <NuxtLink class="text-blue-600 hover:text-blue-800" to="/posts"
      >Posts</NuxtLink
    >
    <NuxtLink class="text-blue-600 hover:text-blue-800" to="/person-form"
      >Person Form</NuxtLink
    >
    <NuxtLink class="text-blue-600 hover:text-blue-800" to="/counter"
      >Counter</NuxtLink
    >
  </div>
</template>
<style scoped>
.router-link-exact-active {
  color: #e100ff;
}
</style>
