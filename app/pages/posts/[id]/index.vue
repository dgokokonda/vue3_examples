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
    <div v-if="post">
      <h3 class="mb-2 text-lg text-gray-700">{{ post.title }}</h3>
      <p class="text-xs text-gray-500">{{ post.content }}</p>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "main",
});

const { getPost } = usePost();

const post = await getPost();
</script>
