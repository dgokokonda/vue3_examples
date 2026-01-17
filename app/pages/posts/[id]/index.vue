<template>
  <div class="post mx-auto w-1/2 p-4">
    <div class="mb-4">
      <NuxtLink
        :to="{ name: 'posts' }"
        class="inline-block text-white px-3 py-2 bg-sky-600 border border-sky-700"
        >Назад</NuxtLink
      >
    </div>
    <h1><b>Post card</b></h1>
    <h3 class="mb-2 text-lg text-gray-700">{{ post.title }}</h3>
    <p class="text-xs text-gray-500">{{ post.content }}</p>
  </div>
</template>
<script setup>
import { useRoute } from "nuxt/app";
definePageMeta({
  layout: "main",
});

const route = useRoute();
const postId = route.params.id;
const { data: post } = await useFetch(`http://localhost:3001/posts/${postId}`);
</script>
