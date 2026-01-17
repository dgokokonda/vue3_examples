<template>
  <div class="mx-auto w-1/2 p-4">
    <h4>Create post</h4>
    <form @submit="storePost" class="form">
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
          v-model="post.title"
          placeholder="title"
          type="text"
          id="title"
        />
      </div>
      <div class="field-item">
        <label for="content">Content</label>
        <textarea
          v-model="post.content"
          placeholder="content"
          id="content"
        ></textarea>
      </div>
      <div class="btn">
        <a @click.prevent="storePost" href="#">Create</a>
      </div>
    </form>
  </div>
</template>
<script setup>
import { reactive } from "vue";

definePageMeta({
  layout: "main",
});

const post = reactive({
  title: "",
  content: "",
});
const pending = ref(false);
const storePost = async () => {
  try {
    pending.value = true;
    const res = await $fetch("http://localhost:3001/posts", {
      method: "POST",
      body: JSON.stringify(post),
      // headers: {
      //   "Content-Type": "application/json"
      // }
    });
    console.log(res);
    Object.assign(post, { title: "", content: "" });
  } catch (error) {
    console.error(error);
  } finally {
    pending.value = false;
  }
};
</script>
