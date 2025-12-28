<script lang="ts" setup>
interface Props {
  title: string
}

interface Emits {
  (e: 'update:title', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input) {
    emit('update:title', input.value)
  }
}
</script>
<template>
  <h1>{{ title }}</h1>
  <input type="text" :value="props.title" @input="handleInput">
  <!--  @input="emit('update:title', ($event.target as HTMLInputElement).value)" -->
</template>