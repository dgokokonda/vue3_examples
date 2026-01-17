<template>
  <div class="mx-auto w-1/2 p-4">
    <div class="mb-4">
      <NuxtLink
        :to="{ name: 'posts-create' }"
        class="inline-block text-white px-3 py-2 bg-sky-600 border border-sky-700"
        >Create post</NuxtLink
      >
      <!-- <button @click="executePosts" class="text-green-600 ml-4 mb-4">
        Loading posts
      </button> -->
    </div>
    <div>
      <span v-if="pendingPosts">Loading posts...</span>
      <div class="error" v-if="error">{{ error }}</div>
      <div v-if="status === 'success'" class="">
        <div
          v-for="post in postsData"
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
          <button @click="deletePost(post.id)" class="text-red-600 ml-4">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "main",
});

const {
  data: postsData,
  pending,
  error,
  // execute: executePosts,
  status,
  pending: pendingPosts,
} = await useFetch("http://localhost:3001/posts", {
  // key: "posts", // кжшируем результаты для роутов
  // immediate: false, // откладываем загрузку до клика на кнопку загрузки
  // onResponse: () => console.log(22222),
});

const deletePost = async (postId) => {
  const res = await $fetch(`http://localhost:3001/posts/${postId}`, {
    method: "DELETE",
  });
  console.log(res);
  // postsData.value = postsData.value.filter(({ id }) => id !== postId);
  // executePosts();
};
// console.log(postsData);

// SEO meta data
// useHead({
//   title: "My App",
//   meta: [{ name: "description", content: "My amazing site." }],
//   bodyAttrs: {
//     class: "test",
//   },
//   script: [{ innerHTML: "console.log('Hello world')" }],
// });
</script>
