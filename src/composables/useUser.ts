import { useUsersStore } from '@/stores/users'
import { ref, computed, onMounted } from 'vue'
import type { User, UserEdit } from '@/stores/types'
// import { storeToRefs } from 'pinia'

export function useUser() {
  const usersStore = useUsersStore()
  const users = computed(() => usersStore.users || [])
  // const { users } = storeToRefs(usersStore) // альтернатива users при использовании в компоненте, не композабле
  const loading = ref(true)
  const error = ref('')
  const showEditModal = ref(false)

  const pageTitle = computed(() => {
    if (users.value.length > 0) {
      return `Управление пользователями (${users.value.length})`
    }
    return 'Управление пользователями'
  })

  const editForm = ref<UserEdit>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    subscription: {
      plan: '',
      status: 'pending',
      expiresAt: null,
    },
  })

  onMounted(async () => {
    fetchUsers()
  })

  async function fetchUsers() {
    loading.value = true
    error.value = ''

    if (!users.value.length) {
      try {
        await usersStore.getUsers()
        loading.value = false
      } catch (err) {
        if (err instanceof Error) {
          console.error(err)
          error.value = err.message
        }
      }
    }
  }

  async function onDeleteUser(userId: number) {
    if (!confirm('Вы уверены?')) return
    try {
      await usersStore.deleteUser(userId)
    } catch (err) {
      if (err instanceof Error) console.error('Ошибка при удалении: ' + err.message)
    }
  }

  function onEditUser(user: User) {
    editForm.value = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      subscription: user.subscription
        ? { ...user.subscription }
        : {
            plan: '',
            status: 'pending',
            expiresAt: null,
          },
    }
    showEditModal.value = true
  }

  async function saveUser() {
    try {
      await usersStore.saveUser(editForm.value)
      showEditModal.value = false
    } catch (error: unknown) {
      if (error instanceof Error) console.error('Ошибка при сохранении: ' + error.message)
    }
  }

  return {
    pageTitle,
    users,
    editForm,
    showEditModal,
    loading,
    error,
    saveUser,
    onDeleteUser,
    onEditUser,
  }
}
