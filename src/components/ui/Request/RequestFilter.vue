<template>
  <div class="request-filter">
    <input type="text" v-model="name" placeholder="Поиск по ФИО" />
    <select v-model="status" placeholder="Выберите статус">
      <option value="active">Активен</option>
      <option value="done">Завершен</option>
      <option value="cancelled">Отменен</option>
      <option value="pending">Выполняется</option>
    </select>
    <button v-if="isActive" class="btn warning" @click="clear">Очистить</button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
// const props = defineProps<{
//   modelValue: { name: string; status: string };
// }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: { name: string; status: string }): void;
}>();

const name = ref("");
const status = ref("");
const isActive = computed(() => {
  return name.value || status.value;
});

watch([name, status], ([newName, newStatus]) => {
  emit("update:modelValue", { name: newName, status: newStatus });
});

const clear = () => {
  name.value = "";
  status.value = "";
  emit("update:modelValue", { name: "", status: "" });
};
</script>
<style scoped>
.request-filter {
  display: flex;
  gap: 10px;
}

.btn.warning {
  background-color: #ff6b6b;
  color: white;
}
</style>
