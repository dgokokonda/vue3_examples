<script setup lang="ts">
interface Props {
  disabled?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const objectOfAttrs = {
  class: "button",
  style: "background-color:blue; color: white",
};

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit("click", event);
    console.log("click btn");
  }
}
</script>

<template>
  <button :disabled="disabled" v-bind="objectOfAttrs" @click="handleClick">
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.button:hover:not(:disabled) {
  background-color: #f5f5f5;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
