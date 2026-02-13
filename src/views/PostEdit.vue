<script setup lang="ts">
import { onMounted, reactive, watch, computed } from 'vue'
import { usePostsStore } from '@/stores/posts.ts'
import { useRoute, useRouter } from 'vue-router'
import type { PostForm } from '@/stores/types.ts'
import PageLayout from '@/components/PageLayout.vue'
import BaseButton from '@/components/BaseButton.vue'

const form = reactive<PostForm>({
  title: '',
  body: '',
})

const route = useRoute()
const postId = computed(() => +route.params.id)
const postsStore = usePostsStore()

onMounted(async () => {
  if (postsStore.post?.id !== postId.value) {
    try {
      await postsStore.getPost(postId.value)
    } catch (error) {
      console.error(error)
    }
  }
})

const router = useRouter()
const onSave = async () => {
  if (!postsStore.post) {
    return
  }

  try {
    await postsStore.editPost(postId.value, form)
  } catch (error) {
    console.error(error)
  }

  router.back()
}

watch(
  () => postsStore.post,
  (newPost) => {
    if (newPost && newPost.id === postId.value) {
      form.title = newPost.title
      form.body = newPost.body
    }
  },
  { immediate: true },
)
</script>

<template>
  <PageLayout title="Post Edit" class="post-edit" is-back-button>
    <form @submit.prevent="onSave">
      <label for="title">
        Title
        <input id="title" v-model.trim="form.title" type="text" placeholder="Title" />
      </label>

      <label for="body">
        Text
        <textarea id="body" v-model.trim="form.body" type="text" placeholder="Text" rows="10" />
      </label>

      <BaseButton type="submit">Save</BaseButton>
    </form>
  </PageLayout>
</template>

<style scoped>
.post-edit form {
  display: flex;
  flex-direction: column;

  input,
  textarea {
    width: 100%;
    margin-bottom: 10px;
  }

  button {
    margin: 0 auto;
  }
}
</style>
