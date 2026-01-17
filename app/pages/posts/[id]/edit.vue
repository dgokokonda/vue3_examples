<template>
  <div class="</div>">
    <h1>Edit post</h1>
    <form submit="updatePost" class="form">
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
          v-model="postData.title"
          placeholder="title"
          type="text"
          id="title"
        />
      </div>
      <div class="field-item">
        <label for="content">Content</label>
        <textarea
          v-model="postData.content"
          placeholder="content"
          id="content"
        ></textarea>
      </div>
      <div class="btn">
        <a @click.prevent="updatePost" href="#">Edit</a>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useRoute } from "nuxt/app";

definePageMeta({
  layout: "main",
});

const route = useRoute();
const postId = route.params.id;
const { data: postData } = await useFetch(
  `http://localhost:3001/posts/${postId}`,
);

const updatePost = async () => {
  const res = await $fetch(`http://localhost:3001/posts/${postId}`, {
    method: "PATCH",
    body: JSON.stringify(postData.value),
  });
  console.log(res);
};
</script>
