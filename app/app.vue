<template>
  <div class="container p-10 bg-gray-50 min-h-screen">
    <h1 class="text-gray-700 mb-4">Учебное приложение на Nuxt 4</h1>
    <!-- SEO meta data: -->
    <!-- <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
      <Style> body { background-color: green; } </Style>
    </Head> -->
    <div class="flex gap-2">
      <NuxtLink class="text-blue-600 hover:text-blue-800" to="/about"
        >О нас</NuxtLink
      >
      <NuxtLink class="text-blue-600 hover:text-blue-800" to="/posts"
        >Posts</NuxtLink
      >
      <NuxtLink class="text-blue-600 hover:text-blue-800" to="/counter"
        >Counter</NuxtLink
      >
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
// import { ref } from "vue";
console.log("test", useNuxtApp());

const globalTheme = useState("theme", () => "light");
// setTimeout(() => {
//   console.log(2, globalTheme.value); // dark, т.к. изменили в другом компоненте
// }, 10000);

// const title = ref("Приложение на Nuxt");
</script>
