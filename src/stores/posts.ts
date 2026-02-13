import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post, PostForm } from '@/stores/types.ts'
import { BASE_URL } from '@/utils/constants'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const getPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`)
      posts.value = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  const post = ref<Post | null>(null)
  const getPost = async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/posts/${id}`)
      post.value = await res.json()
    } catch (error) {
      console.error(error)
    }
  }

  const changePost = (id: number, newPost: Post) => {
    const findIndex = posts.value.findIndex((p) => p.id === id)

    if (findIndex < 0 || !post.value) {
      return
    }

    // posts.value[findIndex] = { ...posts.value[findIndex], ...newPost }
    posts.value.splice(findIndex, 1, newPost)
  }

  const editPost = async (id: number, body: PostForm) => {
    try {
      const data = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // заголовок обязателен!
        },
        body: JSON.stringify(body),
      })

      if (!data.ok) throw new Error('HTTP ' + data.status)
      const updatedPost = await data.json()

      post.value = updatedPost

      changePost(id, updatedPost)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    posts,
    getPosts,
    post,
    getPost,
    editPost,
  }
})
