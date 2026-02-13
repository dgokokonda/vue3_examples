<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { usePostsStore } from '@/stores/posts.ts'
import { useRoute } from 'vue-router'
import PageLayout from '@/components/PageLayout.vue'
import NavigateButton from '@/components/NavigateButton.vue'
import BaseTag from '@/components/BaseTag.vue'

const route = useRoute()
const postId = computed(() => +route.params.id)

const postsStore = usePostsStore()
onMounted(async () => {
  if (postsStore.post?.id !== postId.value) {
    // TODO: сделано для того, чтобы видеть изменения поста (API фейковое)
    await postsStore.getPost(postId.value)
  }
})
</script>

<template>
  <PageLayout title="Post" is-back-button>
    <div v-if="postsStore.post" class="post post_full">
      <div class="post__row">
        <h3 class="post__title">{{ postsStore.post.title }}</h3>

        <NavigateButton :to="`/posts/${postsStore.post.id}/edit`">Edit</NavigateButton>
      </div>

      <p>{{ postsStore.post.body }}</p>

      <div class="post__row">
        <div class="post__tags">
          <BaseTag v-for="tag in postsStore.post.tags" :key="tag">{{ tag }}</BaseTag>
        </div>

        <div class="post__counts">
          <span>views: {{ postsStore.post.views }}</span>
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

  &.post_full {
    h3 {
      font-size: 1.4rem;
    }

    p {
      overflow: auto;
      -webkit-line-clamp: none;
    }
  }
}
</style>
