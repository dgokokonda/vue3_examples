<template>
  <div>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h1>{{ pageTitle }}</h1>

      <BaseUser
        v-for="user in users"
        :key="user.id"
        :user="user"
        @deleteUser="onDeleteUser"
        @openModal="onEditUser"
        class="user-wrapper"
      />

      <BaseUserEditModal
        v-if="showEditModal"
        v-model:firstName="editForm.firstName"
        v-model:lastName="editForm.lastName"
        v-model:email="editForm.email"
        v-model:role="editForm.role"
        v-model:plan="editForm.subscription.plan"
        v-model:status="editForm.subscription.status"
        @close="showEditModal = false"
        @save="saveUser"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseUser from './BaseUser.vue'
import BaseUserEditModal from './BaseUserEditModal.vue'
import { useUser } from '@/composables/useUser'

const {
  pageTitle,
  users,
  editForm,
  showEditModal,
  loading,
  error,
  saveUser,
  onDeleteUser,
  onEditUser,
} = useUser()
</script>
<style scoped>
.user-wrapper {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}
</style>
