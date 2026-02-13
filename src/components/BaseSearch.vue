<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (e: InputEvent) => {
  const { value = '' } = e.target as HTMLInputElement

  emit('update:modelValue', value)
}
</script>

<template>
  <input :value="modelValue" type="text" placeholder="Search" @input="onInput" />
</template>
