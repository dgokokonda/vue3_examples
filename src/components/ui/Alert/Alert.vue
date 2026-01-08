<template>
  <div class="alert">
    <p v-if="title" :class="['alert-title', message?.type]">{{ title }}</p>
    <p v-if="message?.value">{{ message.value }}</p>
    <span class="alert-close" @click="closeAlert">X</span>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();

const closeAlert = () => {
  store.dispatch("clearMessage");
};
const TITLE_MAP = {
  danger: "Ошибка",
  success: "Успех",
  info: "Информация",
};
const message = computed(() => store.state.message);
const title = computed(
  () =>
    message?.value?.type &&
    TITLE_MAP[message.value.type as keyof typeof TITLE_MAP]
);
</script>
<style scoped>
.alert {
  position: relative;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
.alert-title {
  color: #42b983;
}
.alert-title.danger {
  color: #ff6b6b;
}
.alert-title.success {
  color: #42b983;
}
.alert-title.info {
  color: #8c8e8d;
}
</style>
