<template>
  <div class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Детали пользователя</h3>
        <button class="close-btn" @click="handleClose">×</button>
      </div>

      <div class="modal-body" v-if="user">
        <div class="user-info">
          <img :src="user.avatar" :alt="user.name" class="user-avatar" />
          <div class="user-main">
            <h2>{{ user.name }}</h2>
            <div class="user-email">{{ user.email }}</div>
            <div class="user-role">{{ user.role }}</div>
          </div>
        </div>

        <div class="user-details">
          <div class="detail-item">
            <span class="detail-label">Отдел:</span>
            <span class="detail-value">{{ user.department }}</span>
          </div>
          <div class="detail-item" v-if="user.phone">
            <span class="detail-label">Телефон:</span>
            <span class="detail-value">{{ user.phone }}</span>
          </div>
          <div class="detail-item" v-if="user.address">
            <span class="detail-label">Адрес:</span>
            <span class="detail-value">{{ user.address }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Последняя активность:</span>
            <span class="detail-value">{{ user.lastActive }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Статус:</span>
            <span class="detail-value" :class="`status-${user.status}`">
              {{ user.status === "active" ? "Активен" : "Неактивен" }}
            </span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="handleClose">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@/types/user";

interface Props {
  user: User;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  line-height: 1;
  padding: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #f0f2f5;
  color: #666;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  max-height: calc(90vh - 140px);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4a90e2;
}

.user-main h2 {
  margin: 0 0 8px 0;
  color: #333;
}

.user-email {
  color: #666;
  margin-bottom: 4px;
}

.user-role {
  display: inline-block;
  padding: 4px 12px;
  background: #e8f4ff;
  color: #4a90e2;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f2f5;
}

.detail-label {
  font-weight: 500;
  color: #666;
}

.detail-value {
  color: #333;
  text-align: right;
}

.status-active {
  color: #4caf50;
  font-weight: 500;
}

.status-inactive {
  color: #f44336;
}

.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid #e1e5e9;
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}
</style>
