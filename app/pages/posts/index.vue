<template>
  <div class="mx-auto w-1/2 p-4">
    <div class="mb-4">
      <NuxtLink
        :to="{ name: 'posts-create' }"
        class="inline-block text-white px-3 py-2 bg-sky-600 border border-sky-700"
        >Create post</NuxtLink
      >
    </div>
    <div>
      <div class="cursor-pointer" @click="postStore.executePosts">EXECUTE</div>
      <!-- <span v-if="pendingPosts">Loading posts...</span>
      <div class="error" v-if="error">{{ error }}</div>
      <div v-if="status === 'success'" class=""> -->
      <div
        v-for="post in postStore.posts"
        class="bg-white w-full p-4 border border-gray-200 mb-4"
      >
        <h3 class="mb-2 text-lg text-gray-700">
          <NuxtLink :to="{ name: 'posts-id', params: { id: post.id } }">
            {{ post.title || "[empty title]" }}
          </NuxtLink>
        </h3>
        <p
          class="text-xs text-gray-500"
          v-html="post.content || '[empty content]'"
        ></p>
        <!-- <PostItem /> -->
        <NuxtLink :to="{ name: 'posts-id-edit', params: { id: post.id } }"
          >Edit</NuxtLink
        >
        <button
          @click="postStore.deletePost(post.id)"
          class="text-red-600 ml-4"
        >
          Delete
        </button>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "main",
  // middleware: "auth",
});

// utils:
// console.log(getRandomNumber());

// plugin:
// const { $hello } = useNuxtApp();
// $hello("test11");
// console.log(useNuxtApp());

// api plugin:
// const { $apiClient } = useNuxtApp();
// const { data: posts, pending, refresh } = await $apiClient.getPostsAsync();
// console.log(posts.value);

const postStore = usePostStore();
await postStore.getPosts();
</script>
<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
