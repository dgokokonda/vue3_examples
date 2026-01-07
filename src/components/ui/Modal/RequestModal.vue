<template>
  <Transition name="modal">
    <div v-if="props.show" class="modal-wrapper" tabindex="0">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <p>Заголовок</p>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            <form @submit.prevent="onSubmit">
              <div class="form-control" :class="{ invalid: !!fError }">
                <label for="fio">ФИО</label>
                <input v-model="fio" type="text" id="fio" @blur="fBlur" />
                <small v-if="fError">{{ fError }}</small>
              </div>
              <div class="form-control" :class="{ invalid: !!pError }">
                <label for="phone">Телефон</label>
                <input v-model="phone" type="text" id="phone" @blur="pBlur" />
                <small v-if="pError">{{ pError }}</small>
              </div>
              <div class="form-control" :class="{ invalid: !!aError }">
                <label for="amount">Сумма</label>
                <input
                  v-model.number="amount"
                  type="text"
                  id="amount"
                  @blur="aBlur"
                />
                <small v-if="aError">{{ aError }}</small>
              </div>
              <div class="form-control">
                <label for="status">Статус</label>
                <select v-model="status" id="status">
                  <option value="active">Активен</option>
                  <option value="done">Завершен</option>
                  <option value="cancelled">Отменен</option>
                  <option value="pending ">Выполняется</option>
                </select>
              </div>
              <button class="btn primary" :disabled="isSubmitting">
                Создать
              </button>
            </form>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { useRequestForm } from "@/composables/useRequestForm";
interface Props {
  show: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  created: [];
}>();
const submit = async (values: any) => {
  await console.log(values);
  emit("created");
};
const {
  fio,
  phone,
  amount,
  status,
  fError,
  pError,
  aError,
  fBlur,
  pBlur,
  aBlur,
  onSubmit,
  isSubmitting,
} = useRequestForm(submit);
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
