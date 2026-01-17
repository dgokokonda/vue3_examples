<template>
  <div class="</div>">
    <h1>Edit post</h1>
    <form @submit.prevent="postStore.editPost" class="form">
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
        <a @click.prevent="postStore.editPost" href="#">Edit</a>
      </div>
    </form>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "main",
});
const postStore = usePostStore();
await postStore.getPost(useRoute());
</script>
