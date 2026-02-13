<template>
  <div class="user">
    <img loading="lazy" :src="user.avatar || 'default.jpg'" width="50" height="50" />
    <h3>{{ user.firstName }} {{ user.lastName }}</h3>
    <p>{{ user.email }}</p>
    <p>
      {{ userRole }}
    </p>

    <!-- 'Basic', 'Premium', 'Enterprise' -->
    <div v-if="user.subscription">
      <p>Подписка: {{ user.subscription.plan }} - {{ user.subscription.status }}</p>
      <p v-if="user.subscription.expiresAt">
        Действует до: {{ formatDate(user.subscription.expiresAt) }}
      </p>
    </div>

    <button @click="$emit('deleteUser', user.id)">Удалить</button>
    <button @click="$emit('openModal', user)">Редактировать</button>
  </div>
</template>
<script setup lang="ts">
import type { User } from '@/stores/types'
import { computed } from 'vue'
import { USER_ROLES, USER_ROLE_ADMIN, USER_ROLE_MODERATOR } from '@/utils/constants'

const props = defineProps<{
  user: User
}>()

defineEmits<{
  (e: 'deleteUser', userId: number): void
  (e: 'openModal', user: User): void
}>()

function formatDate(date: string) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('ru-RU')
}

const userRole = computed(() =>
  props.user.role === USER_ROLE_ADMIN
    ? USER_ROLES.USER_ROLE_ADMIN
    : props.user.role === USER_ROLE_MODERATOR
      ? USER_ROLES.USER_ROLE_MODERATOR
      : USER_ROLES.USER_ROLE_USER,
)
</script>
