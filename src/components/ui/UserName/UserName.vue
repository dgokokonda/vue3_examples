<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
const firstNameModel = defineModel('firstName')
const lastNameModel = defineModel('lastName')

interface UserIdInjection {
  userId: Ref<string>
  updateUserId: () => void
}

const { userId, updateUserId } = inject('userId') as UserIdInjection
setTimeout(updateUserId, 1000) // обновляем значение

const firstName = computed({
  get: () => firstNameModel.value,
  set: (value: string) => firstNameModel.value = value.toUpperCase()
})

const lastName = computed({
  get: () => lastNameModel.value,
  set: (value: string) => lastNameModel.value = value.toUpperCase()
})
</script>
<template>
  <div :data-id="userId">
    <label for="first">Имя</label>
    <input type="text" v-model="firstName" id="first">
    <label for="last">Фамилия</label>
    <!-- v-uppercase.input -->
    <input type="text" v-model="lastName" id="last">
  </div>

</template>