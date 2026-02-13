<template>
  <Teleport to="body">
    <div class="modal">
      <div class="modal-wrapper">
        <h2>Редактировать пользователя</h2>
        <form @submit.prevent="$emit('save')">
          <div>
            <label>Имя:</label>
            <input v-model="firstName" />
          </div>
          <div>
            <label>Фамилия:</label>
            <input v-model="lastName" />
          </div>
          <div>
            <label>Email:</label>
            <input v-model="email" type="email" />
          </div>
          <div>
            <label>Роль:</label>
            <select v-model="role">
              <option value="user">Пользователь</option>
              <option value="moderator">Модератор</option>
              <option value="admin">Администратор</option>
            </select>
          </div>
          <div>
            <label>Подписка:</label>
            <input v-model="plan" placeholder="План" />
            <select v-model="status">
              <option value="active">Активна</option>
              <option value="expired">Истекла</option>
              <option value="pending">Ожидает</option>
            </select>
          </div>
          <button type="submit">Сохранить</button>
          <button type="button" @click="$emit('close')">Отмена</button>
        </form>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
const email = defineModel('email')
const role = defineModel('role')
const status = defineModel('status')
const plan = defineModel('plan')
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal-wrapper {
  background: white;
  width: 400px;
  margin: 100px auto;
  padding: 20px;
}
</style>
