<script setup lang="ts">
const { size = 'medium' } = defineProps<{
  size?: 'small' | 'medium';
}>();
</script>

<template>
  <button :class="['base-button', `base-button_${size}`]">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--color-primary);
  color: var(--color-button-text);
  cursor: pointer;

  &.base-button_small{
    padding: 0.4rem 0.6rem;
  }

  &.base-button_medium {
    padding: 0.8rem 2rem;
  }
}
</style>
