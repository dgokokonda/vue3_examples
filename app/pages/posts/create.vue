<template>
  <div class="mx-auto w-1/2 p-4">
    <h4>Create post</h4>
    <form @submit="postStore.addPost" class="form">
      <div class="mb-4">
        <NuxtLink
          :to="{ name: 'posts' }"
          class="inline-block text-white px-3 py-2 bg-sky-600 border border-sky-700"
          >Назад</NuxtLink
        >
      </div>
      <div class="field-item">
        <label for="title">Title</label>
        <input
          v-model="postStore.post.title"
          placeholder="title"
          type="text"
          id="title"
        />
      </div>
      <div class="field-item">
        <label for="content">Content</label>
        <textarea
          v-model="postStore.post.content"
          placeholder="content"
          id="content"
        ></textarea>
      </div>
      <div class="btn">
        <a @click.prevent="postStore.addPost" href="#">Create</a>
      </div>
    </form>
  </div>
</template>
<script setup>
import { onMounted } from "vue";

definePageMeta({
  layout: "main",
});

const postStore = usePostStore();

onMounted(() => {
  postStore.post = {};
});
</script>
