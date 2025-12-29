<template>
  <Transition name="modal">
    <div
      v-if="props.show"
      class="modal-wrapper"
      tabindex="0"
      @keydown.esc="$emit('close')"
    >
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <p>Привет из модального окна!</p>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">Содержимое модалки</slot>
          <Suspense
            @pending="onPending"
            @resolve="onResolve"
            @fallback="onFallback"
          >
            <AsyncModalData />

            <template #fallback>
              <div class="loading">
                <div class="spinner"></div>
                Загрузка данных от Suspense...
              </div>
            </template>
          </Suspense>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button
              @click="$emit('close')"
              class="default-btn"
              @keydown.esc="$emit('close')"
            >
              Закрыть
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
interface Props {
  show: boolean;
}
const props = defineProps<Props>();

const onPending = () => console.log("is pending");
const onResolve = () => console.log("resolved");
const onFallback = () => console.log("fallback");

const AsyncModalData = defineAsyncComponent({
  loader: () => import("./AsyncModalData.vue"),
  loadingComponent: {
    template:
      '<div class="loading"><div class="spinner"></div>Загрузка данных формы...</div>',
  },
  errorComponent: {
    template: '<div class="error">Ошибка загрузки данных...</div>',
  },
  delay: 200,
  timeout: 5000,
});
</script>
<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3,
.modal-header p {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer .default-btn {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
  display: flex;
  align-items: center;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
