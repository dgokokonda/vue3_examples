<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { usePostsStore } from '@/stores/posts.ts'
import PageLayout from '@/components/PageLayout.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import type { Post } from '@/stores/types.ts'
import NavigateButton from '@/components/NavigateButton.vue'
import BaseTag from '@/components/BaseTag.vue'
import BaseSubscribeForm from '@/components/BaseSubscribeForm.vue'
import RefactoreComponent from '@/components/RefactoreComponent.vue'
import SignupForm from '@/components/SignupForm.vue'

const postsStore = usePostsStore()
const search = ref('')
const filteredPosts = computed((): Post[] => {
  if (search.value) {
    return postsStore.posts.filter((post: Post) =>
      post.title.toLowerCase().includes(search.value.toLowerCase()),
    )
  }
  return postsStore.posts
})
const loadPosts = async () => {
  if (!postsStore.posts.length) {
    try {
      await postsStore.getPosts()
    } catch (error) {
      console.error(error)
    }
  }
}

const initialCart = ref([
  {
    name: 'Notebook',
    id: 1,
    price: 100000,
    quantity: 1,
    image: 'https://ir.ozone.ru/s3/multimedia-1-3/7152527091.jpg',
  },
])

onMounted(() => {
  loadPosts()
})
</script>

<template>
  <PageLayout title="Home">
    <SignupForm />
    <RefactoreComponent :initialCart="initialCart" userId="1" />
    <BaseSubscribeForm />
    <BaseSearch :model-value="search" @update:modelValue="(val) => (search = val)" />

    <div v-for="post in filteredPosts" :key="post.id" class="post">
      <div class="post__row">
        <router-link :to="`/posts/${post.id}`" class="post__title">
          {{ post.title }}
        </router-link>

        <NavigateButton :to="`/posts/${post.id}/edit`">Edit</NavigateButton>
      </div>

      <p>{{ post.body }}</p>

      <div class="post__row">
        <div class="post__tags">
          <BaseTag v-for="tag in post.tags" :key="tag">{{ tag }}</BaseTag>
        </div>

        <div class="post__counts">
          <span>views: {{ post.views }}</span>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  gap: 1rem;

  .post__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post__title {
    font-weight: 600;
  }

  .post__tags {
    display: flex;
    gap: 1rem;
  }

  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
