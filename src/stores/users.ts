import { defineStore } from 'pinia'
import type { User, UserEdit } from './types'
import { ref } from 'vue'
import { BASE_URL } from '@/utils/constants'
import { useFetch } from '@/composables/useFetch'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

  const captureError = (error: { value: unknown }) => {
    if (error && error instanceof Error) throw error.message
    else if (error.value) throw error.value
  }

  const getUsers = async () => {
    try {
      const { data, error, execute } = useFetch<User[]>(`${BASE_URL}/users`, { immediate: true })
      await execute()
      captureError(error)
      if (data.value) users.value = data.value
    } catch (error) {
      console.error(error)
    }
  }

  const deleteUser = async (userId: number) => {
    const { data, error, execute } = useFetch(`${BASE_URL}/users/${userId}`, {
      options: {
        method: 'DELETE',
      },
      immediate: true,
    })
    await execute()
    captureError(error)
    if (data.value) users.value = users.value.filter((u) => u.id !== userId)
  }

  const saveUser = async (editForm: UserEdit) => {
    try {
      if (editForm.id) {
        const { data, error, execute } = useFetch(`${BASE_URL}/users/${editForm.id}`, {
          options: {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editForm),
          },
          immediate: true,
        })
        await execute()
        captureError(error)

        if (!data.value) return

        const index = users.value.findIndex((u) => u.id === editForm.id)
        if (index !== -1) {
          users.value[index] = { ...users.value[index], ...editForm }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.error('Ошибка при сохранении: ' + err.message)
    }
  }

  return {
    users,
    getUsers,
    saveUser,
    deleteUser,
  }
})
